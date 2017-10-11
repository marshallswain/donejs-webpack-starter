import F from 'funcunit';
import QUnit from 'steal-qunit';

import 'donejs-webpack-starter/models/test';

F.attach(QUnit);

QUnit.module('donejs-webpack-starter functional smoke test', {
  beforeEach() {
    F.open('./development.html');
  }
});

QUnit.test('donejs-webpack-starter main page shows up', function() {
  F('title').text('donejs-webpack-starter', 'Title is set');
});
