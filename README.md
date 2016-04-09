# Adam Conner Code Sample

This project is a *sample* of work from Adam Conner. This was developed against the Hero Api located here
[Hero API](hero-merge.herokuapp.com)

This code was developed using the [Angular Material Startup Project](https://github.com/angular/material-start) as a starting point.

Roughly 6.5 hours of development time were used to develop this application.

A running copy of this code is hosted in Amazon AWS here: [Live Demo](http://hero-app-adcon.s3.amazonaws.com/app/index.html)

## Getting Started

#### Prerequisites

You will need **git** to clone the material-start repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test material-start. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

#### Clone material-start

To get you started you can simply clone `master` branch from the
[hero-app](https://github.com/adcon267/hero-app) repository and install the dependencies:

Clone the material-start repository using [git][git]:

```
git clone https://github.com/adcon267/hero-app.git
cd material-start
```

#### Install Dependencies

We have two kinds of dependencies in this project: tools and AngularJS framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We also get the AngularJS and Angular Material library code via `npm`

```
npm install
```

You should find that you have one new folder in your project.

* `node_modules` - contains the npm packages for the tools we need


## Directory Layout

```
app/                    --> all of the source files for the application
  assets/app.css        --> default stylesheet
  src/           		--> all app specific modules
     users/             --> package for user features
  index.html            --> app layout file (the main html template file of the app)
test/
  karma.conf.js         --> Karma-Jasmine config file (for unit tests)
  protractor-conf.js    --> Protractor config file (for e2e tests)
  unit/					--> Karma-Jasmine unit tests
  e2e/ 			        --> end-to-end tests
```


## Serving the Application Files

While AngularJS is client-side-only technology and it's possible to create AngularJS webapps that
don't require a backend server at all, we recommend serving the project files using a local
web server during development to avoid issues with security restrictions (sandbox) in browsers. The
sandbox implementation varies between browsers, but quite often prevents things like cookies, xhr,
etc to function properly when an html page is opened via `file://` scheme instead of `http://`.

### Running the App during Development

The angular-seed project comes pre-configured with a local development web server. It is a node.js
tool called [http-server][http-server].  You can install http-server globally:

```
npm install -g live-server
```

Then you can start your own development web server to serve static files from a folder by running:

>Run `live-server` in a Terminal window</br>
Open browser to url `http://localhost:8080/app/`


Alternatively, you can choose to configure your own webserver, such as apache or nginx. Just
configure your server to serve the files under the `app/` directory.

### Run UnitTests

Simply open a Terminal window and run `npm run tests` to start all your Karma unit tests.


## Updating Angular

Previously we recommended that you merge in changes to angular-seed into your own fork of the
project. Now that the AngularJS framework library code and tools are acquired through package managers
(npm) you can use these tools instead to update the dependencies.

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.


## Contact

For more information on AngularJS please check out http://angularjs.org/
For more information on Angular Material, check out https://material.angularjs.org/

[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[travis]: https://travis-ci.org/
[http-server]: https://github.com/nodeapps/http-server