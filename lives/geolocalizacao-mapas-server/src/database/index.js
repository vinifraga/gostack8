import Sequelize from 'sequelize';

import Point from '../app/models/Point';

import databaseConfig from '../config/database';

const models = [Point];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
