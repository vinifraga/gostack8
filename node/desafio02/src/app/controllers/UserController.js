import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    console.log(req.body);
    const re = await User.create(req.body);
    console.log(re);
    return res.json(re);
  }
}

export default new UserController();
