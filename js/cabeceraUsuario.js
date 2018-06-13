window.onload = function mostrar_cabecera(){
  var fichero = "";
  console.log(is_usuario_logueado());
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
