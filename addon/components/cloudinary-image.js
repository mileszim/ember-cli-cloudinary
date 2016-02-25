import Ember from 'ember';
import layout from '../templates/components/cloudinary-image';

const CloudinaryImageComponent = Ember.Component.extend({
  tagName: 'img',
  attributeBindings: ['src', 'width', 'height'],

  width: Ember.computed.alias('options.width'),
  height: Ember.computed.alias('options.height'),

  src: Ember.computed('publicId', 'width', 'height', function() {
    return Ember.$.cloudinary.url(this.get('publicId'), this.get('options'));
  })
});

CloudinaryImageComponent.reopenClass({
  positionalParams: ['publicId', 'options']
});

export default CloudinaryImageComponent;
