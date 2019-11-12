import { parseISO } from 'date-fns';
import CreateAvailableService from '../services/CreateAvailableService';

class AvailableController {
  async index(req, res) {
    const { providerId } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const searchDate = date.search('-') === -1 ? Number(date) : parseISO(date);

    const available = await CreateAvailableService.run({
      providerId,
      searchDate,
    });

    return res.json(available);
  }
}

export default new AvailableController();
