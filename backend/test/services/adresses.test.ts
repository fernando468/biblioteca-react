import assert from 'assert';
import app from '../../src/app';

describe('\'adresses\' service', () => {
  it('registered the service', () => {
    const service = app.service('adresses');

    assert.ok(service, 'Registered the service');
  });
});
