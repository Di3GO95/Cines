var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

/*
Dado que este server (node JS) y el de la práctica (Apache) se encuentran en
puertos y dominios distintos, debemos permitir las peticiones desde dominios
externos
*/
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "daweb_cines",
  port: 3307
});

app.post('/registro', function (peticion, respuesta){
                var nombre = peticion.body.nombre;
                var correo = peticion.body.correo;
                var pass = peticion.body.pass;

                var status = 0;
                var mensaje = "";

                var sql = "INSERT INTO usuarios (nombre, correo, pass) VALUES ('" + nombre + "', '" + correo + "', '" + pass + "')";
                con.query(sql, function (err, result) {
                  if (err){
                    switch (err.code) {
                      case 'ER_DUP_ENTRY':
                        status = 409;
                        mensaje = "Ya existe un usuario con ese correo";
                        break;
                      case 'ECONNREFUSED':
                        status = 503;
                        mensaje = "La base de datos no está disponible";
                        break;
                      default:
                        status = 500;
                        mensaje = "Error interno en la base de datos";
                        break;
                    }
                  }else{
                    status = 200;
                    mensaje = "Usuario registrado correctamente";
                  }
                  console.log("Intento de registro de usuario: statusCode: " + status + ", mensaje: " + mensaje);
                  console.log("\n");
                  respuesta.status(status);
                  respuesta.send(mensaje);
                })

});

app.post('/login', function (peticion, respuesta){
                var correo = peticion.body.correo;
                var pass = peticion.body.pass;

                var status = 0;
                var mensaje = "";

                var sql = "SELECT * FROM usuarios WHERE correo = " + mysql.escape(correo);
                con.query(sql, function (err, result) {
                  if (err){
                    switch (err.code) {
                      case 'ECONNREFUSED':
                        status = 503;
                        mensaje = "La base de datos no está disponible";
                        break;
                      default:
                        status = 500;
                        mensaje = "Error interno en la base de datos";
                        break;
                    }
                  }else{
                    // el usuario no existe
                    if (result.length != 1){
                      status = 401;
                      mensaje = "El correo no existe";
                    }else{
                      // 401 fail login
                      if (result[0].pass != pass){
                        status = 401;
                        mensaje = "Contraseña incorrecta";
                      }else{// login correcto
                        status = 200;
                        mensaje = result[0].nombre;
                      }
                    }
                  }
                  console.log("Intento de login de usuario: statusCode: " + status + ", mensaje: " + mensaje);
                  console.log("\n");
                  respuesta.status(status);
                  respuesta.send(mensaje);
                })

});


app.post('/registro_tf', function (peticion, respuesta){
                var correo = peticion.body.correo;
                var status = 0;
                var mensaje = "";

                var sql = "INSERT INTO tarjetas_fidelidad (correo) VALUES ('" + correo + "')";
                con.query(sql, function (err, result) {
                  if (err){
                    switch (err.code) {
                      case 'ER_DUP_ENTRY':
                        status = 409;
                        mensaje = "Ya existe una tarjeta asociada al correo";
                        break;
                      case 'ECONNREFUSED':
                        status = 503;
                        mensaje = "La base de datos no está disponible";
                        break;
                      default:
                        status = 500;
                        mensaje = "Error interno en la base de datos";
                        break;
                    }
                  }else{
                    status = 200;
                    mensaje = "Tarjeta registrada correctamente";
                  }
                  console.log("Intento de registro de tarjeta: statusCode: " + status + ", mensaje: " + mensaje);
                  console.log("\n");
                  respuesta.status(status);
                  respuesta.send(mensaje);
                })

});

app.get('/tarjeta_fidelidad/', function (peticion, respuesta){
    var correo = peticion.query.correo;
    var status = 0;
    var mensaje = "";

    var sql = "SELECT * FROM tarjetas_fidelidad WHERE correo = " + mysql.escape(correo);

    con.query(sql, function (err, result) {
      if (err){
        switch (err.code) {
          case 'ECONNREFUSED':
            status = 503;
            mensaje = "La base de datos no está disponible";
            break;
          default:
            status = 500;
            mensaje = "Error interno en la base de datos";
            break;
        }
      }else{
        // el usuario no existe
        if (result.length != 1){
          status = 401;
          mensaje = "El correo no existe";
        }else{
          // login correcto
          status = 200;
          mensaje = result[0].puntos;
        }
      }
      console.log("Intento de obtencion de puntos tf de usuario: statusCode: " + status + ", mensaje: " + mensaje);
      console.log("\n");
      respuesta.status(status);
      respuesta.send(mensaje.toString());
    })
});



var server = app.listen(3000, function(){
              console.log("\n");
              console.log("***************************************");
              console.log('Servidor web iniciado en el puerto 3000');
              console.log("***************************************");

              console.log("\n");
              console.log("Entradas en el servidor:");
              console.log("\n");

              console.log("URL: '/registro' | método: POST | parámetros: nombre , correo , pass");
              console.log("Descripción: Registro de usuario");
              console.log("\n");

              console.log("URL: '/login' | método: POST | parámetros: correo , pass");
              console.log("Descripción: Login de usuario");
              console.log("\n");

              console.log("URL: '/registro_tf' | método: POST | parámetros: correo");
              console.log("Descripción: Registro de tarjeta de fidelidad");
              console.log("\n");

              console.log("URL: '/tarjeta_fidelidad' | método: GET | parámetros: correo");
              console.log("Descripción: Lista de tarjetas asociadas al correo");
              console.log("\n");
              console.log("***************************************");
              console.log("\n");
            });
