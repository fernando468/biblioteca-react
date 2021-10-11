// Initializes the `students` service on path `/students`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Students } from './students.class';
import createModel from '../../models/students.model';
import hooks from './students.hooks';

declare module '../../declarations' {
  interface ServiceTypes {
    'students': Students & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  app.use('/students', new Students(options, app));

  const service = app.service('students');

  service.hooks(hooks);
}
