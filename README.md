# angular-combine

[![Build Status: Linux](https://travis-ci.org/astik/angular-combine.svg?branch=master)](https://travis-ci.org/astik/angular-combine)

> Allow loading of merge templates into a single HTML file.



## Getting Started

This plugin requires Bower

If you haven't used [Bower](http://bower.io/) before, be sure to check out the [Getting Started](http://bower.io/#installing-bower) guide.
Once you're familiar with that process, you may install this plugin with this command:

```shell
bower install angular-combine --save
```

Once the plugin has been installed, it may be enabled inside your application by adding the correpsonding module:

```js
angular.module('myApp', ['angularCombine']);
```

Then you need to configure a specific service to help Angular in finding the merged templates. When the templateCache is asked for a template it will use the regex in the first argument to determine if there is a combined file that can be loaded to gather that template. The second argument is the url/path to the combined template to load. Example Below:

```js
angular.module('myApp').config(function (angularCombineConfigProvider) {
	angularCombineConfigProvider.addConf(/^views\/admin\//, 'views/admin.html');
	angularCombineConfigProvider.addConf(/^views\/otherSubFolder\//, 'views/otherSubFolderMergedTemplates.html');
});
```

You can add as many conf as you need. 
 
 
## The "angularCombine" concept



### Theory

Angular can load templates within an HTML by parsing script attribute with *text/ng-template* as type :

```html
<script type="text/ng-template" id="one.html">
	<div>This is first template</div>
</script>
<script type="text/ng-template" id="two.html">
	<div>This is second template</div>
</script>
```

It allows us to use one.html or two.html as partials without having an extra HTTP call.

So, it may be interesting to have a way to merge partials into a single HTML file that would be load once and give access to a bunch of partials.

The difficult part then is to produce the merged filed.

For the record, this plugin follows a Gist Vojta started a while ago : https://gist.github.com/vojtajina/3354046.



### Grunt to the rescue

Chech this [Grunt](http://gruntjs.com/) task : [grunt-angular-combine](https://github.com/astik/grunt-angular-combine).
This plugin was made especially for this need : producing the merged HTML file.

You'll find all the documention to use it on the [grunt-angular-combine getting started](https://github.com/astik/grunt-angular-combine#getting-started) page.



## Release History

- 0.1.0 : initial version
- 0.1.1 : clean release process (no new feature)
- v0.1.3 : release process is operational with good semserv versioning (no new feature)
- v0.1.4 : distribution available withou console (smaller files) + compatibility for Angular > 1.3.6



## Development



### How to release

Before release, don't forget to do a full build !

The project use [grunt-release](https://github.com/geddski/grunt-release) for its versionning an tag process.


### How to test

Tests in realtime into CLI :

```
grunt test
```

Tests into your browser :

```
grunt jasmine:test:build
```

Then, open the newly create file _SpecRunner.html into your browser.
