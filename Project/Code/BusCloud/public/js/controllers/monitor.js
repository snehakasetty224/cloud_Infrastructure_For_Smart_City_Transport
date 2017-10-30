App.controller('monitorController', ['$scope', '$http', function ($scope, $http) {

  var types = ['Location', 'Clipper', 'Speed', 'Temperature'];

  $scope.monitors = [];

  $scope.init = function() {
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/monitor/statistics'
    }).then(function(resp) {
      console.log(resp.data);
      $scope.monitors = resp.data;
    });
  };

  $scope.displayId = function(str) {
    var length = str.length;
    return '***-' + str.substring(str.length - 12, str.length);
  };

  $scope.convertType = function(type) {
    // console.log(type);
    return types[type - 1];
  };

}]);
