(function() {
	'use strict';
	angular.module('app')
	.controller('EditTopicModalController', EditTopicModalController);

	EditTopicModalController.$inject = ["$modalInstance", "$state", "$stateParams", "TopicsFactory", "topic"];

	function EditTopicModalController($modalInstance, $state, $stateParams, TopicsFactory, topic) {
		var vm = this;
		vm.topic = {};

		if(topic._id) {
			TopicsFactory.getTopic(topic._id).then(function(res){
				vm.topic = res;
			});
		};

		vm.editTopic = function() {
			TopicsFactory.editTopic(vm.topic).then(function(res){
				$modalInstance.close();
			});
		};

	}
})();