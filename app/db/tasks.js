var db = require("./connection");

var TaskManager = {
  createTable: function(){
    db.serialize(function() {
      db.run("CREATE TABLE IF NOT EXISTS tasks (task VARCHAR(255))");
    });
  },
  createTask: function(task){
    var stmt = db.prepare("INSERT INTO tasks(task) VALUES ('"+task.task"')");
    stmt.run();
    stmt.finalize();
  }
}

module.exports = TaskManager;
