import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'input',
  classNames: ['cloudinary-fileupload'],

  attributeBindings: ['name', 'type', 'data-cloudinary-field', 'data-form-data','style','accept'],

  // Attributes
  name: 'file',
  type: 'file',
  accept:'image/jpeg,image/gif,image/png',
  //multiple: false,
  fieldName: null,
  'data-cloudinary-field': Ember.computed.alias('fieldName'),
  style:Ember.String.htmlSafe(""),

  // Endpoint
  signatureEndpoint: null,
  
  // Default Options
  autoUpload: true,                            // default is true
  disableImageResize: false,
  imageMaxWidth: 800,
  imageMaxHeight: 600,
  maxFileSize: 5000000,
  loadImageMaxFileSize: 5000000,               // default is 10MB
  acceptFileTypes: /(\.|\/)(gif|jpe?g|png|bmp|ico)$/i,
  
  // Fetch signature
  init() {
    this._super(...arguments);
    
    if (!this.get('signatureEndpoint')) {
      Ember.Logger.error('`signatureEndpoint` parameter must be specified on cloudinary-direct-file component.');
    }
    Ember.$.get(this.get('signatureEndpoint'), { timestamp: Date.now() / 1000 }).done((response) => {
      Ember.run(() => { this.set('data-form-data', JSON.stringify(response)); });
    });
  },

  didSetData: Ember.observer('data-form-data', function() {
    var self = this;
    Ember.run.next(function() {
      self.$().cloudinary_fileupload({
        autoUpload:           self.get('autoUpload:'),
        disableImageResize:   self.get('disableImageResize'),
        imageMaxWidth:        self.get('imageMaxWidth'),
        imageMaxHeight:       self.get('imageMaxHeight'),
        maxFileSize:          self.get('maxFileSize'), 
        loadImageMaxFileSize: self.get('loadImageMaxFileSize'),
        acceptFileTypes:      self.get('acceptFileTypes'),
      });
    });
  }),

  didInsertElement() {
    // consalt the jQuery File Upload for more evant 
    //https://github.com/blueimp/jQuery-File-Upload/wiki/Options

    this.$().bind('fileuploadprocessfail', (e, data) => {
      this.sendAction('onprocessfail', e, data);
    });    
    
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
