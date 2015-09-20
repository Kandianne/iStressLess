(function() {
	'use strict';
	angular.module('app')
	.controller('TopicsController', TopicsController);

	TopicsController.$inject = [];

	function TopicsController() {
		var vm = this;
		vm.title = 'I Stress Less';
	}
})();