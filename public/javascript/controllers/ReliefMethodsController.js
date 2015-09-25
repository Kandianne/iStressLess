(function() {
	'use strict';
	angular.module('app')
	.controller('ReliefMethodsController', ReliefMethodsController);

	ReliefMethodsController.$inject = ["ReliefMethodsFactory"];

	function ReliefMethodsController(ReliefMethodsFactory) {
		var vm = this;
		vm.title = 'Relief Methods';

		vm.getVideos = function(){
			ReliefMethodsFactory.getVideos().then(function(res){
				vm.videos = res;
				console.log(res);
			})
		}
	}
})();