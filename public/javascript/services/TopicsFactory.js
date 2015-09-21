(function() {
	'use strict';
	angular.module('app')
	.factory('TopicsFactory', TopicsFactory);

	TopicsFactory.$inject = ['$http', '$q'];

	function TopicsFactory($http, $q) {
		var o = {};

		//--------------------CREATING TOPIC AND COMMENT----------------------------------------
		o.createTopic = function(topic, id) {
			var q = $q.defer();
			$http.post("/api/topics/" + id, topic).success(function(res){
				q.resolve();
			});
			return q.promise;
		};

		o.createComment = function(comment){
			var q = $q.defer();
			$http.post("/api/comments", comment, getAuth()).success(function(res){
				q.resolve(res);
			});
			return q.promise;
		}

		//--------------------GETTING TOPICS----------------------------------------
		o.getTopics = function() {
			var q = $q.defer();
			$http.get("/api/topics").success(function(res){
				q.resolve(res);
			});
			return q.promise;
		};

		o.getTopic = function(topicId) {
			var q = $q.defer();
			$http.get("/api/topics/" + topicId).success(function(res){
				q.resolve(res);
			});
			return q.promise
		}
		//--------------------DELETING & EDITING----------------------------------------
		o.deleteTopic = function(topicToDelete){
			var q = $q.defer();
			$http.delete("/api/topics/" + topicToDelete._id).success(function(res){
				q.resolve(res);
			});
			return q.promise;
		}

		o.editTopic = function(topic){
			console.log(topic);
			var q = $q.defer();
			$http.put("/api/topics/" + topic._id, topic).success(function(res){
				q.resolve(res);
			});
			return q.promise;
		}

		//--------------------AUTHORIZATION----------------------------------------
		function getAuth() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			}
			return auth;
		};
		//-----------------------------------------------------------------------------


		return o;
	}
})();