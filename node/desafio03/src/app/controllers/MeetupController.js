import Meetup from '../models/Meetup';

class MeetupController {
  async index(req, res) {
    const data = await Meetup.findAll();

    return res.json(data);
  }

  async store(req, res) {
    const data = await Meetup.create(req.body);

    return res.json(data);
  }
}

export default new MeetupController();
