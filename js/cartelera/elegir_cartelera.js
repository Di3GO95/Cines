function elegir_cartelera(nombre){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var text = xhttp.responseText;

      var lineas = text.split("\n");

      if (lineas.length == 7){
        var titulo1 = lineas[0];
        var imagen1 = lineas[1];
        var titulo2 = lineas[2];
        var imagen2 = lineas[3];
        var titulo3 = lineas[4];
        var imagen3 = lineas[5];

        document.getElementById("section_cine_nombre").innerHTML = nombre;
        document.getElementById("titulo1").innerHTML = titulo1;
        document.getElementById("imagen1").src = imagen1;
        document.getElementById("titulo1").alt = titulo1;
        document.getElementById("titulo2").innerHTML = titulo2;
        document.getElementById("imagen2").src = imagen2;
        document.getElementById("titulo1").alt = titulo2;
        document.getElementById("titulo3").innerHTML = titulo3;
        document.getElementById("imagen3").src = imagen3;
        document.getElementById("titulo1").alt = titulo3;

        document.getElementById("section_cartelera").style["display"] = "inherit";
        document.getElementById("cartelera_informacion").style["display"] = "none";
      }
    }
  };

  xhttp.open("GET", "../js/cartelera/" + nombre + ".txt", true);
  xhttp.send();

}
