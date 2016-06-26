var db = require("../db/connection");
var TaskManager = require("../db/tasks");

app.controller('taskController', function ($scope, $http, $timeout, $window) {
  $scope.teste = 'tesdw'
  // TaskManager.createTable();

  $scope.save = function(task) {
    // TaskManager.createUser(task);
    delete $scope.task;
    console.log(task);
  }
})
