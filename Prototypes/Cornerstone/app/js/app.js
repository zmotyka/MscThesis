
/*================================================================
=>                  App = cornerstoneApp
==================================================================*/
/*global angular*/

var app = angular.module('cornerstoneApp', ["ngCookies", "ngResource", "ngSanitize", "ngRoute", "ngAnimate", "ui.bootstrap", "ui.router"]);


app.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
	'use strict';

	$routeProvider
		.when('/home', {
			templateUrl: 'templates/home.html'
		})
		.otherwise({
			redirectTo: '/home'
		});

	$locationProvider.hashPrefix('!');

	// This is required for Browser Sync to work poperly
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}]);


/*================================================================
=>                  cornerstoneApp App Run()  
==================================================================*/

app.run(['$rootScope', function ($rootScope) {
	
	'use strict';

	console.log('Angular.js run() function...');
}]);




/* ---> Do not delete this comment (Values) <--- */

/* ---> Do not delete this comment (Constants) <--- */