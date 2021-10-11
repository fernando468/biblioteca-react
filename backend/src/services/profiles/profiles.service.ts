// Initializes the `profiles` service on path `/profiles`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Profiles } from './profiles.class';
import createModel from '../../models/profiles.model';
import hooks from './profiles.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'profiles': Profiles & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/profiles', new Profiles(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('profiles');

  service.hooks(hooks);
}
