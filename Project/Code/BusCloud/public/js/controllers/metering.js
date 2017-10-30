App.controller('meteringController', ['$scope', '$http', function ($scope, $http) {

  $scope.meterings = [];

  $scope.init = function() {
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/usage'
    }).then(function(resp) {
      console.log(resp.data);
      $scope.meterings = resp.data;
    });

  };

  $scope.displayId = function(str) {
    var length = str.length;
    return '***-' + str.substring(str.length - 12, str.length);
  };

  $scope.displayDate = function(date) {
    return APP_CLOUD.formatDate(date);
  };

  // $scope.estimatePayment = function(data) {

  // };
}]);
