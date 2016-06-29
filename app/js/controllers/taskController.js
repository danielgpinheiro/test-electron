'use strict'
const db = require("../db/connection")
const taskModel = require("../db/tasks")

app.controller('taskController', function ($scope, $http, $timeout, $window) {
    $scope.tasks = []

    taskModel.createTable()

    $scope.save = function(task) {
        delete $scope.teste

        taskModel.add({ task: task, callback: function() {
            // console.log("ok")
            $scope.tasks.push(task)
        }})

        // $timeout(function() {
        //     $scope.load()
        // }, 100)
    }

    $scope.load = function() {
        taskModel.load(function(results) {
            console.log(results)

            $scope.tasks = results
        })
    }

    $scope.load()
})
