angular.module('starter.controllers', [])

    .controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, $ionicLoading){
	$scope.data = {};
	$scope.login = function(){
	    $ionicLoading.show({
		template: '<ion-spinner></ion-spinner> <br/> Recuperando datos del servidor.'
	    });
	    LoginService.loginUser($scope.data.email, $scope.data.password).then(function(data){
		$ionicLoading.hide();
		if(data.status == 200 && data.success == 1){
		    window.localStorage.setItem("email", $scope.data.email);
		    $state.go('tab.dash');
		}	
		if(data.status == 200 && data.success == 0){
		    var alertPopup = $ionicPopup.alert({
			title: '¡Datos incorrectos!',
			template: 'Revise su correo electrónico o contraseña.'
		    });
		}	
	    });
	}
    })

    .controller('DashCtrl', function($scope, $state) {
	if(window.localStorage.getItem("email") === "undefined" || window.localStorage.getItem("email") === null) {
            $state.go('login');
	}
    })

    .controller('ChatsCtrl', function($scope, Chats) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	$scope.chats = Chats.all();
	$scope.remove = function(chat) {
	    Chats.remove(chat);
	};
    })

    .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function($scope) {
	$scope.settings = {
	    enableFriends: true
	};
    });
