App.controller('paymentController', ['$scope', '$http', function ($scope, $http) {

  $scope.formPayment = {};

  $scope.processPayment = function() {
     $http({
      method  : 'POST',
      url     : '/api/payment',
      headers : APP_CLOUD.getHeaders(),
      data    : $scope.formPayment,
    }).then(function(data) {
      window.location = '/dashboard'; //redirect to create payment
    }, function(err) {
    });
  };

}]);
