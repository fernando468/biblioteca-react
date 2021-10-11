import { Params } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';

export interface User {
  email: string;
  password: string;
}

export class Users extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  app: Application;
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async find(params: Params) {
    const sequelize = { include: ['profiles'], raw: false };
    return super.find({ ...params, sequelize });
  }

  async create(data: any, params: Params) {
    const sequelizeClient = this.app.get('sequelizeClient');
    const transaction = await sequelizeClient.transaction();
    const sequelize = { transaction };

    try {
      const createdUser = await super.create(data, { ...params, sequelize });

      const createdProfile = await this.app.service('profiles').create({
        name: `${data.email.replace(/@.*/, '')}_oficial`,
        userId: createdUser.id
      }, { ...params, sequelize });

      await transaction.commit();

      return { ...createdUser, profile: createdProfile };

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
