import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'input',

  attributeBindings: ['name', 'type', 'data-cloudinary-field', 'data-form-data', 'value'],

  name: 'image',
  type: 'file',

  publicId: null,
  signatureEndpoint: null,
  value: null,

  // Default Options
  disableImageResize: false,
  imageMaxWidth: 10000000,
  imageMaxHeight: 10000000,
  acceptFileTypes: /(\.|\/)(gif|jpe?g|png|bmp|ico)$/i,
  maxFileSize: 50000000,

  'data-cloudinary-field': Ember.computed.alias('name'),
  'data-form-data': Ember.computed('signatureEndpoint', function() {
    let params = { timestamp: Date.now() / 1000 };
    return Ember.$.get(this.get('signatureEndpoint'), params).done((response) => JSON.stringify(response));
  }),

  didInsertElement() {
    this.$().cloudinary_fileupload({
      disableImageResize: this.get('disableImageResize'),
      imageMaxWidth:      this.get('imageMaxWidth'),
      imageMaxHeight:     this.get('imageMaxHeight'),
      acceptFileTypes:    this.get('acceptFileTypes'),
      maxFileSize:        this.get('maxFileSize')
    });

    this.$().bind('fileuploaddone', (e, data) => {
      this.set('value', JSON.stringify(data.result));
    });
  }
});
