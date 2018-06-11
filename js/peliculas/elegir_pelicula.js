function elegir_pelicula(nombre){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var text = xhttp.responseText;
      var lineas = text.split("\n");

      if (lineas.length == 7){
        var sinopsis = lineas[0];
        var titulo_original = lineas[1];
        var anyo = lineas[2];
        var direccion = lineas[3];
        var reparto = lineas[4];
        var genero = lineas[5];

        document.getElementById("titulo").innerHTML = nombre;
        document.getElementById("sinopsis_cuerpo").innerHTML = sinopsis;
        document.getElementById("titulo_original").innerHTML = titulo_original;
        document.getElementById("anyo").innerHTML = anyo;
        document.getElementById("direccion").innerHTML = direccion;
        document.getElementById("reparto").innerHTML = reparto;
        document.getElementById("genero").innerHTML = genero;

        document.getElementById("pelicula_elegida").style["display"] = "inherit";
        document.getElementById("peliculas_informacion").style["display"] = "none";
      }
    }
  };

  xhttp.open("GET", "../js/peliculas/" + nombre + ".txt", true);
  xhttp.send();

}
