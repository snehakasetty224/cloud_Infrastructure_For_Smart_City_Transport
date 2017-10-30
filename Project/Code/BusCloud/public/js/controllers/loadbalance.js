App.controller('loadbalanceController', ['$scope', '$http', function ($scope, $http) {

  $scope.server1 = 0;
  $scope.server2 = 0;
  $scope.urls = [];

  $scope.init = function() {
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/loadbalance'
    }).then(function(resp) {
      var data = resp.data;
      $scope.server1 = data.server1;
      $scope.server2 = data.server2;
      $scope.urls = data.urls;
    });
  };

}]);
