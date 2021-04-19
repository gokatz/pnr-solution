import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | listSelection', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:list-selection');
    assert.ok(route);
  });
});
