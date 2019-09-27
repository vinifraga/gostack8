import { Op } from 'sequelize';
import * as Yup from 'yup';
import { isBefore } from 'date-fns';

import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class SubscriptionController {
  // Listagem dos meetups em que o usuário logado está inscrito;
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      attributes: ['id', 'meetup_id'],
      order: [[Subscription.associations.meetup, 'date']],
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['title', 'date'],
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          include: [
            {
              model: User,
              as: 'organizer',
              attributes: ['name', 'email'],
            },
            {
              model: File,
              as: 'banner',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json(subscriptions);
  }

  // Inscrição no meetup;
  async store(req, res) {
    const schema = Yup.object().shape({
      meetup_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { meetup_id } = req.body;

    const meetup = await Meetup.findByPk(meetup_id);

    if (!meetup) {
      return res.status(400).json({ error: 'Invalid Meetup id' });
    }

    if (isBefore(meetup.date, new Date())) {
      return res.status(401).json({ error: 'Cannot subscribe to past meetup' });
    }

    const alreadySubscribed = await Subscription.findAll({
      where: { user_id: req.userId, meetup_id },
    });

    if (alreadySubscribed.length !== 0) {
      return res
        .status(401)
        .json({ error: 'Already subscribed to this meetup' });
    }

    const simultaneousMeetup = await Subscription.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: { date: meetup.date },
        },
      ],
    });

    if (simultaneousMeetup.length !== 0) {
      return res
        .status(401)
        .json({ error: 'Already subscribed to another meetup at this time' });
    }

    const subscription = await Subscription.create({
      user_id: req.userId,
      meetup_id,
    });

    return res.json(subscription);
  }
}

export default new SubscriptionController();
