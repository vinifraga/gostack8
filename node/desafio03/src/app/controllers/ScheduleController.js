import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class ScheduleController {
  // Listagem de meetups disponíveis, filtrados por data e com pag. de 10;
  async index(req, res) {
    const { date, page } = req.query;
    const parsedDate = parseISO(date);

    const meetups = await Meetup.findAll({
      where: {
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: [['date']],
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id', 'title', 'description', 'date'],
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['name', 'email'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['name', 'url', 'path'],
        },
      ],
    });

    return res.json(meetups);
  }
}

export default new ScheduleController();
