'use strict'

const db = require("../db/connection")
const tasksTable = require("../db/tasks")

app.controller('taskController', function ($scope, $http, $timeout, $window) {
    $scope.tasks = []

    tasksTable.createTable()

    $scope.save = function(task) {
        $scope.tasks.push(task)

        tasksTable.add(task)

        delete $scope.task;
    }

    $scope.load = function() {
        tasksTable.load(function(results, callback) {
            $scope.tasks = results
            console.log($scope.tasks)
            callback()
        })
    }

    $scope.load()
})
