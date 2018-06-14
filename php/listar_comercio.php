<?php

function mostrarErrorYSalir($mensajeError){
  http_response_code(503);
  echo $mensajeError;
  exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$database = "daweb_cines";
$port = "3307";

/*
Añadimos @ antes de la función para silenciar el error que viene por defecto,
y así añadir el nuestro
*/
$conn = @mysqli_connect($servername, $username, $password, $database, $port)
    or mostrarErrorYSalir("Error al intentar conectar con la base de datos");

$cine = utf8_decode($_GET['cine']);

$query = "SELECT nombre FROM comercios where cine = '" . $cine . "'";

$resultado = @mysqli_query($conn, $query)
        or mostrarErrorYSalir("Error al realizar la consulta en la base de datos");

http_response_code(200);
if (mysqli_num_rows($resultado) == 0 ){
  echo '<div class="comercios_seccion_cuerpo_comercio">
          No hay comercios disponibles
        </div>';
}else{
  while ($comercio = mysqli_fetch_row($resultado)){
    echo '<div class="comercios_seccion_cuerpo_comercio">
            ' . $comercio[0] . '
          </div>';
  }
}

$conn ->close();

?>
