import Sequelize, { Model } from 'sequelize';

class Recepient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.INTEGER,
        building: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        zip_code: Sequelize.INTEGER,

      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Recepient;
