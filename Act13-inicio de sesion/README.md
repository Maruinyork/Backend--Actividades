# Desafío 13
## Inicio de sesión

### Consigna
Implementar sobre el entregable que venimos realizando un mecanismo de autenticación. Para ello:Se incluirá una vista de registro, en donde se pidan email y contraseña. Estos datos se persistirán usando MongoDb, en una (nueva) colección de usuarios, cuidando que la contraseña quede encriptada (sugerencia: usar la librería bcrypt).Una vista de login, donde se pida email y contraseña, y que realice la autenticación del lado del servidor a través de una estrategia de passport local.Cada una de las vistas (logueo - registro) deberá tener un botón para ser redirigido a la otra.

### Detalles del entregable: 
Una vez logueado el usuario, se lo redirigirá al inicio, el cual ahora mostrará también su email, y un botón para desolguearse.Además, se activará un espacio de sesión controlado por la sesión de passport. Esta estará activa por 10 minutos y en cada acceso se recargará este tiempo.Agregar también vistas de error para login (credenciales no válidas) y registro (usuario ya registrado).El resto de la funciones, deben quedar tal cual estaban el proyecto original.


[![1.jpg](https://i.postimg.cc/4NTssvTN/1.jpg)](https://postimg.cc/mhV0SHD0)

[![2.jpg](https://i.postimg.cc/bvMfMkTP/2.jpg)](https://postimg.cc/bGQ5SGWV)

[![3.png](https://i.postimg.cc/DZX3K0jX/3.png)](https://postimg.cc/KkxHPGyG)

[![4.png](https://i.postimg.cc/G36J22Mp/4.png)](https://postimg.cc/jCQJ3sYV)

[![5.png](https://i.postimg.cc/3rffZYtM/5.png)](https://postimg.cc/7b7NH8vX)

[![6.png](https://i.postimg.cc/VLq8ZJpr/6.png)](https://postimg.cc/1f32f39s)

[![7.png](https://i.postimg.cc/nLHcG4Lh/7.png)](https://postimg.cc/hX5BS7xk)

[![8.png](https://i.postimg.cc/d13C4P03/8.png)](https://postimg.cc/XGMXYPd6)

[![9.png](https://i.postimg.cc/63MkxRwz/9.png)](https://postimg.cc/sQZ6pMMZ)

[![10.png](https://i.postimg.cc/SxV3MCY4/10.png)](https://postimg.cc/v4g0R1v2)






