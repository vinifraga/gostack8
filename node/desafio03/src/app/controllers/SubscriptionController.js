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
          attributes: ['title', 'date', 'location'],
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

    const checkMeetup = await Meetup.findByPk(meetup_id, {
      attributes: ['title', 'date', 'location'],
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
    });

    if (!checkMeetup) {
      return res.status(400).json({ error: 'Invalid Meetup id' });
    }

    const { past } = checkMeetup;

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
          where: { date: checkMeetup.date },
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

    const { id } = subscription;
    const meetup = checkMeetup.get();

    const data = {
      id,
      meetup_id,
      meetup,
    };

    const mailData = {
      organizerName: checkMeetup.organizer.name,
      organizerEmail: checkMeetup.organizer.email,
      meetupTitle: checkMeetup.title,
      userName: user.name,
      userEmail: user.email,
    };

    Queue.add(SubscriptionMail.key, { mailData });

    return res.json(data);
  }

  async delete(req, res) {
    const { id } = req.params;

    const subscription = await Subscription.findByPk(id);

    if (!subscription) {
      return res.status(400).json({ error: 'Subscription not found' });
    }

    if (subscription.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: "User is not the subscription's owner" });
    }

    await subscription.destroy();

    return res.json();
  }
}

export default new SubscriptionController();
