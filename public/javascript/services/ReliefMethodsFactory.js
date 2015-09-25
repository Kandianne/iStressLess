(function() {
	'use strict';
	angular.module('app')
	.factory('ReliefMethodsFactory', ReliefMethodsFactory);

	ReliefMethodsFactory.$inject = ['$http', '$q'];

	function ReliefMethodsFactory($http, $q) {
		var o = {};

		//--------------------MAKE REQUEST TO RESOURCE ENDPOINT for RDIO----------------------------------------
		
		o.getVideos = function() {
			var key = 'AIzaSyDwfvdr35jllTWp00LxitgdZB8xE953akI';
			var q = $q.defer();
			$http.get("https://www.googleapis.com/youtube/v3/videos?part=yoga&chart=mostPopular&maxResults=60&videoCategoryId=fitness&key={" + key + "}").success(function(res){
				q.resolve(res);
			});
			return q.promise;
		};
		
		return o;
	}
})();