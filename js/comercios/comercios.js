/*
PARTE DE REGISTRO DE COMERCIOS
*/

function comercios_elegir_cine_registro(cine){
  document.getElementById("comercios_cine_elegido_registro").innerHTML = cine;

  document.getElementById("comercios_registro_comercio").style['display'] = "inherit";
  document.getElementById("comercios_cine_elegido_registro").style['font-weight'] = "bold";

  document.getElementById("comercio").value = "";
  document.getElementById("comercio_validacion_nombre").style['display'] = "none";

  document.getElementById("comercio_validacion_registro").style['display'] = "none";
}

function registro_de_comercio(){
  var error_registro = comercios_comprobar_nombre();
  if (!error_registro){
    console.log("registrando comercio");
    document.getElementById("registro_comercios_cargando").style['display'] = "inherit";
    peticion_http = comercios_inicializa_xhr();
    if (peticion_http) {
      peticion_http.onreadystatechange = comercios_procesaRespuesta;
      peticion_http.open("POST", "../php/registrar_comercio.php", true);
      peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      var query_string = comercios_crea_query_string();
      peticion_http.send(query_string);
    }
  }
}

function comercios_comprobar_nombre(){
  var elem_comercio = document.getElementById("comercio");
  var elem_comercio_validacion = document.getElementById("comercio_validacion_nombre");

  elem_comercio_validacion.style['display'] = "none";

  if (elem_comercio.value == ""){
    elem_comercio_validacion.style['display'] = 'inline';
    elem_comercio_validacion.innerHTML = "El nombre es obligatorio";
    return true;
  }
  return false;
}

function comercios_inicializa_xhr(){
  if(window.XMLHttpRequest) {
    return new XMLHttpRequest();
  }else if(window.ActiveXObject) {
    return new ActiveXObject("Microsoft.XMLHTTP");
  }
}

function comercios_crea_query_string() {
  var comercio = document.getElementById("comercio");
  var cine = document.getElementById("comercios_cine_elegido_registro");

  console.log("comercio: " + comercio.value);
  console.log("cine: " + cine.innerHTML);

  return "nombre=" + encodeURIComponent(comercio.value) +
         "&cine=" + encodeURIComponent(cine.innerHTML) +
         "&nocache=" + Math.random();
}

function comercios_procesaRespuesta() {
  if (peticion_http.readyState == 4) {
    console.log("respuestaaaaa");
    var mensaje = peticion_http.responseText;
    var color = "";

    console.log("Status: " + peticion_http.status);
    console.log("respuesta: " + mensaje);

    //comercio_validacion_registro
    if (peticion_http.status == 200)
      color = "green";
    else
      color = "red";

    document.getElementById("comercio_validacion_registro").innerHTML = mensaje;
    document.getElementById("comercio_validacion_registro").style['color'] = color;
    document.getElementById("comercio_validacion_registro").style['display'] = "inherit";

    document.getElementById("registro_comercios_cargando").style['display'] = "none";
  }
}


/*
PARTE DE LISTADO DE COMERCIOS
*/

function comercios_elegir_cine_lista(cine){
  document.getElementById("comercios_cine_elegido_lista").innerHTML = cine;

  document.getElementById("comercios_lista_comercios").style['display'] = "inherit";
  document.getElementById("comercios_cine_elegido_lista").style['font-weight'] = "bold";

  comercios_listar_comercios(cine);
}

function comercios_listar_comercios(cine){
  console.log("listando comercios");
  peticion_http = comercios_inicializa_xhr();
  if (peticion_http) {
    document.getElementById("listado_comercios_cargando").style['display'] = "inherit";

    peticion_http.onreadystatechange = comercios_lista_procesaRespuesta;

    console.log("cine: " + cine);
    var url = "../php/listar_comercio.php?cine=" + cine;
    console.log("Url: " + url);
    peticion_http.open("GET", url, true);
    peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    peticion_http.send(null);
  }
}

function comercios_lista_procesaRespuesta(){
    if (peticion_http.readyState == 4) {
      console.log("respuestaaa");

      var mensaje = peticion_http.responseText;

      console.log("Status: " + peticion_http.status);
      console.log("respuesta: " + mensaje);

      if (peticion_http.status == 200){
        document.getElementById("comercios_lista_comercios").innerHTML = mensaje;
      }

      document.getElementById("listado_comercios_cargando").style['display'] = "none";
    }
}
