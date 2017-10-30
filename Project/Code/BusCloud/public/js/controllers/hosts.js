App.controller('hostsController', ['$scope', '$http', function ($scope, $http) {

  $scope.formBus = {};
  $scope.buses = [];
  $scope.routes = [];
  $scope.hubs = [];

  $scope.createBus = function() {
    $http({
      method  : 'POST',
      url     : '/api/hosts',
      headers : APP_CLOUD.getHeaders(true),
      data    : $scope.formBus
    }).then(function(data) {
      // window.location = '/hosts'; //redirect to create payment
      window.location.reload(true);
    }, function(err) {
    });
  };

  $scope.init = function() {
    //Get all hosts
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/hosts'
    }).then(function(resp) {
      // console.log(resp.data);
      $scope.buses = resp.data;
    });
    //Get existing routes
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/routes'
    }).then(function(resp) {
      // console.log(resp.data);
      $scope.routes = resp.data;
    });
    //Get existing hubs
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/hubs'
    }).then(function(resp) {
      // console.log(resp.data);
      $scope.hubs = resp.data;
    });
  };

  $scope.handleHostStatus = function(id, status) {
    console.log('handle host status');
    $http({
      method: 'PUT',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/hosts/' + id,
      data: {
        status: (status === true || status === 1) ? false : true
      }
    }).then(function(resp) {
      alert('Update Bus Status sucessfully');
      window.location.reload();
    });
  };

  $scope.convertTime = function(date) {
    var d = new Date(date);
    return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
  };

  $scope.convertStatus = function(status) {
    return (status === true) ? 'On' : 'Off';
  };

  $scope.btnStatus = function(status) {
    console.log(status);
    return 'Turn ' + ((status === true) ? 'Off' : 'On');
  };

}]);
