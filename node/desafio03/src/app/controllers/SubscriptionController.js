import { Op } from 'sequelize';
import * as Yup from 'yup';

import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';
import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

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

    const meetup = await Meetup.findByPk(meetup_id, {
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!meetup) {
      return res.status(400).json({ error: 'Invalid Meetup id' });
    }

    const { past } = meetup;

    if (past) {
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

    const user = await User.findByPk(req.userId, {
      attributes: ['name', 'email'],
    });

    const subscription = await Subscription.create({
      user_id: req.userId,
      meetup_id,
    });

    const mailData = {
      organizerName: meetup.organizer.name,
      organizerEmail: meetup.organizer.email,
      meetupTitle: meetup.title,
      userName: user.name,
      userEmail: user.email,
    };

    Queue.add(SubscriptionMail.key, { mailData });

    return res.json(subscription);
  }
}

export default new SubscriptionController();
