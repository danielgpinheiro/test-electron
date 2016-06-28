'use strict'
const lf = require('lovefield')
const db = require("./connection")
let table

exports.createTable = function () {
    db.createTable("task").
        addColumn("id", lf.Type.INTEGER).
        addColumn("description", lf.Type.STRING).
        addPrimaryKey(["id"], true);
}

exports.add = function(task) {
    console.log(task);

    db.connect().then(function(db) {
        table = db.getSchema().table("task")

        var row = table.createRow({
            "description": task.description
        })

        db.insertOrReplace().into(table).values([row]).exec().then(function() {
            db.close()
        })
    })
}

exports.load = function(callback) {
    db.connect().then(function(db) {
        table = db.getSchema().table("task")

        db.select().from(table).exec().then(function(results) {
            callback(results, function() {
                db.close()
            });
        })
    })
}
