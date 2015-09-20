(function() {
	'use strict';
	angular.module('app', ['ui.router', 'ui.bootstrap'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Topics',{
			url: '/',
			templateUrl: 'views/topics.html',
			controller: 'TopicsController',
			controllerAs: 'vm'
		}).state('ReliefMethods',{
			url: '/ReliefMethods',
			templateUrl: 'views/reliefMethods.html',
			controller: 'ReliefMethodsController',
			controllerAs: 'vm'
		}).state('UserProfile',{
			url: '/UserProfile',
			templateUrl: 'views/userProfile.html',
			controller: 'UserController',
			controllerAs: 'vm'
		}).state('EditUserProfile',{
			url: '/EditUserProfile',
			templateUrl: 'views/editUserProfile.html',
			controller: 'EditUserProfileController',
			controllerAs: 'vm'
		});
		$urlRouterProvider.otherwise('/');
	}
})();
