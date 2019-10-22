import { startOfDay, endOfDay, parseISO, isEqual } from 'date-fns';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class ScheduleController {
  // Listagem de meetups disponíveis, filtrados por data e com pag. de 10;
  async index(req, res) {
    const { date, page } = req.query;
    const parsedDate = parseISO(date);
    const today = isEqual(startOfDay(parsedDate), startOfDay(new Date()));

    const meetups = await Meetup.findAll({
      where: {
        date: {
          [Op.between]: [
            today ? parsedDate : startOfDay(parsedDate),
            endOfDay(parsedDate),
          ],
        },
      },
      order: [['date']],
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id', 'title', 'description', 'date', 'location'],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['name', 'url', 'path'],
        },
        {
          model: User,
          as: 'organizer',
          attributes: ['name'],
        },
      ],
    });

    return res.json(meetups);
  }
}

export default new ScheduleController();
