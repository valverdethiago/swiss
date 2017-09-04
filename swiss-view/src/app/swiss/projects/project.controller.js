(function() {
    'use strict';

    angular
        .module('swiss-module')
        .controller('ProjectController', ProjectController);


    /* @ngInject */
    function ProjectController($scope, $mdDialog, $mdMedia, $mdToast, $translate, projectService, util) {
        var projectController = this;

        projectController.find = find;
        projectController.onPageChange = onPageChange;
        projectController.detail = detail;
        projectController.createNew = createNew;
        projectController.open = open;
        projectController.save = save;
        projectController.closeDialog = closeDialog;
        projectController.openDialog = openDialog;
        projectController.activate = activate;
        projectController.archive = archive;
        projectController.confirmArchivation = confirmArchivation;
        projectController.init = init;
        projectController.canArchive = canArchive;
        projectController.canActivate = canActivate;


        function init() {
            angular.copy(util.defaultPageRequest, projectController.pageRequest = {});
        	projectController.pageRequest.onlyActives = true;
        	projectController.find();
        	$scope.$watch('pc.pageRequest.searchTerm', function(newValue, oldValue) {
        		if(util.isUndefinedOrNull(newValue)) {
        			return;
        		}
        		if(newValue.length >3) {
        			projectController.find();
        		}
        	});
        	$scope.$watch('pc.pageRequest.onlyActives', function(newValue, oldValue) {
    			projectController.find();
        	});
        };

        function find() {
            projectService.find(projectController.pageRequest)
        	.success(function(searchResult) {
        		util.adjustSearchResultForGrid(searchResult, projectController.pageRequest);
        		projectController.searchResult = searchResult;
        	})
        	.error(function (error) {
        		console.log(error);
        	});
        };

        function onPageChange(newPageNumber) {
        	var pageRequest = projectController.pageRequest;
        	pageRequest.pageNumber = newPageNumber;
        	projectController.pageRequest.offset = pageRequest.pageSize * (newPageNumber - 1);
            projectController.find();
        };

        function detail(event, entity) {
            angular.copy(entity, projectController.entity = {});
            openDialog(event);
        };

        function createNew(event) {
            projectController.entity = {};
            openDialog(event);
        }

        function open(event, entity) {
        	util.showMessage($mdToast, 'Not implemented yet');
        }

        function save(entity) {
            projectService.save(entity)
        	.success(function(result) {
            	util.showMessage($mdToast, 'Project saved successfully.');
            	closeDialog();
                find();
        	})
        	.error(function (error) {
            	util.showMessage($mdToast, 'An error has occurred. Try again later.');
        	});
        };

        function confirmArchivation(event, entity) {
            var confirm = $mdDialog.confirm()
                  .title('Project archived successfully.')
                  .textContent('It can be reactivated later.')
                  .ariaLabel('Confirmation')
                  .targetEvent(event)
                  .ok('Ok')
                  .cancel('Cancel');
            $mdDialog.show(confirm).then(function() {
            	projectController.archive(entity);
            }, function() {
            	detail(event, entity);
            });
        }

        function archive(entity) {
            projectService.archive(entity)
        	.success(function(result) {
            	util.showMessage($mdToast, 'Project archived successfully.');
            	closeDialog();
                projectController.find();
        	})
        	.error(function (error) {
            	util.showMessage($mdToast, 'An error has occurred. Try again later.' );
        	});
        };

        function canArchive(entity) {
        	if(util.isUndefinedOrNull(entity) || util.isUndefinedOrNull(entity.id)) {
        		return false;
        	}
        	return util.isUndefinedOrNull(entity.archivationDate);
        };

        function canActivate(entity) {
        	if(util.isUndefinedOrNull(entity) || util.isUndefinedOrNull(entity.id)) {
        		return false;
        	}
        	return !util.isUndefinedOrNull(entity.archivationDate) ;
        }

        function activate(event, entity) {
            projectService.activate(entity)
        	.success(function(result) {
            	util.showMessage($mdToast, 'Project activated successfully.');
            	closeDialog();
                find();
        	})
        	.error(function (error) {
            	util.showMessage($mdToast, 'An error has occurred. Try again later.' );
        	});
        };

        function openDialog(event) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/swiss/projects/project_detail.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true,
                fullscreen: ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen,
                locals: {
                	projectController : projectController,
                	util : util
                }
              });
        };

        function closeDialog() {
            $mdDialog.hide();
        };

        function DialogController($scope, projectController, util) {
            $scope.controller = projectController;
            $scope.util = util;
        };

    }
})();
