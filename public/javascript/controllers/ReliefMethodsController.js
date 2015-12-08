(function() {
	'use strict';
	angular.module('app')
	.controller('ReliefMethodsController', ReliefMethodsController);

	ReliefMethodsController.$inject = ['$http', '$q', '$sce'];

	function ReliefMethodsController($http, $q, $sce) {
		var vm = this;
		vm.title = 'Relief Methods';

		vm.getVideos = function(userChoice){
			userChoice = vm.reliefTopics;
			console.log(userChoice)
			var promise = $q.defer();
			console.log(userChoice);
			var key = 'AIzaSyBweK7eb7SRrc-vs1nVbcqFwDi8ZHOe9W0';
			var q = userChoice;
			$http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + userChoice + '&key=' + key )
			.success(function(res){
				promise.resolve(res);
				vm.videos = res;
				console.log(vm.videos);
				for(var i = 0; i < vm.videos.items.length; i++){
					vm.videos.items[i].embedVideos = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + vm.videos.items[i].id.videoId);
				}
				console.log(vm.videos.items);
			})
			return q.promise;
		}

		
		vm.addVideoToList = function(video) {

			var videoLink = $('<a>');
			videoLink.append(video.snippet.title);
			var thumbnailUrl = youtube.generateThumbnailUrl(video.id.videoId);
			var thumbnailImg = $('<img>');
			thumbnailImg.attr('src', thumbnailUrl);
			videoLink.append(thumbnailImg);

			videoLink.on('click', function(e) {
				e.preventDefault();

				var videoTitle = $('<h2>');
				videoTitle.html(video.snippet.title + ' <small>' + video.snippet.channelTitle + '</small>');

				var videoEmbed = $('<iframe></iframe>');
				videoEmbed.attr('src', youtube.generateEmbedUrl(video.id.videoId));
				videoEmbed.attr('width', 560);
				videoEmbed.attr('height', 315);

				var videoWatcher = $('#video-watcher');
				videoWatcher.hide();
				videoWatcher.empty();
				videoWatcher.append(videoTitle);
				videoWatcher.append(videoEmbed);
				videoWatcher.fadeIn();
			});

			var videoItem = $('<li>');
			videoItem.append(videoLink);
			$('#videos-list').append(videoItem);
		};
	}
})();