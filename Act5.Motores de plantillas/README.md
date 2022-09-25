Incorporando Handlebars

>> Consigna:  
Utilizando la misma API de productos del proyecto entregable de la clase anterior, construir un web server (no REST) que incorpore:
Un formulario de carga de productos en la ruta raíz (configurar la ruta '/productos' para recibir el POST, y redirigir al mismo formulario).
Una vista de los productos cargados (utilizando plantillas de handlebars) en la ruta GET '/productos'.
Ambas páginas contarán con un botón que redirija a la otra.

>> Consigna:  
Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por pug.
Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por ejs.
Por escrito, indicar cuál de los tres motores de plantillas prefieres para tu proyecto y por qué.

>> Aspectos a incluir en el entregable:
Realizar las plantillas correspondientes que permitan recorrer el array de productos y representarlo en forma de tabla dinámica, siendo sus cabeceras el nombre de producto, el precio y su foto (la foto se mostrará como un imágen en la tabla)
En el caso de no encontrarse datos, mostrar el mensaje: 'No hay productos'.

>> Opcional:
Utilizar bootstrap para maquetar la vista creada por dicho motor de plantillas y el formulario de ingreso de productos.

HBS

<a href='https://postimg.cc/1n3tQqv9' target='_blank'><img src='https://i.postimg.cc/1n3tQqv9/hbs1.png' border='0' alt='hbs1'/></a>

[![hbs2.png](https://i.postimg.cc/Y9wv24V2/hbs2.png)](https://postimg.cc/3yn8nwYz)

[![hbs3.png](https://i.postimg.cc/Nf050vNX/hbs3.png)](https://postimg.cc/8sq1y9gk)

[![hbs4.png](https://i.postimg.cc/CKbK2hK3/hbs4.png)](https://postimg.cc/SXNq2pCd)


EJS

[![ejs1.png](https://i.postimg.cc/sgWRz0JC/ejs1.png)](https://postimg.cc/ts9ctkfB)

[![ejs2.png](https://i.postimg.cc/2yXF0Gq0/ejs2.png)](https://postimg.cc/9wZ7MGY9)


PUG

[![pug1.png](https://i.postimg.cc/rmCL1zpp/pug1.png)](https://postimg.cc/1ntTPmwx)

[![pug2.png](https://i.postimg.cc/zD7r3LMt/pug2.png)](https://postimg.cc/XXrhzvnd)






