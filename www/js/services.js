angular.module('starter.services', [])


    .factory('LoginService', function($http, $q) {
	return {
            loginUser: function(email, pw) {

		var deferred = $q.defer();
		var promise = deferred.promise;
		
		//var link = 'http://localhost:1337/lab.aplicacionescolar.com/users/signin';
		var link = 'http://lab.aplicacionescolar.com/users/signin';
		var config = {
                    headers : {
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
		}

		$http.post(link, {"user_email": email + "/82-788bdd6c7871e28490962fb0b41", "user_pass": pw}).then(function(response){
		    console.info(response);
		    deferred.resolve(response.data);
		}, function(errResponse){
		    deferred.reject(errResponse);
		});

		return promise;
            }
	}
    })

    .factory('Chats', function() {
	// Might use a resource here that returns a JSON array

	// Some fake testing data
	var chats = [{
	    id: 0,
	    name: 'Ben Sparrow',
	    lastText: 'You on your way?',
	    face: 'img/ben.png'
	}, {
	    id: 1,
	    name: 'Max Lynx',
	    lastText: 'Hey, it\'s me',
	    face: 'img/max.png'
	}, {
	    id: 2,
	    name: 'Adam Bradleyson',
	    lastText: 'I should buy a boat',
	    face: 'img/adam.jpg'
	}, {
	    id: 3,
	    name: 'Perry Governor',
	    lastText: 'Look at my mukluks!',
	    face: 'img/perry.png'
	}, {
	    id: 4,
	    name: 'Mike Harrington',
	    lastText: 'This is wicked good ice cream.',
	    face: 'img/mike.png'
	}];

	return {
	    all: function() {
		return chats;
	    },
	    remove: function(chat) {
		chats.splice(chats.indexOf(chat), 1);
	    },
	    get: function(chatId) {
		for (var i = 0; i < chats.length; i++) {
		    if (chats[i].id === parseInt(chatId)) {
			return chats[i];
		    }
		}
		return null;
	    }
	};
    });
