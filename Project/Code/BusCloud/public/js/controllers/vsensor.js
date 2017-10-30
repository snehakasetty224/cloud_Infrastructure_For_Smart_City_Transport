App.controller('vsensorsController', ['$scope', '$http', function ($scope, $http) {

  var types = ['Location', 'Clipper', 'Speed', 'Temperature'];

  $scope.vsensors = [];

  $scope.init = function() {
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/vsensors'
    }).then(function(resp) {
      console.log(resp.data);
      var data = resp.data.data || [];
      var arr = [];
      for (var i = 0; i < data.length; i++) {
        var tmp = data[i].VirtualSensor;
        tmp.type = data[i].Sensor.type;
        tmp.sensor_status = data[i].Sensor.status; //display sensor status
        // console.log(tmp);
        arr.push(tmp);
      }
      $scope.vsensors = arr;
    });
  };

  $scope.vconvertType = function(type) {
    // console.log(type);
    return types[type - 1];
  };

  $scope.convertStatus = function(status, sensor_status) {
    return (status === true || status === 1 && sensor_status === true) ? 'On' : 'Off';
  };

  $scope.handleStatus = function(id, status, sensor_status) {
    if (sensor_status === false) {
      alert('Physical Sensor is currently off. Cannot act on virtual sensor');
    }
    $http({
      method: 'PUT',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/vsensors/' + id,
      data: {
        status: (status === true || status === 1) ? false : true
      }
    }).then(function(resp) {
      alert('Update Status sucessfully');
      window.location.reload();
    });
  }

}]);
