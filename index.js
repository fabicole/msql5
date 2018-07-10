const express = require('express');
const mongodb = require('mongodb');
const mysql = require('mysql');
const http = require('http');
var Database = require('mysql-functions');

var connection_string = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "mydb"
}

var db = new Database(connection_string);
db.connect()
    .then(async function() {
        console.log('connected');
        await db.execute('create temporary table kiosk(id int not null auto_increment, nazov varchar(255), typ int, primary key(id))');
        var result1 = await db.execute('insert into kiosk(nazov, typ) values(?, ?)', ['a3', 1]);
        console.log('identity1', db.identity);
        var result2 = await db.execute('insert into kiosk(nazov, typ) values(?, ?)', ['a4', 1]);
        console.log('identity2', db.identity);
        var result3 = await db.execute('insert into kiosk(nazov, typ) values(?, ?)', ['a5', 1]);
        console.log('identity3', db.identity);
        var q = await db.query('select * from kiosk where id>? order by id', [1]);
        console.log(q);
        db.disconnect();
    })
    .catch(function(error) {
        console.log(error.message);
    });

var port = process.env.PORT || 8080;
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("texto incluido por mi  <br>");
    res.write("otra linea de texto mio  <br>");
    res.end('Hello World!');
}).listen(port);
console.log( "servidor corriondo en el puerto "+ port);
