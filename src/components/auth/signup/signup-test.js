import QUnit from 'steal-qunit';
import { ViewModel } from './signup';

// ViewModel unit tests
QUnit.module('donejs-webpack-starter/components/auth/signup');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the auth-signup component');
});
