angular.module('EggApp', ['ngRoute'], function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/app/view/search.html',
            controller: 'SearchController'
        })
        .when('/show/:id', {
            templateUrl: '/app/view/show.html',
            controller: 'ShowController'
        })
        .otherwise({
            redirectTo: '/'
        });
});