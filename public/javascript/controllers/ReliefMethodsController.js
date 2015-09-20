(function() {
	'use strict';
	angular.module('app')
	.controller('ReliefMethodsController', ReliefMethodsController);

	ReliefMethodsController.$inject = [];

	function ReliefMethodsController() {
		var vm = this;
		vm.title = 'Relief Methods';
	}
})();