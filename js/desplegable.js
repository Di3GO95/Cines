/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
/*
Cuando el usuario pincha en el boton, esconde/muestra
el dropdown
*/
function desplegar() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Cierra el dropdown si el usuario pincha fuera de él
window.onclick = function(event) {
  var despl = (document.getElementById('desplegable'))

  if (despl != null && !despl.contains(event.target)){
    var dropdowns = document.getElementsByClassName("desplegable-contenido");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
