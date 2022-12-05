const http = require('http')
const { httpServer } = require('./app')

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


/*
nodemon server --> ejecuta en puerto 8080
nodemon server -p xxxx --> ejecuta en puerto xxxx

Correr servidor modo cluster: 
                    nodemon server.js --cluster
Correr servidor modo fork:
                    nodemon server.js
                    nodemon server.js --fork (se ve localhost:8080)
matar proceso Powershell:
                kill numProceso --> kill 12188
Correr/detener servidor con forever:
                    forever start server.js
                    forever start server.js --fork
                    forever start server.js -p 8081
                    forever stop server.js
                    forever stopall
Listar procesos con forever:
                    forever list
correr/ detener servidor pm2:
                    pm2 start server.js
                    pm2 start server.js --watch
                    pm2 start server.js -p 8081
	
                    pm2 stop server.js
monitor live:
                    pm2 monit
logs:
                    pm2 logs
bajar todos los servicios activos:
                    pm2 delete all 
lista con servicios activos:
                    pm2 list
server en modo Cluster:
                    pm2 start server.js -i max
server en modo cluster escucha activa:
                    pm2 start server.js -i max --watch
*/
