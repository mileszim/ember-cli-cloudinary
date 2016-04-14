/*jshint node:true*/
module.exports = {
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies
  
  description: 'ember-cli-cloudinary blueprint',

  afterInstall: function() {
    return this.addBowerPackageToProject('cloudinary-jquery-file-upload', '^2.0.6');
  }
};
