import assert from 'assert';
import app from '../../src/app';

describe('\'addresses\' service', () => {
  it('registered the service', () => {
    const service = app.service('addresses');

    assert.ok(service, 'Registered the service');
  });
});
