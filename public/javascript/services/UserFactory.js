(function() {
	'use strict';
	angular.module('app')
	.factory('UserFactory', UserFactory);

	UserFactory.$inject = ['$http', '$q', '$rootScope', '$window'];

	function UserFactory($http, $q, $rootScope, $window) {
		var o = {};


		//---------------------TOKENS----------------------------------------------------

		function setToken(token) {
			localStorage.setItem("token", token);
		};

		function removeToken() {
			localStorage.removeItem("token");
		};

		function getToken() {
			return localStorage.token;
		};


		function isLoggedIn() {
			var token = getToken();
			if(token) {
				var payload = JSON.parse(urlBase64Decoder(token.split(".")[1]));
				if(payload.exp > Date.now() / 1000) {
					return payload;
				}
			} else {
				return false;
			}
		};

		function urlBase64Decoder(str) {
			var output = str.replace(/-/g, '+').replace(/_/g, '/');
			switch(output.length % 4) {
				case 0:{break; }
				case 2: {output += '=='; break;}
				case 3: {output += '='; break;}
				default:
				throw 'Illegal base64url string'
			}
			return decodeURIComponent(escape($window.atob(output)));
		};

		//---------------------LOGIN, REGISTER, LOGOUT----------------------------------------------------

		o.registerUser = function(user) {
			var q = $q.defer();
			$http.post('/api/user/register', user).success(function(res) {
				console.log(res);
				q.resolve();
			});
			return q.promise;
		};

		o.loginUser = function(user) {
			var q = $q.defer();
			user.username = user.username.toLowerCase();
			$http.post('/api/user/login', user).success(function(res) {
				setToken(res.token);
				$rootScope._user = isLoggedIn();
				console.log($rootScope._user);
				q.resolve();
			});
			return q.promise;
		};

		o.logoutUser = function() {
			var q = $q.defer();
			removeToken();
			$rootScope._user = isLoggedIn();
			q.resolve();
			return q.promise;
		};

		//---------------------GETTING USER----------------------------------------------------

		o.getUserLoggedIn = function (id) {
			var q = $q.defer();
			$http.get('/api/user/'+ id).success(function (res) {
				q.resolve(res);
			})
			return q.promise;
		};

		$rootScope._user = isLoggedIn() ;

		return o;
	}
})();