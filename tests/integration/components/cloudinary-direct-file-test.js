import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('cloudinary-direct-file', 'Integration | Component | cloudinary direct file', {
  integration: true,

  beforeEach() {
    Ember.$.get = function() {
      return { done(cb) { cb({ some: 'response' }); } };
    };
  }
});

test('it requests an upload signature on render', function(assert) {
  assert.expect(1);

  Ember.$.get = function(url) {
    assert.equal(url, '/signature_endpoint');
    return { done(cb) { cb({ some: 'response' }); } };
  };

  this.render(hbs`{{cloudinary-direct-file signatureEndpoint='/signature_endpoint'}}`);
});


test('it reports an error when signatureEndpoint parameter is not specified', function(assert) {
  assert.expect(1);

  Ember.Logger.error = function(msg) {
    assert.equal(msg, '`signatureEndpoint` parameter must be specified on cloudinary-direct-file component.');
  };

  this.render(hbs`{{cloudinary-direct-file}}`);
});


test('it sets data-form-data from signatureEndpoint response', function(assert) {
  this.render(hbs`{{cloudinary-direct-file signatureEndpoint='/signature_endpoint'}}`);

  assert.equal(this.$('input').attr('data-form-data'), "{\"some\":\"response\"}");
});


// Bind events
test('it sends onUploadDone when event triggered', function(assert) {
  assert.expect(2);

  this.on('testAction', function(e, data) {
    assert.equal(e.type, 'cloudinarydone');
    assert.deepEqual(data, { result: 'test' });
  });

  this.render(hbs`{{cloudinary-direct-file signatureEndpoint='/signature_endpoint' onUploadDone=(action 'testAction')}}`);

  this.$('input').trigger('cloudinarydone', { result: 'test' });
});


test('it sends fileProgress when event triggered', function(assert) {
  assert.expect(2);

  this.on('testAction', function(e, data) {
    assert.equal(e.type, 'cloudinaryprogress');
    assert.deepEqual(data, { result: 'test' });
  });

  this.render(hbs`{{cloudinary-direct-file signatureEndpoint='/signature_endpoint' fileProgress=(action 'testAction')}}`);

  this.$('input').trigger('cloudinaryprogress', { result: 'test' });
});


test('it sends allFileProgress when event triggered', function(assert) {
  assert.expect(2);

  this.on('testAction', function(e, data) {
    assert.equal(e.type, 'cloudinaryprogressall');
    assert.deepEqual(data, { result: 'test' });
  });

  this.render(hbs`{{cloudinary-direct-file signatureEndpoint='/signature_endpoint' allFileProgress=(action 'testAction')}}`);

  this.$('input').trigger('cloudinaryprogressall', { result: 'test' });
});


test('it sends onUploadStart when event triggered', function(assert) {
  assert.expect(2);

  this.on('testAction', function(e, data) {
    assert.equal(e.type, 'cloudinarystart');
    assert.deepEqual(data, { result: 'test' });
  });

  this.render(hbs`{{cloudinary-direct-file signatureEndpoint='/signature_endpoint' onUploadStart=(action 'testAction')}}`);

  this.$('input').trigger('cloudinarystart', { result: 'test' });
});


test('it sends onUploadStop when event triggered', function(assert) {
  assert.expect(2);

  this.on('testAction', function(e, data) {
    assert.equal(e.type, 'cloudinarystop');
    assert.deepEqual(data, { result: 'test' });
  });

  this.render(hbs`{{cloudinary-direct-file signatureEndpoint='/signature_endpoint' onUploadStop=(action 'testAction')}}`);

  this.$('input').trigger('cloudinarystop', { result: 'test' });
});


test('it sends onUploadFail when event triggered', function(assert) {
  assert.expect(2);

  this.on('testAction', function(e, data) {
    assert.equal(e.type, 'cloudinaryfail');
    assert.deepEqual(data, { result: 'test' });
  });

  this.render(hbs`{{cloudinary-direct-file signatureEndpoint='/signature_endpoint' onUploadFail=(action 'testAction')}}`);

  this.$('input').trigger('cloudinaryfail', { result: 'test' });
});


test('it sends onUploadAlways when event triggered', function(assert) {
  assert.expect(2);

  this.on('testAction', function(e, data) {
    assert.equal(e.type, 'cloudinaryalways');
    assert.deepEqual(data, { result: 'test' });
  });

  this.render(hbs`{{cloudinary-direct-file signatureEndpoint='/signature_endpoint' onUploadAlways=(action 'testAction')}}`);

  this.$('input').trigger('cloudinaryalways', { result: 'test' });
});
