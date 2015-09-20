(function() {
	'use strict';
	angular.module('app')
	.factory('ReliefMethodsFactory', ReliefMethodsFactory);

	ReliefMethodsFactory.$inject = ['$http', '$q'];

	function ReliefMethodsFactory($http, $q) {
		var o = {};
		
		return o;
	}
})();