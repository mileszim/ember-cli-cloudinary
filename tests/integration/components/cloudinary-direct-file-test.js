import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cloudinary-direct-file', 'Integration | Component | cloudinary direct file', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{cloudinary-direct-file}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#cloudinary-direct-file}}
      template block text
    {{/cloudinary-direct-file}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
