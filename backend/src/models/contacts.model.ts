// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const contacts = sequelizeClient.define('contacts', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    relation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    studentId: {
      type: DataTypes.INTEGER,
      field: 'id_student',
      allowNull: false
    },


    createdAt: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
      field: 'updated_at'
    },
    deletedAt: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE,
      field: 'deleted_at'
    }
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (contacts as any).associate = function (models: any): void {
    contacts.belongsTo(models.students, { as: 'student' });
  };

  return contacts;
}
