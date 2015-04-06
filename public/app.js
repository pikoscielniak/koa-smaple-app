import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMessages from 'angular-messages';
import * as projectModule from './project/project.module';
import angularConfig from './angularConfig';
import * as infrastructureModule from './infrastructure/infrastructure.module';
import * as authModule from './auth/auth.module';


angular.module('app', ['ui.router', 'ngMessages'])
    .config(angularConfig)
    .factory('projectService', projectModule.projectService)
    .factory('voteService', projectModule.voteService)
    .controller('projectCtrl', projectModule.projectCtrl)
    .controller('addProjectCtrl', projectModule.addProjectCtrl)
    .factory('alertService', infrastructureModule.alertService)
    .factory('socketService', infrastructureModule.socketService)
    .controller('headerCtrl', infrastructureModule.headerCtrl)
    .factory('authService', authModule.authService)
    .factory('authTokenService', authModule.authTokenService)
    .factory('authInterceptor', authModule.authInterceptor)
    .controller('loginCtrl', authModule.loginCtrl)
    .controller('registerCtrl', authModule.registerCtrl)
    .controller('logoutCtrl', authModule.logoutCtrl);


