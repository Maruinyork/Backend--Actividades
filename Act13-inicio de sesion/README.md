# Desafío 13
## Inicio de sesión

### Consigna
Implementar sobre el entregable que venimos realizando un mecanismo de autenticación. Para ello:Se incluirá una vista de registro, en donde se pidan email y contraseña. Estos datos se persistirán usando MongoDb, en una (nueva) colección de usuarios, cuidando que la contraseña quede encriptada (sugerencia: usar la librería bcrypt).Una vista de login, donde se pida email y contraseña, y que realice la autenticación del lado del servidor a través de una estrategia de passport local.Cada una de las vistas (logueo - registro) deberá tener un botón para ser redirigido a la otra.

### Detalles del entregable: 
Una vez logueado el usuario, se lo redirigirá al inicio, el cual ahora mostrará también su email, y un botón para desolguearse.Además, se activará un espacio de sesión controlado por la sesión de passport. Esta estará activa por 10 minutos y en cada acceso se recargará este tiempo.Agregar también vistas de error para login (credenciales no válidas) y registro (usuario ya registrado).El resto de la funciones, deben quedar tal cual estaban el proyecto original.

![Image text](https://github.com/Maruinyork/geek-ecommerce/blob/main/img/screenshots/home.png)
![Image text](https://github.com/Maruinyork/geek-ecommerce/blob/main/img/screenshots/productos.jpg)
![Image text](https://github.com/Maruinyork/geek-ecommerce/blob/main/img/screenshots/ps5.jpg)
![Image text](https://github.com/Maruinyork/geek-ecommerce/blob/main/img/screenshots/jurassic.jpg)
![Image text](https://github.com/Maruinyork/geek-ecommerce/blob/main/img/screenshots/fifa.jpg)
![Image text](https://github.com/Maruinyork/geek-ecommerce/blob/main/img/screenshots/banner.jpg)
![Image text](https://github.com/Maruinyork/geek-ecommerce/blob/main/img/screenshots/login.jpg)
![Image text](https://github.com/Maruinyork/geek-ecommerce/blob/main/img/screenshots/agregar.jpg)
![Image text](https://github.com/Maruinyork/geek-ecommerce/blob/main/img/screenshots/editar.jpg)
![Image text](https://github.com/Maruinyork/geek-ecommerce/blob/main/img/screenshots/registro-completo.jpg)










