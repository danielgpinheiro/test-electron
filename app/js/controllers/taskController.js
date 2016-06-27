// var db = require("../db/connection")
// var tasksTable = require("../db/tasks")

app.controller('taskController', function ($scope, $http, $timeout, $window) {
    $scope.tasks = [
        { id: 1, description: "Teste 123" },
        { id: 2, description: "Teste fixcode" },
        { id: 3, description: "Electron" }
    ];

    // tasksTable.createTable()

    $scope.save = function(task) {
        $scope.tasks.push(task)

        tasksTable.add(task)

        delete $scope.task;

        // $scope.load()
    }

    $scope.load = function() {
        tasksTable.load()
    }
})
