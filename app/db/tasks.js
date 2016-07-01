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

exports.add = function(opt) {
    db.connect().then(function(db) {
        table = db.getSchema().table("task")

        var row = table.createRow({
            "description": opt.task.description
        })

        db.insertOrReplace().into(table).values([row]).exec().then(function(row) {
            console.log("row:" + JSON.stringify(row))
            opt.callback()
            db.close()
        })
    })
}

exports.load = function(callback) {
    db.connect().then(function(db) {
        table = db.getSchema().table("task")

        var rows = [{ id: 1, description: 'ola' }, { id: 2, description: 'huebr' }]
        console.log("static: " +JSON.stringify(rows))

        db.select().from(table).exec().then(function(results) {
            console.log("callback banco: " +JSON.stringify(results))
            callback(JSON.stringify(results));
            db.close()
        })
    })
}
