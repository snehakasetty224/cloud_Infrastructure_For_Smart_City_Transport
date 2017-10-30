App.controller('sensorsController', ['$scope', '$http', function ($scope, $http) {

  var types = ['Location', 'Clipper', 'Speed', 'Temperature'];

  $scope.sensors = [];

  $scope.init = function() {
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/sensors'
    }).then(function(resp) {
      console.log(resp.data);
      $scope.sensors = resp.data.data;
    });
  };

  $scope.convertType = function(type) {
    // console.log(type);
    return types[type - 1];
  };

  $scope.convertStatus = function(status) {
    return (status === true || status === 1) ? 'On' : 'Off';
  };

  //Function handle physical sensor status
  $scope.handleStatus = function(id, status) {
    $http({
      method: 'POST',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/sensors/' + id + '/status',
      data: {
        status: (status === true || status === 1) ? false : true
      }
    }).then(function(resp) {
      alert('Update Status sucessfully');
      window.location.reload();
    });
  };

}]);
