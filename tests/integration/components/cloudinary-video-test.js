import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('cloudinary-video', 'Integration | Component | cloudinary video', {
  integration: true,

  beforeEach() {
    Ember.$.cloudinary.config({ cloud_name: 'cloud-name', api_key: '12345', secure: true });
  }
});

test('it renders a video', function(assert) {
  this.render(hbs`{{cloudinary-video 'dog'}}`);
  assert.equal(this.$('video').text().trim(), '');
  assert.equal(this.$('source').text().trim(), '');
  assert.equal(this.$('source').attr('src'), 'https://res.cloudinary.com/cloud-name/video/upload/dog.webm');
});

