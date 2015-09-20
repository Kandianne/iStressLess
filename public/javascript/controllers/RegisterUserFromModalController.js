(function() {
	'use strict';
	angular.module('app')
	.controller('RegisterUserFromModalController', RegisterUserFromModalController);

	RegisterUserFromModalController.$inject = ["$modalInstance", "$state"];

	function RegisterUserFromModalController($modalInstance, $state) {
		var vm = this;
		vm.title = 'Your Profile';
		vm.user = {};

		vm.registerUser = function() {
			$modalInstance.close(vm.user);
		};

		vm.loginUser = function() {
			$modalInstance.close(vm.user);
		};

	}
})();