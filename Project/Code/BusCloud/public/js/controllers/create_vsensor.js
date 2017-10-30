App.controller('createVSensorController', ['$scope', '$http', function ($scope, $http) {

  $scope.sensors_type = [];
  $scope.buses_type = [];
  $scope.sla_type = [];

  $scope.init = function() {
    //Get sensors type
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/sensors/types'
    }).then(function(resp) {
      $scope.sensors_type = resp.data;
    });
    //Get bus
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/hosts'
    }).then(function(resp) {
      // console.log(resp.data);
      $scope.buses_type = resp.data;
    });
    //Get SLA
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/sla'
    }).then(function(resp) {
      // console.log(resp.data);
      $scope.sla_type = resp.data;
    });
  };

  $scope.handleVSensorCreate = function() {
    console.log($scope.formSensor);
    $scope.formSensor.type = parseInt($scope.formSensor.type, 10);
    $http({
      method: 'POST',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/vsensors',
      data: $scope.formSensor
    }).then(function(data) {
      window.location = "/vsensors";
    }, function(err) {
      //handling error
      alert('Create Sensor failed. Please try again.');
    });
  };

}]);
