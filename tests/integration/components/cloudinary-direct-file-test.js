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


test('it sends fileuploaddone when event triggered', function(assert) {
  assert.expect(2);

  this.on('fileuploaddone', function(e, data) {
    assert.equal(e.type, 'fileuploaddone');
    assert.deepEqual(data, { result: 'test' });
  });

  this.render(hbs`{{cloudinary-direct-file signatureEndpoint='/signature_endpoint' onFileUploadDone=(action 'fileuploaddone')}}`);

  this.$('input').trigger('fileuploaddone', { result: 'test' });
});
