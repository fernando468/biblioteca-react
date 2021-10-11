// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const loans = sequelizeClient.define('loans', {
    studentId: {
      type: DataTypes.INTEGER,
      field: 'id_student',
      allowNull: false
    },
    bookId: {
      type: DataTypes.INTEGER,
      field: 'id_book',
      allowNull: false
    },

    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
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
  (loans as any).associate = function (models: any): void {
    loans.belongsTo(models.students, { as: 'student' });
    loans.belongsTo(models.books, { as: 'book' });
  };

  return loans;
}
