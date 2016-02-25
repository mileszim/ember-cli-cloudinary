/*jshint node:true*/
module.exports = {
  description: 'ember-cli-cloudinary blueprint',

  afterInstall: function() {
    return this.addBowerPackageToProject('cloudinary-jquery-file-upload', '^2.0.6');
  }
};
