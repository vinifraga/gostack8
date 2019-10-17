import { unlink } from 'fs';
import { promisify } from 'util';
import { resolve } from 'path';

import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({ name, path });

    return res.json(file);
  }

  async delete(req, res) {
    const { id } = req.params;

    const file = await File.findByPk(id);

    if (!file) {
      return res.status(400).json({ error: 'File not found' });
    }

    const filePath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'uploads',
      file.path
    );
    const unlinkAsync = promisify(unlink);

    await Promise.all([file.destroy(), unlinkAsync(filePath)]);

    return res.json();
  }
}

export default new FileController();
