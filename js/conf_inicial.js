/*
Fichero JavaScript con las funcionalidades que se realizan al cargar
una página.

1.- Cabecera usuario

Cambia la parte de la cabecera referente a la información del usuario,
cambiando según el usuario está logueado o no.

2.- Tarjeta de fidelidad

Cuando un usuario registrado accede a su tarjeta de fidelidad, esta página
cambia según si el usuario haya registrado o no una tarjeta de fidelidad.

3.- Comercios

Al igual que con la tarjeta de fidelidad, la página cambia según el usuario esté
logueado o no.
*/

window.onload = function conf_inicial(){
  /*
  1.- Cabecera usuario
  */
  mostrar_cabecera();

  /*
  2.- Tarjeta de fidelidad
  Solo se llamará a esta función cuando estemos en la página correspondiente
  */
  var url_registro_tf = "registro_tarjeta_fidelidad.html";
  var urlActual = window.location.pathname;
  if (urlActual.indexOf(url_registro_tf) != -1)
    cuerpo_tf_mostrar_cuerpo();

  /*
  3.- Comercios
  Solo se llamará a esta función cuando estemos en la página correspondiente
  */
  var url_comercios = "comercios.html";
  if (urlActual.indexOf(url_comercios) != -1)
    conf_inicial_registro_comercios();
}


/************************************
*************************************
*************************************
1.- Cabecera usuario
*************************************
*************************************
************************************/

function mostrar_cabecera(){
  var fichero = "";
  if (is_usuario_logueado()){
    fichero = "../utils/cabecera_usuario_logueado.txt";
  }else{
    fichero = "../utils/cabecera_visitante.txt";
  }

  var xhttp = inicializa_xhr();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      document.getElementById("header_usuario").innerHTML =
        this.responseText;

      if (is_usuario_logueado()){
        var usuario = getCookie("user_logueado");
        document.getElementById("nombre_usuario").innerHTML = "Bienvenido " + usuario;
      }
    }
  };

  xhttp.open("GET", fichero, true);
  xhttp.send();
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function is_usuario_logueado(){
  var user = getCookie("user_logueado");
  return user != "";
}

function inicializa_xhr(){
  if(window.XMLHttpRequest) {
    return new XMLHttpRequest();
  }
  else if(window.ActiveXObject) {
    return new ActiveXObject("Microsoft.XMLHTTP");
  }
}


/************************************
*************************************
*************************************
2.- Tarjeta de fidelidad
*************************************
*************************************
************************************/

var puntos = 0;
var correo = "";

function cuerpo_tf_mostrar_cuerpo(){
  var fichero = "";
  var tiene_tf = false;

  correo = cuerpo_tf_getCookie("correo_logueado");
  if (correo == "")
    tiene_tf = false;
  else{
    var peticion_http = cuerpo_tf_inicializa_xhr();
    peticion_http.onreadystatechange = function() {

      if (peticion_http.readyState == 4){
        if (peticion_http.status == 200) {
          puntos = peticion_http.responseText;
          tiene_tf = true;
        }else{
          tiene_tf = false;
        }

        registrar_tf_cambiar_cuerpo(tiene_tf);

      }
    }

    var correo_bien = encodeURIComponent(correo);
    peticion_http.open("GET", "http://localhost:3000/tarjeta_fidelidad?correo=" + correo_bien, true);
    peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    peticion_http.send(null);
  }
}

function registrar_tf_cambiar_cuerpo(tf_registrada){
  if (tf_registrada){
    fichero = "../utils/tarjeta_fidelidad_registrada.txt";
  }else{
    fichero = "../utils/tarjeta_fidelidad_no_registrada.txt";
  }

  var xhttp = cuerpo_tf_inicializa_xhr();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      document.getElementById("section_body_secciones").innerHTML =
        this.responseText;

      if (tf_registrada){
        document.getElementById("registro_tf_puntos").innerHTML = puntos;
      }
    }
  };

  xhttp.open("GET", fichero, true);
  xhttp.send();
}

function registrar_tf_crea_query_string() {
  return "correo=" + encodeURIComponent(correo) +
         "&nocache=" + Math.random();
}

function cuerpo_tf_getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function cuerpo_tf_inicializa_xhr(){
  if(window.XMLHttpRequest) {
    return new XMLHttpRequest();
  }
  else if(window.ActiveXObject) {
    return new ActiveXObject("Microsoft.XMLHTTP");
  }
}



/************************************
*************************************
*************************************
3.- Comercios
*************************************
*************************************
************************************/

function conf_inicial_registro_comercios(){
  var fichero = "";
  if (is_usuario_logueado()){
    fichero = "../utils/comercios_usuario_logueado.txt";
  }else{
    fichero = "../utils/comercios_visitante.txt";
  }

  var xhttp = inicializa_xhr();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      document.getElementById("section_body_secciones").innerHTML =
        this.responseText;
    }
  };

  xhttp.open("GET", fichero, true);
  xhttp.send();
}
