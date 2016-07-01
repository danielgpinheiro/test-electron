'use strict'
const db = require("../db/connection")
const taskModel = require("../db/tasks")

app.controller('taskController', function ($scope, $http, $timeout, $window) {
    $scope.tasks = []

    taskModel.createTable()

    $scope.save = function(task) {
        delete $scope.teste

        taskModel.add({ task: task, callback: function() {
            $scope.tasks.push(task)
        }})
    }

    $scope.load = function() {
        taskModel.load(function(results) {
            console.log("angular:" + JSON.stringify(results))

            $scope.tasks = results
        })
    }

    $scope.load()
})
