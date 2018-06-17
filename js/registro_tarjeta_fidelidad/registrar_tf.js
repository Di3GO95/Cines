function registrar_tf(){
  peticion_http = registrar_tf_inicializa_xhr();
  if (peticion_http) {
    document.getElementById("registro_tf_cargando").style['display'] = 'inline';

    peticion_http.onreadystatechange = registrar_tf_procesaRespuesta;
    peticion_http.open("POST", "http://localhost:3000/registro_tf", true);
    peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var query_string = registrar_tf_crea_query_string();
    peticion_http.send(query_string);
  }
}

function registrar_tf_inicializa_xhr(){
  if(window.XMLHttpRequest) {
    return new XMLHttpRequest();
  }
  else if(window.ActiveXObject) {
    return new ActiveXObject("Microsoft.XMLHTTP");
  }
}

function registrar_tf_get_cookie(cname) {
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

function registrar_tf_crea_query_string() {
  var correo = registrar_tf_get_cookie("correo_logueado");

  return "correo=" + encodeURIComponent(correo) +
         "&nocache=" + Math.random();
}

function registrar_tf_procesaRespuesta() {
  if (peticion_http.readyState == 4) {
    var mensaje = peticion_http.responseText;
    var color = "";

    if (peticion_http.status == 200){
      color = "green";
      mensaje += ". Refresca la página para ver los datos.";
    }else{
      color = "red";
    }

    if (peticion_http.status == 0)
      mensaje = "Error al conectar con el servidor";

    document.getElementById("registro_tf_boton_resultado").innerHTML = mensaje;
    document.getElementById("registro_tf_boton_resultado").style['background-color'] = color;
    document.getElementById("registro_tf_boton_resultado").style['display'] = "inherit";

    document.getElementById("registro_tf_cargando").style['display'] = 'none';
  }
}
