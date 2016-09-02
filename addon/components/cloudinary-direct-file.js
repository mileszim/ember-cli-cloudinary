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

  fetchSignature: Ember.on('init', function() {
    if (!this.get('signatureEndpoint')) {
      Ember.Logger.error('`signatureEndpoint` parameter must be specified on cloudinary-direct-file component.');
    }

    Ember.$.get(this.get('signatureEndpoint'), { timestamp: Date.now() / 1000 }).done((response) => {
      Ember.run(() => { this.set('data-form-data', JSON.stringify(response)); });
    });
  }),

  didSetData: Ember.observer('data-form-data', function() {
    Ember.run.next(this, function() {
      this.$().cloudinary_fileupload({
        disableImageResize: this.get('disableImageResize'),
        imageMaxWidth:      this.get('imageMaxWidth'),
        imageMaxHeight:     this.get('imageMaxHeight'),
        acceptFileTypes:    this.get('acceptFileTypes'),
        maxFileSize:        this.get('maxFileSize')
      });
    });
  }),

  didInsertElement() {
    this.$().bind('cloudinarydone', (e, data) => {
      this.sendAction('onUploadDone', e, data);
    });

    this.$().bind('cloudinaryprogress', (e, data) => {
      this.sendAction('fileProgress', e, data);
    });

    this.$().bind('cloudinaryprogressall', (e, data) => {
      this.sendAction('allFileProgress', e, data);
    });

    this.$().bind('cloudinarystart', (e, data) => {
      this.sendAction('onUploadStart', e, data);
    });

    this.$().bind('cloudinarystop', (e, data) => {
      this.sendAction('onUploadStop', e, data);
    });

    this.$().bind('cloudinaryfail', (e, data) => {
      this.sendAction('onUploadFail', e, data);
    });

    this.$().bind('cloudinaryalways', (e, data) => {
      this.sendAction('onUploadAlways', e, data);
    });
  }
});
