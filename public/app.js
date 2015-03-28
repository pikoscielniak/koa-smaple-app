import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMessages from 'angular-messages';
import * as projectModule from './project/project.module';
import config from './angularConfig';

angular.module('app', ['ui.router', 'ngMessages'])
    .config(config)
    .factory('projectService', projectModule.projectService)
    .controller('projectCtrl', projectModule.projectCtrl)
    .controller('addProjectCtrl', projectModule.addProjectCtrl)
    .controller('addProjectConfirmCtrl', projectModule.addProjectConfirmCtrl);


