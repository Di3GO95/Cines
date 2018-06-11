function elegir_cine(nombre){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var text = xhttp.responseText;
      var lineas = text.split("\n");

      if (lineas.length == 5){
        var foto = lineas[0];
        var gps = lineas[1];
        var ubicacion = lineas[2];
        var aforo = lineas[3];

        document.getElementById("section_cine_nombre").innerHTML = nombre;
        document.getElementById("section_cine_foto").src = foto;
        document.getElementById("section_cine_foto").alt = nombre;
        document.getElementById("section_cine_gps").href = gps;
        document.getElementById("section_cine_ubicacion").innerHTML = ubicacion;
        document.getElementById("section_cine_aforo").innerHTML = aforo;

        document.getElementById("section_cine").style["display"] = "inherit";
        document.getElementById("section_cine_informacion").style["display"] = "none";
      }
    }
  };

  xhttp.open("GET", "../js/cines/" + nombre + ".txt", true);
  xhttp.send();

}
