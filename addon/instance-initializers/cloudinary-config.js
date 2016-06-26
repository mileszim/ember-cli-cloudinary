/*global Ember */
//import Ember from 'ember';
export default {
  name: 'cloudinary-config',
  initialize: initialize
};

export function initialize(appInstance) {
  const ENV = appInstance.resolveRegistration('config:environment');

  if (!ENV.cloudinary || !ENV.cloudinary.apiKey || !ENV.cloudinary.cloudName) {
    Ember.Logger.error('Please specify your cloudinary.cloudName and cloudinary.apiKey in your config.');
    return;
  }


  Ember.$.cloudinary.config({
    cloud_name: ENV.cloudinary.cloudName,
    api_key:    ENV.cloudinary.apiKey,
    secure:     true
  });
}
