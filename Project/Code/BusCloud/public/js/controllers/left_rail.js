App.controller('leftRailController', ['$scope', '$http', function ($scope, $http) {

  $scope.accountData = {};

  $scope.handleActive = function(name) {

  };

  $scope.init = function() {
    var headers = APP_CLOUD.getHeaders(true);
    $http({
      method: 'GET',
      headers: headers,
      url: '/api/accounts/' + headers.u
    }).then(function(resp) {
      // console.log(resp.data);
      $scope.accountData = resp.data;
    });
  };

}]);
