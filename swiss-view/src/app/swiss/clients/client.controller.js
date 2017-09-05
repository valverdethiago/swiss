(function() {
    'use strict';

    angular
        .module('swiss-module')
        .controller('ClientController', ClientController);


    /* @ngInject */
    function ClientController($scope, $mdDialog, $mdMedia, $mdToast, $translate, util, clientService) {
        var clientController = this;

        clientController.find = find;
        clientController.onPageChange = onPageChange;
        clientController.detail = detail;
        clientController.createNew = createNew;
        clientController.open = open;
        clientController.save = save;
        clientController.closeDialog = closeDialog;
        clientController.openDialog = openDialog;
        clientController.init = init;


        function init() {
            angular.copy(util.defaultPageRequest, clientController.pageRequest = {});
            clientController.pageRequest.pageSize = 10;
        	clientController.pageRequest.onlyActives = true;
        	clientController.find();
        	$scope.$watch('controller.pageRequest.searchTerm', function(newValue, oldValue) {
        		if(util.isUndefinedOrNull(newValue)) {
        			return;
        		}
        		if(newValue.length >3) {
        			clientController.find();
        		}
        	});
        };

        function find() {
            clientService.find(clientController.pageRequest)
        	.success(function(searchResult) {
        		util.adjustSearchResultForGrid(searchResult, clientController.pageRequest);
        		clientController.searchResult = searchResult;
        	})
        	.error(function (error) {
        		console.log(error);
        	});
        };

        function onPageChange(newPageNumber) {
        	var pageRequest = clientController.pageRequest;
        	pageRequest.pageNumber = newPageNumber;
        	clientController.pageRequest.offset = pageRequest.pageSize * (newPageNumber - 1);
            clientController.find();
        };

        function detail(event, entity) {
            angular.copy(entity, clientController.entity = {});
            openDialog(event);
        };

        function createNew(event) {
            clientController.entity = {};
            openDialog(event);
        }

        function save(entity) {
            clientService.save(entity)
        	.success(function(result) {
            	util.showMessage($mdToast, 'Client saved successfully.');
            	closeDialog();
                find();
        	})
        	.error(function (error) {
            	util.showMessage($mdToast, 'An error has occurred. Try again later.');
        	});
        };

        function openDialog(event) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/swiss/clients/client_detail.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true,
                fullscreen: ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen,
                locals: {
                	clientController : clientController,
                	util : util
                }
              });
        };

        function closeDialog() {
            $mdDialog.hide();
        };

        function DialogController($scope, clientController, util) {
            $scope.controller = clientController;
            $scope.util = util;
        };

    }
})();
