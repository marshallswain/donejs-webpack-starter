import DefineMap from 'can-define/map/map';
import route from 'can-route';
import 'can-route-pushstate';
import $ from 'jquery';
import template from './index.stache'
import Session from '~/models/session';
import User from '~/models/user';
// Uncomment this line if you don't have a Feathers Server running, but want to test auth.
// import '~/models/fixtures/';

// viewmodel debugging
import viewModel from 'can-view-model';
window.viewModel = viewModel;

// An example of how you might implement page logic.
var pages = {
  home: 'public',
  auth: 'public',
  profile: 'private',
  admin: 'private',
};

const AppViewModel = DefineMap.extend({
  /**
   * Make it so viewModel attributes will not be serialized automatically into
   * the URL as route attributes.
   */
  '*': {
    serialize: false
  },

  /**
   * Session.current is provided by the can-connect-feathers session behavior.
   * It will automatically populate when `new Session().save()` occurs in the app
   * or on refresh after login.
   */
  session: {
    get () {
      return Session.current;
    }
  },

  page: {
    type: 'string',
    serialize: true
  },

  /**
   * Determines which page-level component is displayed.
   */
  displayedPage: {
    get () {
      let page = this.page;

      // Unknown session:
      if (this.session === undefined && page === undefined) {
        page = 'home';
      }
      // Non-authenticated session:
      else if (this.session === null) {
        if (pages[page] === 'private') {
          page = 'auth';
          this.section = 'login';
        }
      } else if (page === 'home' && this.session) {
        // page = 'schedule';
      }
      this.page = page
      return pages[page] ? page : 'four-oh-four';
    }
  },

  section: {
    type: 'string',
    serialize: true
  },

  // Login and signup should be moved to their own components, but are here for demonstration.
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
  signup (event, email, password) {
    event.preventDefault();

    new User({ email, password }).save()
      .then(user => {
        console.log('created user', user)
      })
      .catch(error => {
        console.log(error)
      })
  },

  logout () {
    return Session.current.destroy();
  },

  message: {
    value: 'Hello World!'
  }
});

route('/login', { page: 'auth', section: 'login' });
route('/signup', { page: 'auth', section: 'signup' });
route('{page}', { page: 'home' });
route('{page}/{section}');

// Make an instance of the AppViewModel, set it to the route data, and load the template.
const vm = new AppViewModel({})
route.data = vm
$('#app').html(template(vm))
route.ready()

// For debugging from the console
window.vm = vm

if (module.hot) {
  module.hot.accept()
}

export default AppViewModel;
