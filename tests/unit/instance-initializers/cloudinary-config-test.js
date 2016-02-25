import Ember from 'ember';
import { initialize } from 'dummy/instance-initializers/cloudinary-config';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';

const config = {
  cloudinary: {
    apiKey:    '12345',
    cloudName: 'cloud-name'
  }
};

module('Unit | Instance Initializer | cloudinary config', {
  beforeEach: function() {
    Ember.run(() => {
      this.application = Ember.Application.create();
      this.appInstance = this.application.buildInstance();

      // Register config
      this.appInstance.register('config:environment', config);
    });
  },
  afterEach: function() {
    Ember.run(this.appInstance, 'destroy');
    destroyApp(this.application);
  }
});


test('it configures cloudinary', function(assert) {
  initialize(this.appInstance);

  assert.deepEqual(Ember.$.cloudinary.config(), { api_key: "12345", cloud_name: "cloud-name", secure: true });
});
