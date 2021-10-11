import { Params } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';
import * as R from 'ramda';

export class Students extends Service {
  app: Application;
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async find(params: Params) {
    const sequelize = { include: ['contacts'], raw: false };
    return super.find({ ...params, sequelize });
  }

  async get(id: any, params: Params) {
    const sequelize = { include: ['contacts'], raw: false };
    return await super.get(id, { ...params, sequelize });
  }

  async create(data: any, params: Params) {
    const sequelize = { include: ['contacts'] };
    return await super.create(data, { ...params, sequelize });
  }

  async update(id: any, data: any, params: Params) {
    const sequelizeClient = this.app.get('sequelizeClient');
    const transaction = await sequelizeClient.transaction();
    const sequelize = { include: ['contacts'], raw: false, transaction };

    try {
      const student = await super.get(id, { ...params, sequelize });
      const oldContacts = student.contacts.map((contact: any) => {
        const { id, name, relation, phone } = contact.dataValues;
        return { id, name, relation, phone };
      });
      data.contacts
        .filter((contact: any) => contact.id === undefined)
        .forEach(async (contact: any) => await this.app.service('contacts')
          .create({ ...contact, studentId: id }, { ...params, sequelize: { transaction } })
        );

      const cmpById = (x: any, y: any) => x.id === y.id;

      const contactsUpdated = R.innerJoin(cmpById, data.contacts, oldContacts);
      contactsUpdated.forEach(async (contact: any) => {
        await this.app.service('contacts')
          .update(contact.id, { ...contact, studentId: id }, { ...params, sequelize: { transaction } });
      });

      const contactsRemoved = R.differenceWith(cmpById, oldContacts, data.contacts);
      contactsRemoved.forEach(async (contactRemoved: any) => await this.app.service('contacts')
        .remove(contactRemoved.id, { ...params, sequelize: { transaction } })
      );

      await super.update(id, data, { ...params, sequelize: { transaction } });

      await transaction.commit();

      return { ...data };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async remove(id: any, params: any) {
    const sequelize = { include: ['contacts'], raw: false };
    const studentResponse = await super.get(id, { ...params, sequelize });
    const contacts = studentResponse.contacts.map((contact: any) => contact.dataValues);

    for (const contact of contacts) {
      await this.app.service('contacts')
        .remove(contact.id);
    }
    return await super.remove(id, { ...params });
  }

}
