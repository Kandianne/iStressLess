(function() {
	'use strict';
	angular.module('app')
	.controller('UserController', UserController);

	UserController.$inject = ["$modal", "UserFactory", "$state", "$rootScope"];

	function UserController($modal, UserFactory, $state, $rootScope) {
		var vm = this;
		vm.title = 'Your Profile';
		vm.user = {};

		//-------------GET LOGGED IN COUPLE-------------------------

		if($rootScope._user) {
			UserFactory.getUserLoggedIn($rootScope._user.id).then(function(res) {
				vm.userLoggedIn = res;
			});
		};	

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
					vm.openLoginModal();
				});
			});
		};

		//---------MODAL TO LOGIN-------------------------------
		vm.openLoginModal = function() {
			var loginModal = $modal.open({
				templateUrl: 'views/loginUser.html',
				controller: 'RegisterUserFromModalController',
				controllerAs: "vm",
				size: "md"
			});
			loginModal.result.then(function(loggedInUser){
				UserFactory.loginUser(loggedInUser).then(function(res){
					vm.userLoggedIn = $rootScope._user;
					$state.go("Topics");
				});
			});
		};

		//---------LOGOUT-------------------------------
		vm.userLoggedIn = $rootScope._user;

		vm.logoutUser = function() {
			UserFactory.logoutUser().then(function(){
				vm.userLoggedIn = $rootScope._user;
				delete vm.user;
				$state.go("Topics");
			})
		};

		vm.registerUserCloseModal = function() {
			$modalInstance.close(vm.user);
		};

		vm.loginUserCloseModal = function() {
			$modalInstance.close(vm.user);
		};





	}
})();