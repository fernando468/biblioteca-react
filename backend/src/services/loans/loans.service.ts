// Initializes the `students` service on path `/students`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Loans } from './loans.class';
import createModel from '../../models/loans.model';
import hooks from './loans.hooks';

declare module '../../declarations' {
  interface ServiceTypes {
    'loans': Loans & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  app.use('/loans', new Loans(options, app));

  const service = app.service('loans');

  service.hooks(hooks);
}
