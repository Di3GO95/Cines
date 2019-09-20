# IMPORTANTE

Este proyecto ha sido realizado como práctica de la asignatura "Desarrollo de Aplicaciones WEB" de la Facultad de Informática de la Universidad de Murcia.

## CINES DAWEB

Página web de una empresa de cines donde se anuncia la programación de películas en
proyección.

### Breve descripcion

Los contenidos combinan información estática (descrita en los mismos recursos HTML) con información de base de datos (MySQL), así como javascript, JQuery, Ajax,Node.js y PHP.

### Contenido

Las secciones de la página web son: “Cines”, “Películas”, “Cartelera”, “Promociones” y “Tarjeta Fidelidad”.

#### Cines

Muestra los cines de la empresa con sus datos (aforo, ubicación,
fotografía, otras características).

#### Películas

Muestra las películas actualmente en cartelera con sus datos (título,
director, actores, género, duración, cartel, etc.).

#### Cartelera

Muestra la programación de la cartelera semanal. Para cada cine se
mostrarán sus películas, indicando los pases (horarios) diarios. 

#### Promociones

Muestra promociones activas para los cines. Por ejemplo: “descuento del
25% los martes y jueves” o “menú de palomitas a mitad de precio por la
compra de 4 entradas”.

#### Tarjeta de Fidelidad

Muestra la información relativa a la tarjeta de fidelidad de la empresa. Informa sobre cómo se acumulan los puntos de fidelidad y cómo se canjean por
servicios del cine: refrescos, palomitas, descuentos en entradas o entradas
gratuitas.

### Funcionamiento

#### Parte 1

La página usa las tecnologías para el diseño de páginas web usando HTML y CSS.

#### Parte 2

Haciendo uso de JavaScript, se implementan funciones de validación de datos y en general, respuestas de la interfaz de web ante las iteraciones del usuario final (por ejemplo, click en botones o casillas de marcado que muestran / ocultan capas de la interfaz).

#### Parte 3

Haciendo uso de llamadas Ajax y Node.js se implementa una funcionalidad para registrar usuarios y sus tarjetas de fidelidad, permitiendo hacer también un
login de usuario. Para el almacenamiento de datos se usa MySQL.

#### Parte 4

Haciendo uso de PHP se implementa una funcionalidad para registrar y listar
comercios situados en las proximidades de cada cine. Los datos serán
almacenados en MySQL. El sistema permite realizar una búsqueda de
dichos comercios.

#### Nota

Solo los datos de las parte 3 y 4 (usuario, tarjetas y comercios) son
persistidos en la base de datos MySQL. El resto son contenidos estáticos
incluidos en los HTML.

### Resumen de tecnologías

Persistencia

* [MySQL](https://www.oracle.com/es/mysql/) - Base de datos para la persistencia de usuarios, tarjetas y comercios

Sistema

* [Node.js](https://nodejs.org/) - Registro de usuarios y tarjetas de fidelidad, y login
* [PHP](https://www.php.net/) - Registrar y listar comercios

Interfaz

* [HTML5](https://es.wikipedia.org/wiki/HTML) - Interfaz en HTML
* [CSS3](https://www.w3schools.com/css/) - Interfaz decorada con CSS
* [JavaScript](https://www.javascript.com/) - Interacciones con el usuario y validación de datos

## Autor ✒️

* **Diego Valera** - *Desarrollo completo de la página WEB* - [Di3GO95](https://github.com/Di3GO95/)

## Licencia 📄

Este proyecto está bajo la licencia MIT - mira el archivo [LICENSE.md](LICENSE.md) para detalles.
