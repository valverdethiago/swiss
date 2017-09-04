(function() {
    'use strict';

    angular
        .module('swiss-module')
        .factory('loginService', loginService);


    /* @ngInject */
    function loginService($http, API_CONFIG) {
        var service = {
            login : login,
            logout : logout,
            retrieveUserLoggedIn : retrieveUserLoggedIn
        };
        return service;

        function login(user, credentials) {
        	var loginUrl = '/swiss/oauth/token';
        	var params = 'grant_type=password&username='+user.username+'&password='+user.password;
        	return $http.post(loginUrl, params, {
                headers : {
                    'Authorization': 'Basic ' + credentials,
                    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                }

            })
        };

        function retrieveUserLoggedIn() {
        	return $http.get('/swiss/rest/user/retrieve');
        };

        function logout() {
        	return $http.get(urlBase+'/logout');
        };
    }
})();
