import angular from 'angular';
import uiRouter from 'angular-ui-router';
import * as ProjectModule from './project/project.module';
import config from './angularConfig';

angular.module('app', ['ui.router'])
    .config(config)
    .factory('ProjectService', ProjectModule.service)
    .controller('ProjectCtrl', ProjectModule.ctrl);


