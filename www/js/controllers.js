angular.module('starter.controllers', [])

    .controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, $ionicLoading, $ionicHistory){
	$scope.data = {};
	$scope.login = function(){
	    window.localStorage.clear();
	    $ionicHistory.clearCache();
	    $ionicHistory.clearHistory();
	    $ionicLoading.show({
		template: '<ion-spinner></ion-spinner> <br/> Recuperando datos del servidor.'
	    });
	    LoginService.loginUser($scope.data.email, $scope.data.password).then(function(data){
		$ionicLoading.hide();
		if(data.status == 200 && data.success == 1){

		    var names = data.USERS[0].USER_NAMES + ' ' + data.USERS[0].USER_LASTNAMES;
		    var id = data.USERS[0].USER_ID;
		    
		    window.localStorage.setItem("user_session", names);
		    window.localStorage.setItem("user_id", id);
		    
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
	
	var session = window.localStorage.getItem("user_session");
	console.log(session);
	if(session == null) {
	    $state.go('login');
	}
    })

    .controller('ChatsCtrl', function($scope, Chats, $ionicLoading) {
	
	$ionicLoading.show({
	    template: '<ion-spinner></ion-spinner> <br/> Obteniendo mensajes.'
	});
	Chats.getMessages(window.localStorage.getItem("user_id")).then(function(data){
	    $ionicLoading.hide();
	    $scope.messages = data;
	    console.info(data);
	});
	
	/*
	$scope.remove = function(chat) {
	    Chats.remove(chat);
	};*/

    })

    .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function($scope, $ionicHistory, $timeout, $state) {
	
	$scope.user = window.localStorage.getItem("user_session");
	
	$scope.logout = function(){
	    $timeout(function () {
		window.localStorage.clear();
		$ionicHistory.clearCache();
		$ionicHistory.clearHistory();
	    }, 200)
	    $state.go('login');
	}
    });
