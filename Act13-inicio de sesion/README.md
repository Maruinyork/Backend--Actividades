# Desafío 13
## Inicio de sesión

### Consigna
Implementar sobre el entregable que venimos realizando un mecanismo de autenticación. Para ello:Se incluirá una vista de registro, en donde se pidan email y contraseña. Estos datos se persistirán usando MongoDb, en una (nueva) colección de usuarios, cuidando que la contraseña quede encriptada (sugerencia: usar la librería bcrypt).Una vista de login, donde se pida email y contraseña, y que realice la autenticación del lado del servidor a través de una estrategia de passport local.Cada una de las vistas (logueo - registro) deberá tener un botón para ser redirigido a la otra.

### Detalles del entregable: 
Una vez logueado el usuario, se lo redirigirá al inicio, el cual ahora mostrará también su email, y un botón para desolguearse.Además, se activará un espacio de sesión controlado por la sesión de passport. Esta estará activa por 10 minutos y en cada acceso se recargará este tiempo.Agregar también vistas de error para login (credenciales no válidas) y registro (usuario ya registrado).El resto de la funciones, deben quedar tal cual estaban el proyecto original.

![Image text](https://github.com/Maruinyork/Backend--Actividades/blob/main/Act13-inicio%20de%20sesion/img/screenshots/1.png)
![Image text](https://github.com/Maruinyork/Backend--Actividades/blob/main/Act13-inicio%20de%20sesion/img/screenshots/2.png)
![Image text](https://github.com/Maruinyork/Backend--Actividades/blob/main/Act13-inicio%20de%20sesion/img/screenshots/3.png)
![Image text](https://github.com/Maruinyork/Backend--Actividades/blob/main/Act13-inicio%20de%20sesion/img/screenshots/4.png)
![Image text](https://github.com/Maruinyork/Backend--Actividades/blob/main/Act13-inicio%20de%20sesion/img/screenshots/5.png)
![Image text](https://github.com/Maruinyork/Backend--Actividades/blob/main/Act13-inicio%20de%20sesion/img/screenshots/6.png)
![Image text](https://github.com/Maruinyork/Backend--Actividades/blob/main/Act13-inicio%20de%20sesion/img/screenshots/7.png)
![Image text](https://github.com/Maruinyork/Backend--Actividades/blob/main/Act13-inicio%20de%20sesion/img/screenshots/8.png)
![Image text](https://github.com/Maruinyork/Backend--Actividades/blob/main/Act13-inicio%20de%20sesion/img/screenshots/9.png)
![Image text](https://github.com/Maruinyork/Backend--Actividades/blob/main/Act13-inicio%20de%20sesion/img/screenshots/10.png)










