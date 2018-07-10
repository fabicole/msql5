
var mysqlx = require('@mysql/xdevapi');

// Connect to server on localhost
mysqlx
  .getSession({
    host: 'localhost',
    port: 33060,
    user: 'root',
    password: ''
  })
  .then(function (mySession) {

    var myDb = mySession.getSchema('mascole18');
     Object.assign(mySession,myDb);

    /*
mySession.executeSql("charset utf8;").execute().catch(function (err) {
  console.log('El error occurrió: ' + err.message)});
*/
  mySession.executeSql("use mascole18 ;").execute();
 mySession.executeSql("SET character_set_results='utf8'").execute();
//  mySession.executeSql("Select * from sakila.actor where actor_id=1;").execute(function (row) { console.log(row);mySession.close(); })
   mySession.executeSql("SELECT nombre, rtrim(Apellido1),rtrim(Apellido2), RTRIM(Nivel), cedula, sexo, Activo, Observaciones FROM estudiantes")
    //SELECT X FROM T ORDER BY X COLLATE collation_name SELECT Nombre, Apellido1, Apellido2, Activo, Nivel, Cedula FROM estudiantes COLLATE utf8_general_ci;
  .execute(function (row) { console.log(row); })
  .then( function (notices) { console.log(notices); })
  .then(function () {
    return mySession.close();
  })
  .catch(function (err) {
    console.log('The following error occurred: ' + err.message);

  })
  })
  .catch(function (err) {
    console.log('The database session could not be opened: ' + err.message);
  });
