'use strict';
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('task.sqlite3');
module.exports = db;
