var db = require("./connection")
var teste

exports.createTable = function () {
    db.createTable("task").
        addColumn("id", lf.Type.INTEGER).
        addColumn("description", lf.Type.STRING).
        addPrimaryKey(["id"], true);
}

exports.add = function(task) {
    db.connect().then(function(db) {
      teste = db.getSchema().table("task")

      var row = teste.createRow({
          "description": task.description
      })

      console.log(row)
    })
}

exports.load = function() {
    db.connect().then(function(db) {
        var file = db.getSchema().table("task")

        return db.select().from(file).exec().then(function(row) {
            console.log(row)
        })
    })
}
