
'use strict';
var path = require('path');
module.exports = {
  name: 'ember-cli-cloudinary',

  included: function(app) {
    this._super.included(app);
    
    var blueimpFileUploadPath = path.join(app.bowerDirectory,'/blueimp-file-upload/');
    var blueimpLoadImagePath = path.join(app.bowerDirectory,'/blueimp-load-image/');
    var blueimpblueimpCanvasToBlobPath = path.join(app.bowerDirectory,'/blueimp-canvas-to-blob/');
    
    app.import(path.join(blueimpFileUploadPath, 'js/vendor/jquery.ui.widget.js'));
    app.import(path.join(blueimpFileUploadPath, 'js/jquery.iframe-transport.js'));
    app.import(path.join(blueimpFileUploadPath, 'js/jquery.fileupload.js'));
    app.import(app.bowerDirectory + '/cloudinary-jquery-file-upload/cloudinary-jquery-file-upload.js');
    //app.import(path.join(blueimpLoadImagePath,           'js/load-image.all.min.js'));
    //app.import(path.join(blueimpblueimpCanvasToBlobPath, 'js/canvas-to-blob.min.js'));
    app.import(path.join(blueimpFileUploadPath,          'js/jquery.fileupload-process.js'));
    app.import(path.join(blueimpFileUploadPath,          'js/jquery.fileupload-image.js'));
    app.import(path.join(blueimpFileUploadPath,          'js/jquery.fileupload-validate.js'));
  }
};



