import Ember from 'ember';
import layout from '../templates/components/cloudinary-video';

const CloudinaryVideoComponent = Ember.Component.extend({
  layout: layout,
  tagName: 'span',

  didInsertElement () {
    this._super(...arguments);
    const _this = this;

    this._resizeHandler = function() {
      Ember.run.scheduleOnce('afterRender', this, ()=> {
        _this.set('width', Ember.$('.grid__item').width());
      });
    }.bind(this);
    Ember.$(window).on('resize', this._resizeHandler);
    this._resizeHandler();
  },

  willDestroyElement () {
    Ember.$(window).off('resize', this._resizeHandler);
  },

  video: Ember.computed('publicId', 'width', function() {
    // if matchWidth set to true then set to actual width
    if(this.get('options.matchWidth') === true){
      if (!this.get('width')) {
        return;
      }
      this.set('options.width', this.get('width'));
    }

    const cloudinaryVideoTag = Ember.$.cloudinary.video(this.get('publicId'), this.get('options') );
    return Ember.String.htmlSafe(cloudinaryVideoTag);
  }),
});

CloudinaryVideoComponent.reopenClass({
  positionalParams: ['publicId', 'options']
});

export default CloudinaryVideoComponent;
