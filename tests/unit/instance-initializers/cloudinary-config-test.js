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
    });
  },
  afterEach: function() {
    Ember.run(this.appInstance, 'destroy');
    destroyApp(this.application);
  }
});


test('it configures cloudinary', function(assert) {
  this.appInstance.register('config:environment', config);
  initialize(this.appInstance);

  assert.deepEqual(Ember.$.cloudinary.config(), { api_key: "12345", cloud_name: "cloud-name", secure: true, responsive_class: "cld-responsive", responsive_use_breakpoints: true, round_dpr: true });
});


test('it throws an error if cloudinary options not in ENV', function(assert) {
  assert.expect(1);

  this.appInstance.register('config:environment', {});

  Ember.Logger.error = function(msg) {
    assert.equal(msg, 'Please specify your cloudinary.cloudName and cloudinary.apiKey in your config.');
  };

  initialize(this.appInstance);
});
