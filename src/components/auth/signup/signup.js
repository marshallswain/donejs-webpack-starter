import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './signup.less';
import view from './signup.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the auth-signup component'
  }
});

export default Component.extend({
  tag: 'auth-signup',
  ViewModel,
  view
});
