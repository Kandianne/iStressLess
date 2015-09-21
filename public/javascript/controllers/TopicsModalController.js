(function() {
	'use strict';
	angular.module('app')
	.controller('TopicsModalController', TopicsModalController);

	TopicsModalController.$inject = ["$modalInstance", "$state", "$stateParams", "TopicsFactory", "userId"];

	function TopicsModalController($modalInstance, $state, $stateParams, TopicsFactory, userId) {
		var vm = this;
		vm.topic = {};

		
		vm.createTopic = function() {
			TopicsFactory.createTopic(vm.topic, userId.id).then(function(res){
				$modalInstance.close();
			});
		};

	}
})();