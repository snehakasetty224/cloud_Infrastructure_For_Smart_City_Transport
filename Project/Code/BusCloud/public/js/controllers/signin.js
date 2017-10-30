App.controller('signinController', ['$scope', '$http', function ($scope, $http) {

  $scope.formSigninData = {};
  $scope.formSignupData = {};

  $scope.signinState = true;
  $scope.errorState = false;
  $scope.errorMessage = '';

  $scope.processSignin = function() {
    $http({
      method  : 'POST',
      url     : '/api/login',
      headers : APP_CLOUD.getHeaders(true),
      data    : $scope.formSigninData
    }).then(function(data) {
      window.location = '/dashboard'; //redirect to dashboard
    }, function(err) {
    });
  };

  $scope.processSignup = function() {
    $scope.errorState = false;
    $scope.errorMessage = '';

    var formSignupData = $scope.formSignupData;
    // if (formSignupData.confirm_password !== formSignupData.password) {
    //   $scope.errorMessage = 'Please enter matching password';
    //   $scope.errorState = true;
    //   return;
    // }
    $http({
      method  : 'POST',
      url     : '/api/accounts',
      headers : APP_CLOUD.getHeaders(true),
      data    : $scope.formSignupData
    }).then(function(data) {
      window.location = '/payment/create'; //redirect to create payment
    }, function(err) {
      $scope.errorMessage = 'Error signup. Please try again';
      $scope.errorState = true;
    });
  };

  $scope.showSignin = function() {
    $scope.signinState = true;
  };

  $scope.showSignup = function() {
    $scope.signinState = false;
  };

}]);
