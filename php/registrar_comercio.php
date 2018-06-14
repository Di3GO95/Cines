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

$cine = utf8_decode($_POST['cine']);
$nombre = utf8_decode($_POST['nombre']);

$insert = "INSERT INTO `comercios` (`CINE`, `NOMBRE`)
           VALUES (?, ?)";
$stmt = $conn ->prepare($insert);
$stmt ->bind_param("ss", $cine, $nombre);

if ($stmt ->execute() === TRUE){
  http_response_code(200);
  echo 'Comercio registrado correctamente';
}else {
  http_response_code(500);
  echo 'Error al intentar registrar el comercio';
}

$conn ->close();

?>
