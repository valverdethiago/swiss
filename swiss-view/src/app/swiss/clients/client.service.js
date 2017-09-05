(function() {
    'use strict';

    angular
        .module('swiss-module')
        .factory('clientService', ClientService);


    /* @ngInject */
    function ClientService($http) {
    	var urlBase = '/swiss/rest/client' ;
        var service = {
            save: save,
            load: load,
            remove: remove,
            find: find,
            list: list
        };
        return service;

        function save(project) {
        	return $http.post(urlBase+'/save', project);
        };

        function load (id) {
        	return $http.put(urlBase+'/load/' + id);
        };

        function remove (id) {
            return $http.delete(urlBase + '/delete/' + id);
        };

        function list () {
            return $http.get(urlBase + '/list');
        };

        function find (searchObject) {
            return $http.post(urlBase + '/find', searchObject);
        };
    }
})();
