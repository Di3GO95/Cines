function valida() {
  var hay_error = comprobar_campos();

  if (!hay_error){
    document.getElementById("cargando").style['display'] = 'inline';
    loguear_usuario();
  }
}

function comprobar_campos(){
  var error_correo = comprobar_correo();
  var error_pass = comprobar_pass();
  document.getElementById("acceder_validacion").style['display'] = "none";

  return error_correo || error_pass;
}

function comprobar_correo(){
  var elem_correo = document.getElementById("correo");
  var elem_correo_validacion = document.getElementById("correo_validacion");

  elem_correo_validacion.style['display'] = 'none';

  if (elem_correo.value == ""){
    elem_correo_validacion.style['display'] = 'inherit';
    elem_correo_validacion.innerHTML = "Escriba su correo";

    return true;
  }

  return false;
}

function comprobar_pass(){
  var elem_pass = document.getElementById("pass");
  var elem_pass_validacion = document.getElementById("pass_validacion");

  elem_pass_validacion.style['display'] = 'none';

  if (elem_pass.value == ""){
    elem_pass_validacion.style['display'] = 'inherit';
    elem_pass_validacion.innerHTML = "Escriba su contraseña";

    return true;
  }

  return false;
}

/*
Login
*/


function loguear_usuario(){
  peticion_http = inicializa_xhr();
  if (peticion_http) {
    peticion_http.onreadystatechange = procesaRespuesta;
    peticion_http.open("POST", "http://localhost:3000/login", true);
    peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var query_string = crea_query_string();
    peticion_http.send(query_string);
  }
}

function inicializa_xhr(){
  if(window.XMLHttpRequest) {
    return new XMLHttpRequest();
  }
  else if(window.ActiveXObject) {
    return new ActiveXObject("Microsoft.XMLHTTP");
  }
}

function crea_query_string() {
  var correo = document.getElementById("correo");
  var pass = document.getElementById("pass");

  return "correo=" + encodeURIComponent(correo.value) +
         "&pass=" + encodeURIComponent(pass.value) +
         "&nocache=" + Math.random();
}

function procesaRespuesta() {
  console.log("respuestaaaaa");
  console.log(peticion_http.Status);
  if (peticion_http.readyState == 4) {
    var mensaje = peticion_http.responseText;
    var color = "";

    console.log("Status: " + peticion_http.status);

    if (peticion_http.status == 0)
      mensaje = "Error al conectar con el servidor";

    document.getElementById("cargando").style['display'] = 'none';

    /*
    Login correcto
    */
    if (peticion_http.status == 200){
      console.log("Nombre de usuario: " + mensaje);
      loguear_usuario_cookie(mensaje);
      cambiar_cabecera_usuario(mensaje);
    }else{
      console.log("El nuevo mensaje es: " + mensaje);
      document.getElementById("acceder_validacion").value = mensaje;
      document.getElementById("acceder_validacion").innerHTML = mensaje;
      document.getElementById("acceder_validacion").style['display'] = "inherit";
    }
  }
}

function loguear_usuario_cookie(usuario){
  document.cookie = "user_logueado" + "=" + usuario + "; path=/;";
}

function cambiar_cabecera_usuario(usuario){
  var xhttp = inicializa_xhr();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      document.getElementById("header_usuario").innerHTML =
        this.responseText;

      document.getElementById("nombre_usuario").innerHTML = "Bienvenido " + usuario;
    }
  };

  xhttp.open("GET", "../utils/cabecera_usuario_logueado.txt", true);
  xhttp.send();
}
