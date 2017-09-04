(function() {
    'use strict';

    var module = angular
        .module('swiss-module')
        .config(webCrawlerModuleConfig);

    var util = {
    	defaultPageRequest : {
           	itensPerLine : 3,
            pageNumber : 1,
            pageSize : 6,
            offset : 0
    	},
    	isUndefinedOrNull : isUndefinedOrNull,
    	isNotNull : isNotNull,
    	adjustSearchResultForGrid : adjustSearchResultForGrid,
    	showMessage : showMessage,
    	indexOf : indexOf,
    	showMessageDialog : showMessageDialog
    };

    module.constant('util', util);


    /* @ngInject */
    function webCrawlerModuleConfig($translatePartialLoaderProvider, $stateProvider, $httpProvider, paginationTemplateProvider) {
        $httpProvider.interceptors.push(authInterceptor);
        paginationTemplateProvider.setPath('app/util/new-pagination.tpl.html');

        $stateProvider
        .state('authentication', {
            abstract: true,
            views: {
                'root': {
                    templateUrl: 'app/swiss/security/layouts/authentication.tmpl.html'
                }
            },
            data: {
                permissions: {
                    only: ['viewAuthentication']
                }
            }
        })
        .state('authentication.login', {
            url: '/login',
        	templateUrl : 'app/swiss/security/login/login.tmpl.html',
            controller: 'LoginController',
            controllerAs: 'loginController'
        })

        $stateProvider
        .state('projects', {
            parent : 'triangular',
            data: {
                layout: {
                    sideMenuSize: 'off'
                }
            },
            url: '/projects',
            templateUrl: 'app/swiss/projects/projects.html',
            controller: 'ProjectController',
            controllerAs: 'projectController'
        });
    };

    /** @ngInject */
    function authInterceptor($log, $q, $location, $localStorage) {
    	return {
    		'request': function (config) {
    			config.headers = config.headers || {};
    			if ($localStorage.token) {
    				config.headers.Authorization = 'Bearer ' + $localStorage.token;
    			}
    			return config;
    		},
		    'responseError' : function(rejection) {
			    if (rejection.status == 401 || rejection.status == 403) {
			    	if (rejection.config.url == 'rest/security/login') {
			    		return $q.reject(rejection);
				   	}
	            	$localStorage.$reset();
				    $location.url('/login');
			    }
			    return $q.reject(rejection);
		    }
	    };
    };

    function adjustSearchResultForGrid(searchResult, pageRequest) {
		searchResult.limit = (searchResult.number + 1) * searchResult.numberOfElements;
    	if( searchResult.content.length < pageRequest.itensPerLine ) {
    		searchResult.columns = new Array(searchResult.content.length);
    	}
    	if( searchResult.content.length >= pageRequest.itensPerLine ) {
    		searchResult.columns = new Array(pageRequest.itensPerLine);
    	}
    	searchResult.content.forEach(function (value, i) {
    		var i_x = i % pageRequest.itensPerLine;
    		var array = searchResult.columns[i_x];
    		if(typeof array == 'undefined') {
    			array = new Array();
    			searchResult.columns[i_x] = array;
    		}
    		array.push(value);
    	});
    };

    function isNotNull(val) {
	    return !(val === null);
	}

    function isUndefinedOrNull(val) {
	    return angular.isUndefined(val) || val === null;
	}

    function showMessage($mdToast, message) {
    	$mdToast.show(
    		$mdToast.simple()
    	    	.textContent(message)
    	        .position('top right')
    	        .hideDelay(4000)
    	);
    }

    function indexOf(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }

    function showMessageDialog ($mdDialog, parentSelector, title, label, message) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector(parentSelector)))
            .clickOutsideToClose(true)
            .title(title)
            .textContent(message)
            .ariaLabel(label)
            .ok('OK')
            .targetEvent(null)
        );
      };



})();
