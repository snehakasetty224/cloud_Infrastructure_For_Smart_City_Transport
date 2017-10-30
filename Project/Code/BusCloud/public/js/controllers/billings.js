App.controller('billingsController', ['$scope', '$http', function ($scope, $http) {

  $scope.billings = [];

  $scope.init = function() {
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/billings'
    }).then(function(resp) {
      console.log(resp.data);
      $scope.billings = resp.data;
    });
  };

  $scope.displayDate = function(date) {
    return APP_CLOUD.formatDate(date);
  };
}]);
