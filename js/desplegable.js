/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function desplegar() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
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
