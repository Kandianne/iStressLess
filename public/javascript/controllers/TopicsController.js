(function() {
	'use strict';
	angular.module('app')
	.controller('TopicsController', TopicsController);

	TopicsController.$inject = ["$modal", "TopicsFactory", "UserFactory", "$state", "$stateParams"];

	function TopicsController($modal, TopicsFactory, UserFactory, $state, $stateParams) {
		var vm = this;
		vm.topic = {};
		// vm.replies = {};

		// vm.gotoElement = function (elementID){
		// 	$location.hash('scrollto');
		// 	anchorSmoothScroll.scrollTo(elementID);
		// };
		//---------------------TO GET ONE TOPIC or else ALL TOPICS-------------------------------
		vm.getTopics= function(){
			TopicsFactory.getTopics().then(function(res){
				vm.topics = res;
			});
		};

		if($stateParams.id) {
			TopicsFactory.getTopic($stateParams.id).then(function(res) {
				vm.topic = res;
			})
		} else {
			vm.getTopics();
		}

		//---------------------MODALS TO CREATE & EDIT TOPIC-------------------------------
		vm.openCreateTopicModal = function(user) {
			var createTopicModal = $modal.open({
				templateUrl: 'views/createTopic.html',
				controller: 'TopicsModalController',
				controllerAs: "vm",
				size: "md",
				resolve: {
					userId: function(){
						return user;
					}
				}
			});
			createTopicModal.result.then(function(){
				vm.getTopics();
			});
		};

		vm.openEditTopicModal = function(topicToEdit) {
			var editTopicModal = $modal.open({
				templateUrl: 'views/editTopic.html',
				controller: 'EditTopicModalController',
				controllerAs: "vm",
				size: "md",
				resolve: {
					topic: function(){
						return topicToEdit;
					}
				}
			});
			editTopicModal.result.then(function(){
				vm.getTopics();
			});
		};

		//---------------------DELETE TOPIC-------------------------------
		vm.deleteTopic = function(topicToDelete) {
			vm.topics.splice(vm.topics.indexOf(topicToDelete), 1);
			TopicsFactory.deleteTopic(topicToDelete);
		}

		//---------------------CREATING COMMENTS & REPLIES-------------------------------
		vm.createComment = function() {
			var comment= {
				body: vm.newComment,
				topic: $stateParams.id
			};
			TopicsFactory.createComment(comment).then(function(res){
				vm.newComment = "",
				vm.topic.comments.push(res);
			});
		};

		vm.createReply = function(id) {
			var reply = {
				body: vm.reply
			};
			console.log(id);
			TopicsFactory.createReply(reply, id).then(function(res){
				vm.reply = "";
				vm.topic.comments.replies = res.replies;
				console.log(vm.topic.comments.replies)
			});
		};



	}
})();