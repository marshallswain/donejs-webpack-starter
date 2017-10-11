# donejs-webpack-starter

Welcome to the donejs-webpack-starter DoneJS application!

This application is built like any DoneJS application with the following exceptions:

## Webpack for app development, StealJS for modlet development
Webpack is used in place of StealJS for app bundling.  StealJS is used for individual module (modlet) development, since Webpack can't do this.  The Webpack configuration is nearly 100% compatible with the default StealJS config.

There are a few benefits to using Webpack:
- Developers, developers, developers, developers - The developer experience is quite nice.
- Faster app development.  Where loading a small app with Steal in development takes, on average in my experience, about 25 seconds to load (with all browser plugins disabled and the Chrome devtools open), a Webpack-bundled app generally takes less than a second.
- Related to faster app development, the productivity boost that comes from the speedier workflow will make you smile over and over again.  You wont lose context of what you were working on when you're developing a part of the app that requires lots of page refreshing, like when testing logic on app load.  In a medium-sized consulting company, this could save thousands of dollars every year.
- Lots of great Webpack plugins.  Webpack has a huge ecosystem of really powerful plugins.  Because it leverages Node.js, it can do things that can't be done in a browser-only environment.
- Webpack's asset management plugins are really, really good.  It can load assets from image `src` attributes and CSS `url()` directives and bundle them into an output directory, which can be a pretty handy workflow, sometimes.
- Hot Module Replacement - It works great it Webpack, but it also works really well in StealJS, so this isn't really a benefit of one module loader over the other.  It's in this starter template and it works.  Enjoy!

There are also drawbacks to using Webpack:
- Webpack is more complicated to setup than StealJS.  This isn't as big of an issue once you have a working Webpack configuration, and this starter template includes one, so that's not much of an issue, anymore.
- No asynchronous `can-import` support as found [here](https://canjs.com/doc/can-view-import.html#_can_importfrom__MODULE_NAME__content__can_import_). Similarly, I don't think there's [can-dynamic-import](https://canjs.com/doc/can-view-import.html#_can_dynamic_importfrom__MODULE_NAME__content__can_import_) support.
- Incongruous development environments: Since Webpack supports more plugins than Steal, using two bundlers can present a situation where app development might have really good support for a technology (say loading Sass files), but it may be unavailable when you're developing modlets (indiviual modules and components within the app).  [Read more about the Modlet Workflow](https://css-tricks.com/key-building-large-javascript-apps-modlet-workflow/).
- No `done-autorender` support means that `index.stache` cannot be your app entry point, anymore.  It's not as simple to update the page title as it normally might be in a DoneJS application.
- You lose the ability to develop your app on any plain web server.  Since Steal works 100% in the browser, it doesn't need a special server for development.  If you're using `donejs develop` to build your apps, you're already using Node.js, anyway, so this isn't as big of a deal, but this could be a very important thing to somebody who is not using Node.js.
- No StealJS module path support.  StealJS's module naming standard makes more sense when importing a folder name.  If you import `my-module/foo/`, it will try to load `my-module/foo/foo` instead of `my-module/foo/index`.  Who would want a million files named `index.js` floating around in a project?  That's a rhetorical question, mostly.  You'd have to have gone mad to want that.  It's how Node.js does things by default, though, and since Webpack runs in Node.js, that's how Webpack works.  As a result, you have to be very explicit with the file pathname and not import folder names (or go mad and put a bunch of `index.js` files in your project, one in each folder).  So you have to explicitly load `my-module/foo/foo` instead of the folder path.

## Aimed at PWAs. No SSR Support
I've turned off DoneSSR support for this application starter template.  Since I prefer to build Single Page Apps that communicate with Socket.io based APIs, and DoneSSR doesn't handle Websockets, I decided to disable SSR.  DoneSSR works great without WebSocket support, but its' best to turn it off when you need WebSockets.  I'm not sure of the technical reasons why it doesn't work for me, it just doesn't work for me.  I've had much better luck using SSR and WebSockets when using Nuxt.js (for Vue), which I think is based on Next.js (for React).

## Getting started

**Important:**

After downloading or cloning this repository, open the `package.json` and name your app.  Then edit the webpack.config.js and in the `resolve.alias` section, change `donejs-webpack-starter` to match the name you put in the `package.json`.  This will allow all of the aliasing to work just like StealJS (you'll see the tilde `~` alias in that same section.)

To install all dependencies, (e.g. after cloning it from a Git repository) run

```
npm install donejs -g
npm install
```

## Running tests

Tests can be run with

```
donejs test
```

## Development mode

The `webpack-dev-server` can be started by running

```
donejs develop
```


## Build and production mode

To build the application into a production bundle with Webpack, run

```
donejs build
```

To build with StealJS and steal-tools, run

```
node build.js
```

In Unix environment the production application can be started like this:

```
NODE_ENV=production npm start
```
