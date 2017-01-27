'use strict';

var app = angular.module('app', ['ui.router', 'ngMaterial']);


app.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise("/");

  $stateProvider

    .state('home', {
      url: "/home",
      templateUrl: "home.html"
      // -----> User can be both logged in or not
    })

    .state('private-user', {
      url: "/user",
      templateUrl: "user.html",
      controller: "UserCtrl as userCtrl",
      // resolve: {
      //   editorData: function ($stateParams, $http) {
      // ----> CHECK IN A VARIABLE IF USER IS LOGGED IN
      //   }
      }
    })

    .state('private-page-editor', {
      url: "/editor/:name",
      templateUrl: "editor.html",
      controller: "EditorCtrl as editorCtrl",
      // resolve: {
      //   editorData: function ($stateParams, $http) {
      // ----> CHECK IN A VARIABLE IF USER IS LOGGED IN
      // ----> CHECK IF USER HAS SUCH PAGE NAME
      //   }
      }
    })

    .state('public-page', {
      url: "/public/:name",
      templateUrl: "public.html",
      controller: "PublicCtrl as publicCtrl",
      resolve: {
        publicData: function ($stateParams, $http) {
          // TODO: extract to service or factory
          var url = '//socialmirror-4e6c3.firebaseio.com/public/' + $stateParams.name + '.json';
          return $http.get(url).then(function(response) {
            return response.data;
          });
        }
      }
    })

});

app.run(function($rootScope) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
    $rootScope.stateLoading = true;
  });
  
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $rootScope.stateLoading = false;
  });

  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) { 
    console.log(error);
  });

})
