function elegir_promocion(nombre){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var text = xhttp.responseText;

      document.getElementById("promocion_elegida_nombre").innerHTML = nombre;
      document.getElementById("promocion_elegida_info").innerHTML = text;

      document.getElementById("promocion_elegida").style["display"] = "inherit";
      document.getElementById("promocion_informacion").style["display"] = "none";
    }
  };

  xhttp.open("GET", "../js/promociones/" + nombre + ".txt", true);
  xhttp.send();

}
