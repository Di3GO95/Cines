function registro_de_usuario() {
  var hay_error = comprobar_campos();

  if (!hay_error){
    document.getElementById("registro_cargando").style['display'] = 'inline';
    registrar_usuario();
  }
}

function comprobar_campos(){
  var error_nombre = comprobar_nombre();
  var error_correo = comprobar_correo();
  var error_pass = comprobar_pass();
  var error_pass2 = comprobar_pass2();

  return error_nombre || error_correo || error_pass || error_pass2;
}

function comprobar_nombre(){
  var elem_nombre = document.getElementById("registro_nombre");
  var elem_nombre_validacion = document.getElementById("nombre_validacion");

  elem_nombre_validacion.style['display'] = 'none';
  if (elem_nombre.value == ""){
    elem_nombre_validacion.style['display'] = 'inherit';
    elem_nombre_validacion.innerHTML = "El nombre es obligatorio";

    return true;
  }

  if (elem_nombre.value.length <= 3){
    elem_nombre_validacion.style['display'] = 'inherit';
    elem_nombre_validacion.innerHTML = "El nombre debe tener más de 3 caracteres";

    return true;
  }

  return false;
}

function comprobar_correo(){
  var elem_correo = document.getElementById("registro_correo");
  var elem_correo_validacion = document.getElementById("correo_validacion");

  elem_correo_validacion.style['display'] = 'none';

  if (elem_correo.value == ""){
    elem_correo_validacion.style['display'] = 'inherit';
    elem_correo_validacion.innerHTML = "El correo es obligatorio";

    return true;
  }

  if (!validarCorreo(elem_correo.value)){
    elem_correo_validacion.style['display'] = 'inherit';
    elem_correo_validacion.innerHTML = "Ingrese un correo válido";

    return true;
  }

  return false;
}

function comprobar_pass(){
  var elem_pass = document.getElementById("registro_pass");
  var elem_pass_validacion = document.getElementById("pass_validacion");

  elem_pass_validacion.style['display'] = 'none';

  if (elem_pass.value == ""){
    elem_pass_validacion.style['display'] = 'inherit';
    elem_pass_validacion.innerHTML = "La contraseña es obligatoria";

    return true;
  }

  if (elem_pass.value.length <= 3){
    elem_pass_validacion.style['display'] = 'inherit';
    elem_pass_validacion.innerHTML = "La contraseña debe tener más de 3 caracteres";

    return true;
  }

  return false;
}

function comprobar_pass2(){
  var elem_pass2 = document.getElementById("registro_pass2");
  var elem_pass2_validacion = document.getElementById("pass2_validacion");

  elem_pass2_validacion.style['display'] = 'none';

  if (elem_pass2.value == ""){
    elem_pass2_validacion.style['display'] = 'inherit';
    elem_pass2_validacion.innerHTML = "La contraseña es obligatoria";

    return true;
  }

  var elem_pass = document.getElementById("registro_pass");
  if (elem_pass.value != elem_pass2.value){
    elem_pass2_validacion.style['display'] = 'inherit';
    elem_pass2_validacion.innerHTML = "Las contraseñas deben ser iguales";

    return true;
  }

  return false;
}

function validarCorreo(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/*
REGISTRO DE USUARIO
*/


function registrar_usuario(){
  console.log("registrando usuario");
  peticion_http = inicializa_xhr();
  if (peticion_http) {
    peticion_http.onreadystatechange = procesaRespuesta;
    peticion_http.open("POST", "http://localhost:3000/registro", true);
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
  var correo = document.getElementById("registro_correo");
  var pass = document.getElementById("registro_pass");
  var nombre = document.getElementById("registro_nombre");

  return "correo=" + encodeURIComponent(correo.value) +
         "&pass=" + encodeURIComponent(pass.value) +
         "&nombre=" + encodeURIComponent(nombre.value) +
         "&nocache=" + Math.random();
}

function procesaRespuesta() {
  if (peticion_http.readyState == 4) {
    var mensaje = peticion_http.responseText;
    var color = "";

    if (peticion_http.status == 200){
      color = "green";
    }else{
      color = "red";
    }

    if (peticion_http.status == 0)
      mensaje = "Error al conectar con el servidor";

    document.getElementById("registro_resultado_interno").innerHTML = mensaje;
    document.getElementById("registro_resultado_interno").style['background-color'] = color;
    document.getElementById("registro_resultado_interno").style['display'] = "inherit";

    document.getElementById("registro_cargando").style['display'] = 'none';
  }
}
