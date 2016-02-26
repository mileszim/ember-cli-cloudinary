import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'input',
  classNames: ['cloudinary-fileupload'],

  attributeBindings: ['name', 'type', 'data-cloudinary-field', 'data-form-data', 'multiple'],

  // Attributes
  name: 'file',
  type: 'file',
  multiple: true,
  fieldName: null,
  'data-cloudinary-field': Ember.computed.alias('fieldName'),

  // Endpoint
  signatureEndpoint: null,

  // Default Options
  disableImageResize: false,
  imageMaxWidth: 10000000,
  imageMaxHeight: 10000000,
  acceptFileTypes: /(\.|\/)(gif|jpe?g|png|bmp|ico)$/i,
  maxFileSize: 50000000,

  // Fetch signature
  init() {
    this._super(...arguments);

    if (!this.get('signatureEndpoint')) {
      Ember.Logger.error('`signatureEndpoint` parameter must be specified on cloudinary-direct-file component.');
    }

    Ember.$.get(this.get('signatureEndpoint'), { timestamp: Date.now() / 1000 }).done((response) => {
      this.set('data-form-data', JSON.stringify(response));
    });
  },

  // Bind
  didInsertElement() {
    this.$().cloudinary_fileupload({
      disableImageResize: this.get('disableImageResize'),
      imageMaxWidth:      this.get('imageMaxWidth'),
      imageMaxHeight:     this.get('imageMaxHeight'),
      acceptFileTypes:    this.get('acceptFileTypes'),
      maxFileSize:        this.get('maxFileSize')
    });

    this.$().bind('fileuploaddone', (e, data) => {
      this.sendAction('onFileUploadDone', e, data);
    });
  }
});
