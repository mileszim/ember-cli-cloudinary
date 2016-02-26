/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-cloudinary',

  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/blueimp-file-upload/js/vendor/jquery.ui.widget.js');
    app.import(app.bowerDirectory + '/blueimp-file-upload/js/jquery.iframe-transport.js');
    app.import(app.bowerDirectory + '/blueimp-file-upload/js/jquery.fileupload.js');
    app.import(app.bowerDirectory + '/cloudinary-jquery-file-upload/cloudinary-jquery-file-upload.js');
  }
};
