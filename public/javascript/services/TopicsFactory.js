(function() {
	'use strict';
	angular.module('app')
	.factory('TopicsFactory', TopicsFactory);

	TopicsFactory.$inject = ['$http', '$q'];

	function TopicsFactory($http, $q) {
		var o = {};
		
		return o;
	}
})();