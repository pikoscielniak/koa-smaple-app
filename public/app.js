import angular from 'angular';
import * as ProjectModule from './project/project.module';

angular.module('app', [])
    .factory('ProjectService', ProjectModule.service)
    .controller('ProjectCtrl', ProjectModule.ctrl);