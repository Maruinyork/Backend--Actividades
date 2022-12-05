# Desafío 15
## Consigna
### Servidor con balance de carga

### Resolución

Consigna 1:

Tomando como base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.

(en server.js)
```console

const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs
.default({
    port: 8080,
    mode: 'fork',
})
.argv

const cluster = require('cluster')
const os = require('node:os')
const numCPUs = require('os').cpus().length
 

if (args.mode == 'cluster') {
  if (cluster.isMaster) {
    console.log(`Nodo primario ${process.pid} corriendo`)
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} finalizado`)
    })
  } else { 
      try {
      console.log(`>>>>> 🚀 Servidor corriendo en el puerto ${args.port} PID WORKER ${process.pid}`)
      console.log(`Nodo Worker corriendo en el proceso ${process.pid}`)
      } catch (error) {
      console.log(error)
      }
  }
} else if (args.mode === "fork") {
    
  httpServer.listen(args.port, err => {
    if (err) throw err
    console.log(`>>>>> 🚀 Servidor corriendo en el puerto ${args.port}`)
  })
}

```

- Agregar en la vista info, el número de procesadores presentes en el servidor.

(en carpeta routes/Test.js)
```console

router.get('/info', (req, res) => {
    const processInfo ={
        'Argumentos de entrada' : process.argv.slice(2),
        'Nombre de la plataforma ': process.platform,
        'Versión de node.js': process.versions['node'],
        'Memoria total reservada': process.memoryUsage()['rss'],
        'Path de ejecución': process.argv[1],
        'Process id': process.pid,
        'Carpeta del proyecto': process.cwd(),
        'Número de procesadores': os.cpus().length //consigna 1
    };
    res.status(200).json(processInfo);
})

```
![Image text](https://github.com/Maruinyork/Act15-servidorcarga/blob/main/img/screenshots/nodemonfork.png)


- Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.
NOTA: Para probar cada uno de ellos por terminal, finalizar el proceso del anterior con ctrl+c, de lo contrario no se recargará.

```console

nodemon server.js --cluster

```
![Image text](https://github.com/Maruinyork/Act15-servidorcarga/blob/main/img/screenshots/nodemoncluster.png)
![Image text](https://github.com/Maruinyork/Act15-servidorcarga/blob/main/img/screenshots//procesadores.png)

```console

nodemon server.js --fork

```
![Image text](https://github.com/Maruinyork/Act15-servidorcarga/blob/main/img/screenshots/nodemonfork.png)


- Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.

Comandos utilizados:
```console

forever start server.js
forever start server.js --fork
forever list
forever stopall

```
![Image text](https://github.com/Maruinyork/Act15-servidorcarga/blob/main/img/screenshots/foreverlist.png)

![Image text](https://github.com/Maruinyork/Act15-servidorcarga/blob/main/img/screenshots/foreverstopall.png)


- Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.

![Image text](https://github.com/Maruinyork/Act15-servidorcarga/blob/main/img/screenshots/pm2startserver.png)
![Image text](https://github.com/Maruinyork/Act15-servidorcarga/blob/main/img/screenshots/pm2stopserver.png)

Modo FORK:
```console
pm2 start server.js --name="FORKEn8080" --watch -- 8080

```
![Image text](https://github.com/Maruinyork/Act15-servidorcarga/blob/main/img/screenshots/pm2startfork.png)

Modo CLUSTER:
```console
pm2 start server.js --name="ClusterEn8082" --watch -i 2  -- -p 8082
pm2 list

```
![Image text](https://github.com/Maruinyork/Act15-servidorcarga/blob/main/img/screenshots/pm2list.png)

![Image text](https://github.com/Maruinyork/Act15-servidorcarga/blob/main/img/screenshots/pm2monit.png)

![Image text](https://github.com/Maruinyork/Act15-servidorcarga/blob/main/img/screenshots/pm2startserverwindows.png)

![Image text](https://github.com/Maruinyork/Act15-servidorcarga/blob/main/img/screenshots/pm2stopserver.png)


Consigna 2:

Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:

- Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.
- El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.
- Verificar que todo funcione correctamente.
- Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.


nginx/ngnix.conf modificado 1:
```console

events {
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    upstream node_app {
        server 127.0.0.1:8080;
    }

    upstream node_app2 {
        server 127.0.0.1:8081;
    }

    server {
        listen       80;
        server_name  nginx_node;
        root C:\Users\Usuario\Desktop\Act15. Servidor de Carga\public;

        location /datos/ {
            proxy_pass http://node_app;
        }
        
        location /api/randoms {
            proxy_pass http://node_app2;
        }
    }
}

```
nginx/ngnix.conf modificado 2:
```console
events {
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    upstream node_app {
        server 127.0.0.1:8080;
    }

    upstream node_app2 {
        server 127.0.0.1:8082;
        server 127.0.0.1:8083;
        server 127.0.0.1:8084;
        server 127.0.0.1:8085;
    }

    server {
        listen       80;
        server_name  nginx_node;
        root C:\Users\Usuario\Desktop\Act15. Servidor de Carga\public;

        location /datos/ {
            proxy_pass http://node_app;
        }
        
        location /api/randoms {
            proxy_pass http://node_app2;
        }
    }
}

```

Incluir el archivo de configuración de nginx junto con el proyecto.
Incluir también un pequeño documento en donde se detallen los comandos que deben ejecutarse por línea de comandos y los argumentos que deben enviarse para levantar todas las instancias de servidores de modo que soporten la configuración detallada en los puntos anteriores.


