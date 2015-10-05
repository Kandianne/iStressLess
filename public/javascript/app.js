(function() {
	'use strict';
	angular.module('app', ['ngAnimate','ui.router', 'ui.bootstrap', 'ui.bootstrap.carousel'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Topics',{
			url: '/',
			templateUrl: './templates/topics.html',
			controller: 'TopicsController',
			controllerAs: 'vm'
		}).state('ReliefMethods',{
			url: '/ReliefMethods',
			templateUrl: './templates/reliefMethods.html',
			controller: 'ReliefMethodsController',
			controllerAs: 'vm'
		}).state('UserProfile',{
			url: '/UserProfile',
			templateUrl: './templates/userProfile.html',
			controller: 'UserController',
			controllerAs: 'vm'
		}).state('EditUserProfile',{
			url: '/EditUserProfile',
			templateUrl: './templates/editUserProfile.html',
			controller: 'EditUserProfileController',
			controllerAs: 'vm'
		}).state('TopicDetail', {
			url: '/Topic/:id',
			templateUrl: './templates/topicDetail.html',
			controller: 'TopicsController',
			controllerAs: 'vm'
		});
		
		$urlRouterProvider.otherwise('/');
	}
})();


