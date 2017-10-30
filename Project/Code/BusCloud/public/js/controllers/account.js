App.controller('accountController', ['$scope', '$http', function ($scope, $http) {

  var DEFAULT_PASSWORD = '*****';

  $scope.formAccountData = {};
  $scope.errorState = false;
  $scope.errorMessage = '';

  $scope.init = function() {
    //Get sensors type
    var data = APP_CLOUD.getHeaders(true);
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/accounts/' + data.u
    }).then(function(resp) {
      $scope.formAccountData = resp.data;
      $scope.formAccountData.confirm_password = DEFAULT_PASSWORD;
      $scope.formAccountData.password = DEFAULT_PASSWORD;
    });
  };

  $scope.updateAccount = function() {
    $scope.errorState = false;
    $scope.errorMessage = '';

    var formAccountData = $scope.formAccountData;
    if (formAccountData.password === DEFAULT_PASSWORD || (formAccountData.password !== formAccountData.confirm_password)) {
      $scope.errorState = true;
      $scope.errorMessage = 'Please enter valid password';
      return;
    } else {
      var data = APP_CLOUD.getHeaders(true);
      $http({
        method: 'PUT',
        headers: data,
        url: '/api/accounts/' + data.u,
        data    : $scope.formAccountData
      }).then(function(data) {
        alert('Update Account successfully.');
      }, function(err) {
        //handling error
        alert('Update Account failed. Please try again.');
      });
    }
  };
}]);
