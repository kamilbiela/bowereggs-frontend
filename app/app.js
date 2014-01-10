angular.module('EggApp', ['ngRoute'], function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/app/view/search.html',
            controller: 'SearchController'
        })
        .otherwise({
            redirectTo: '/'
        });
});