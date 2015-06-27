var app = angular.module("speakApp", ["firebase", "ngRoute"])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				controller: 'authCtrl',
				templateUrl: 'createUser.html'
			})
			.when('/home', {
				controller: 'homeViewCtrl',
				templateUrl: 'homeView.html',
				resolve: {
					currentAuth: function(Auth) {
						return Auth.$waitForAuth();
					}
				}
			})
			.when('/profile/:id', {
				controller: 'profileViewCtrl',
				templateUrl: 'profileView.html'
			})
			// .when('/show/:id', {
			//   controller: 'showLinkCtrl',
			//   templateUrl: 'show.html'
			// })
			.otherwise({
				redirectTo: '/'
			});
	});
var ref = new Firebase("https://whisperapp.firebaseio.com/");

app.service("Auth", function($firebaseAuth) {
	console.log($firebaseAuth(ref));
	return $firebaseAuth(ref);
});

app.controller("authCtrl",
	function($scope, Auth) {
		Auth.$authWithPassword({
			"Name": "Foo Bar",
			"email": "foo@bar.com",
			"password": "brains"
		}).then(function(authData) {

		}).catch(function(error) {

		});

		$scope.userSubmit = function() {
			Auth.$onAuth(function(authData) {
				if (authData) {
					// user logged in
				} else {
					// user logged out
				}
			});
			Auth.$createUser({
				"email": $scope.email,
				"Name": $scope.named,
				"password": $scope.password
			}).then(function(userData) {
				$scope.message = "User created with uid: " + userData.uid;
				
			}).catch(function(error) {
				$scope.error = error;
				console.log($scope.error);
			});

		};
	});





//

//
// $scope.authObj.ref.$createUser({
//   email: "foo@bar.com",
//   password: "brains"
// }).then(function(userData){
//   //User created
// }).catch(function(error){
//   // error creating user
// });
//
// $routeProvider.when("/account",{
//   controller: "AccountCtrl",
//   templateUrl: "veiws/account.html",
//   resolve: {
//     currentAuth: function(Auth){
//       return Auth.$waitForAuth();
//     }
//   }
// });
// $stateProvider.state("/account",{
//   controller: "AccountCtrl",
//   templateUrl: "veiws/account.html",
//   resolve: {
//     currentAuth: function(Auth){
//       return Auth.$waitForAuth();
//     }
//   }
// });
