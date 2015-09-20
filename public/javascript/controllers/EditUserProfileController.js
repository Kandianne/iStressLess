(function() {
	'use strict';
	angular.module('app')
	.controller('EditUserProfileController', EditUserProfileController);

	EditUserProfileController.$inject = [];

	function EditUserProfileController() {
		var vm = this;
		vm.title = 'Edit Profile';
	}
})();