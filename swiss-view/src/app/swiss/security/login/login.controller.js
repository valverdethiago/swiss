(function() {
    'use strict';

    angular
        .module('swiss-module')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($location, $injector, $filter, $rootScope, $cookies, $translate, $window, $http, $mdToast, $localStorage, triSettings, loginService, util) {
        var loginController = this;
        loginController.login = login;
        loginController.languages = triSettings.languages;
        loginController.logout = logout;
        loginController.init = init;
        loginController.switchLanguage = switchLanguage;
        loginController.retrieveUserInfo = retrieveUserInfo;
        loginController.notImplementedYet = notImplementedYet;
        loginController.getUserInfo = getUserInfo;
        // create blank user variable for login form
        loginController.user = {
            username: '',
            password: ''
        };
        loginController.clientId = "ldap";
        loginController.secret = "secret"
        loginController.credentials = $window.btoa(loginController.clientId+':'+loginController.secret);

        function login() {
        	loginService.login(loginController.user, loginController.credentials)
        	.success(function(result) {
                $localStorage.token = result.access_token;
                loginController.retrieveUserInfo();
                $location.url('/');
        	})
        	.error(function (error) {
        		console.log(error);
                $localStorage.$reset();
            	util.showMessage($mdToast, 'Usuário ou senha inválidos');
        	});

        }

        function getUserInfo() {
        	return $localStorage.user;
        }

        function retrieveUserInfo() {
        	loginService.retrieveUserLoggedIn()
        	.success(function(result) {
        		console.log(result);
                $localStorage.user = result;
        	})
        	.error(function(error) {
            	util.showMessage($mdToast, 'Não foi possível recuperar informações do usuário');
        	});
        }

        function switchLanguage(languageCode) {
            if($injector.has('$translate')) {
                var $translate = $injector.get('$translate');
                $translate.use(languageCode)
                .then(function() {
                    $mdToast.show(
                        $mdToast.simple()
                        .content($filter('triTranslate')('Language Changed'))
                        .position('bottom right')
                        .hideDelay(500)
                    );
                    $rootScope.$emit('changeTitle');
                });
            }
        }

        function logout() {
            $localStorage.$reset();
            $location.url('/login');
        };

        function init() {
        	if(!util.isUndefinedOrNull($localStorage.token)) {
                $location.url('/');
        	}
        }

        function notImplementedYet() {
        	util.showMessage($mdToast, 'Not yet implemented');
        }
    }



})();
