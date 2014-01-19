angular.module('EggApp').controller('SearchController', function($scope, $http) {

    $scope.query = '';
    $scope.filter = {
        byName: true,
        byDescription: false,
        byKeywords: false
    }

    $scope.currentPage = 0;
    $scope.totalPages = 0;

    var resetCurrentPage = function() {
        $scope.currentPage = 1;
    }

    var setSearchParam = function(name, value) {
        if (typeof value === 'undefined') {
            return {};
        }

        return {}[name] = value;
    };  

    var updateStateAfterResponse = function(data) {
        $scope.eggs = data.data;
        $scope.resultCount = data.meta.count;
        $scope.totalPages = data.meta.totalPages;            
    }

    var makeSearchRequest = function() {
        var params = {
            search: $scope.query,
            page: $scope.currentPage
        };
        angular.extend(params, $scope.filter);

        $scope.showSpinner = true;

        $http.get('/api/egg', {params: params}).success(function(data, status) {
            updateStateAfterResponse(data, status);
            $scope.showSpinner = false;

        }).error(function(data, status) {
            $scope.showSpinner = false;
            alert('there was error: ' + data); 
        });
    };

    $scope.onFormSubmit = function() {
        resetCurrentPage();
        makeSearchRequest();
    };

    $scope.onClickPageNext = function() {
        if ($scope.currentPage >= $scope.totalPages) {
            return;
        }

        $scope.currentPage++;

        makeSearchRequest();
    };

    $scope.onClickPagePrev = function() {
        if ($scope.currentPage <= 1) {
            return;
        }

        $scope.currentPage--;

        makeSearchRequest();
    };

    resetCurrentPage();
});