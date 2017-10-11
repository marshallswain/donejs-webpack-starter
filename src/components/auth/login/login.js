import Component from 'can-component';
import DefineMap from 'can-define/map/map';
import './login.less';
import view from './login.stache';
import Session from '~/models/session'

export const ViewModel = DefineMap.extend({
  email: 'string',
  password: 'string',
  login (event, email, password) {
    debugger
    event.preventDefault();

    new Session({ email, password }).save()
      .then(user => {
        console.log('logged in user', user)
      })
      .catch(error => {
        console.log(error)
      })
  },
});

export default Component.extend({
  tag: 'auth-login',
  ViewModel,
  view
});
