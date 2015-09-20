(function() {
	'use strict';
	angular.module('app')
	.controller('UserController', UserController);

	UserController.$inject = ["$modal", "UserFactory", "$state"];

	function UserController($modal, UserFactory, $state) {
		var vm = this;
		vm.title = 'Your Profile';
		vm.user = {};

		//---------MODAL TO REGISTER-------------------------------
		vm.openRegisterModal = function() {
			var registerModal = $modal.open({
				templateUrl: 'views/registerUser.html',
				controller: 'RegisterUserFromModalController',
				controllerAs: "vm",
				size: "md"
			});
			registerModal.result.then(function(profileCreated){
				UserFactory.registerUser(profileCreated).then(function(){
					console.log("user created now you need to log in");
					vm.openLoginModal();
				});
			});
		};
		//---------MODAL TO REGISTER-------------------------------
		vm.openLoginModal = function() {
			var loginModal = $modal.open({
				templateUrl: 'views/loginUser.html',
				controller: 'RegisterUserFromModalController',
				controllerAs: "vm",
				size: "md"
			});
			loginModal.result.then(function(loggedInUser){
				UserFactory.loginUser(loggedInUser).then(function(){
					$state.go("UserProfile");
				});
			});
		};




	}
})();