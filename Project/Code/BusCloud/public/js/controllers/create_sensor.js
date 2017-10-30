App.controller('createSensorController', ['$scope', '$http', function ($scope, $http) {

  $scope.formSensor = {};

  $scope.sensors_type = [];
  $scope.buses_type = [];

  // $scope.choices = [{
  //   text: 'Physical Sensor',
  //   isEmulator: "false"
  // }, {
  //   text: 'Emulator',
  //   isEmulator: "true"
  // }];

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
  };

  $scope.createSensors = function() {
    console.log($scope.formSensor);
    $scope.formSensor.type = parseInt($scope.formSensor.type, 10);
    $http({
      method: 'POST',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/sensors',
      data: $scope.formSensor
    }).then(function(data) {
      window.location = "/sensors";
    }, function(err) {
      //handling error
      alert('Create Sensor failed. Please try again.');
    });
  };
}]);
