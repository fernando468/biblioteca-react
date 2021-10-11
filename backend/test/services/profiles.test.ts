import assert from 'assert';
import app from '../../src/app';

describe('\'profiles\' service', () => {
  it('registered the service', () => {
    const service = app.service('profiles');

    assert.ok(service, 'Registered the service');
  });
});
