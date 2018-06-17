var correo = "";

function login_valida() {
  var hay_error = login_comprobar_campos();

  if (!hay_error){
    document.getElementById("cargando").style['display'] = 'inline';
    login_loguear_usuario();
  }
}

function login_comprobar_campos(){
  var error_correo = login_comprobar_correo();
  var error_pass = login_comprobar_pass();
  document.getElementById("cabecera_acceder_validacion").style['display'] = "none";

  return error_correo || error_pass;
}

function login_comprobar_correo(){
  var elem_correo = document.getElementById("correo");
  var elem_correo_validacion = document.getElementById("cabecera_correo_validacion");

  elem_correo_validacion.style['display'] = 'none';

  if (elem_correo.value == ""){
    elem_correo_validacion.style['display'] = 'inherit';
    elem_correo_validacion.innerHTML = "Escriba su correo";

    return true;
  }

  return false;
}

function login_comprobar_pass(){
  var elem_pass = document.getElementById("pass");
  var elem_pass_validacion = document.getElementById("cabecera_pass_validacion");

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


function login_loguear_usuario(){
  peticion_http = login_inicializa_xhr();
  if (peticion_http) {
    peticion_http.onreadystatechange = login_procesaRespuesta;
    peticion_http.open("POST", "http://localhost:3000/login", true);
    peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var query_string = login_crea_query_string();
    peticion_http.send(query_string);
  }
}

function login_inicializa_xhr(){
  if(window.XMLHttpRequest) {
    return new XMLHttpRequest();
  }
  else if(window.ActiveXObject) {
    return new ActiveXObject("Microsoft.XMLHTTP");
  }
}

function login_crea_query_string() {
  var correoElem = document.getElementById("correo");
  var pass = document.getElementById("pass");

  correo = correoElem.value;

  return "correo=" + encodeURIComponent(correoElem.value) +
         "&pass=" + encodeURIComponent(pass.value) +
         "&nocache=" + Math.random();
}

function login_procesaRespuesta() {
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
      login_loguear_usuario_cookie(mensaje);
      login_cambiar_cabecera_usuario(mensaje);
    }else{
      document.getElementById("cabecera_acceder_validacion").value = mensaje;
      document.getElementById("cabecera_acceder_validacion").innerHTML = mensaje;
      document.getElementById("cabecera_acceder_validacion").style['display'] = "inherit";
    }
  }
}

function login_loguear_usuario_cookie(usuario){
  document.cookie = "user_logueado" + "=" + usuario + "; path=/;";
  document.cookie = "correo_logueado" + "=" + correo + "; path=/;";
}

function login_cambiar_cabecera_usuario(usuario){
  var xhttp = login_inicializa_xhr();
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
