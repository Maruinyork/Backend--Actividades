# Desafío 16
## Consigna
### Loggers, Gzip y análisis de performance

#### Usuario: Maruinyork 
     Contraseña: admin


>>Consigna:

Incorporar al proyecto de servidor de trabajo la compresión gzip.Verificar sobre la ruta /info con y sin compresión, la diferencia de cantidad de bytes devueltos en un caso y otro.

Luego implementar loggueo (con alguna librería vista en clase) que registre lo siguiente:
● Ruta y método de todas las peticiones recibidas por el servidor (info)
● Ruta y método de las peticiones a rutas inexistentes en el servidor (warning)
● Errores lanzados por las apis de mensajes y productos, únicamente (error)

Considerar el siguiente criterio:
● Loggear todos los niveles a consola (info, warning y error)
● Registrar sólo los logs de warning a un archivo llamada warn.log
● Enviar sólo los logs de error a un archivo llamada error.log



### Resolución
### Compresión con gzip
Use “http://localhost:8080/api/randoms” para realizar la comparación.
Para la primera imagen no se aplicó compresión, se puede apreciar una diferencia de
tamaño y tiempo de respuesta entre ambas solicitudes

![Image text](https://github.com/Maruinyork/Backend--Actividades/blob/main/Act16/img/sincompresion.png)

![Image text](https://github.com/Maruinyork/Backend--Actividades/blob/main/Act16/img/concompresion.png)


### Con libreria Winston
```console

const winston = require('winston')

const logger = winston.createLogger({
    transports : [
        new winston.transports.Console({ level:'verbose' }),
        new winston.transports.File({ filename: './logs/info.log', level:'info' }),
        new winston.transports.File({ filename: './logs/warn.log', level:'warn' }),
        new winston.transports.File({ filename: './logs/error.log', level:'error' }),
    ]
})

function getDate() {
    const d = new Date()
    const date = `[${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}]`
    return date
}

module.exports = {
    logger,
    getDate}

```

![Image text](https://github.com/Maruinyork/Backend--Actividades/blob/main/Act16/img/logs.png)


![Image text](https://github.com/Maruinyork/Backend--Actividades/blob/main/Act16/img/warninfo.png)


>>Consigna:
Luego, realizar el análisis completo de performance del servidor con el que venimos trabajando.Vamos a trabajar sobre la ruta '/info', en modo fork, agregando ó extrayendo un console.log de la información colectada antes de devolverla al cliente. 
Además desactivaremos el child_process de la ruta '/randoms'
Para ambas condiciones (con o sin console.log) en la ruta '/info' OBTENER:
1) El perfilamiento del servidor, realizando el test con --prof de node.js. Analizar los resultados obtenidos luego de procesarlos con --prof-process. 
Utilizaremos como test de carga Artillery en línea de comandos, emulando 50 conexiones concurrentes con 20 request por cada una. Extraer un reporte con los resultados en archivo de texto.

![Image text](https://github.com/Maruinyork/Backend--Actividades/blob/main/Act16/img/nodeprof.png)


### Con ruta api/info
```console

artillery quick --count 50 -n 20 http://localhost:8080/api/info > profiling/result_nolog.txt

node --prof-process profiling/nolog-v8.log > profiling/result_nolog.txt

```

![Image text](https://github.com/Maruinyork/Backend--Actividades/blob/main/Act16/img/lognolog.png)


### Con ruta api/randoms
```console

artillery quick --count 50 -n 20 http://localhost:8080/api/randoms?cant=999999999999999999999999999999 > artillery/result_fork.txt

artillery quick --count 50 -n 20 http://localhost:8080/api/randoms?cant=999999999999999999999999999999 > artillery/result_cluster.txt

```

![Image text](https://github.com/Maruinyork/Backend--Actividades/blob/main/Act16/img/fork&cluster.png)

A la derecha tenemos los resultados del servidor en modo Cluster, y a la izquierda en modo
Fork. Los tiempos de respuesta del primero son en general más bajos que los del segundo,
por lo que es posible concluir que el modo Cluster es el más eficiente de ambos.



>>Consigna:

Luego utilizaremos Autocannon en línea de comandos, emulando 100 conexiones concurrentes realizadas en un tiempo de 20 segundos. 

2) El perfilamiento del servidor con el modo inspector de node.js --inspect. Revisar el tiempo de los procesos menos performantes sobre el archivo fuente de inspección. 

3) El diagrama de flama con 0x, emulando la carga con Autocannon con los mismos parámetros anteriores.


```console

const autocannon = require('autocannon')
const { PassThrough } = require('stream')

const run = (url) => {
    const buf = []
    const outputStream = new PassThrough()

    const inst = autocannon({
        url,
        connections: 100, 
        duration: 20, 
    })

    autocannon.track(inst, { outputStream })

    outputStream.on('data', (data) => {
        buf.push(data)
    })

    inst.on('done', () => {
        process.stdout.write(Buffer.concat(buf))
    })
}

run('http://localhost:8080/info')
run('http://localhost:8080/infolog')

```


![Image text](https://github.com/Maruinyork/Backend--Actividades/blob/main/Act16/img/inspect.png)

![Image text](https://github.com/Maruinyork/Backend--Actividades/blob/main/Act16/img/nodeinspect.png)

Utilizando el inspector y las devtools de node en chrome, podemos observar que la ruta /info utilizando console.log demoró más tiempo en completarse que el proceso que utilizó la compresión.

### 0x
```console
$ npm start

> start
> 0x server.js

Profiling{"level":"info","message":">>>>> 🚀 Servidor corriendo en puerto 8080, mode: FORK"}
{"level":"info","message":"[16/11/2022 10:30:30] GET /"}
{"level":"warn","message":"Ruta / con método GET no implementada"}
{"level":"info","message":"[16/11/2022 10:30:30] GET /favicon.ico"}
{"level":"warn","message":"Ruta /favicon.ico con método GET no implementada"}
{"level":"info","message":"[16/11/2022 10:30:39] 🟢 Usuario conectado"}
{"level":"info","message":"[16/11/2022 10:30:45] 🔴 Usuario desconectado"}
{"level":"info","message":"[16/11/2022 10:30:46] GET /api/"}
{"level":"info","message":"[16/11/2022 10:30:46] 🟢 Usuario conectado"}
{"level":"info","message":"[16/11/2022 10:31:9] GET /api/info"}
{"level":"info","message":"[16/11/2022 10:31:10] 🔴 Usuario desconectado"}

```

```console
$ npm test

> test
> node ./autocannon/benchmark.js

Running 20s test @ http://localhost:8080/info
100 connections


┌─────────┬─────────┬─────────┬─────────┬─────────┬────────────┬───────────┬─────────┐
│ Stat    │ 2.5%    │ 50%     │ 97.5%   │ 99%     │ Avg        │ Stdev     │ Max     │
├─────────┼─────────┼─────────┼─────────┼─────────┼────────────┼───────────┼─────────┤
│ Latency │ 1092 ms │ 1928 ms │ 2574 ms │ 2973 ms │ 1804.65 ms │ 408.18 ms │ 3687 ms │
└─────────┴─────────┴─────────┴─────────┴─────────┴────────────┴───────────┴─────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬───────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg   │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼───────┼─────────┼─────────┤
│ Req/Sec   │ 17      │ 17      │ 46      │ 88      │ 52.6  │ 21.45   │ 17      │
├───────────┼─────────┼─────────┼─────────┼─────────┼───────┼─────────┼─────────┤
│ Bytes/Sec │ 8.42 kB │ 8.42 kB │ 22.8 kB │ 43.6 kB │ 26 kB │ 10.6 kB │ 8.42 kB │
└───────────┴─────────┴─────────┴─────────┴─────────┴───────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.
# of samples: 20

0 2xx responses, 1052 non 2xx responses
1k requests in 20.16s, 520 kB read
Running 20s test @ http://localhost:8080/infolog
100 connections


┌─────────┬─────────┬─────────┬─────────┬─────────┬────────────┬───────────┬─────────┐
│ Stat    │ 2.5%    │ 50%     │ 97.5%   │ 99%     │ Avg        │ Stdev     │ Max     │
├─────────┼─────────┼─────────┼─────────┼─────────┼────────────┼───────────┼─────────┤
│ Latency │ 1119 ms │ 1933 ms │ 3278 ms │ 3381 ms │ 1913.32 ms │ 482.39 ms │ 3589 ms │
└─────────┴─────────┴─────────┴─────────┴─────────┴────────────┴───────────┴─────────┘
┌───────────┬─────┬──────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%  │ 2.5% │ 50%     │ 97.5%   │ Avg     │ Stdev  
 │ Min     │
├───────────┼─────┼──────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 0   │ 0    │ 49      │ 85      │ 49.3    │ 24.92  
 │ 22      │
├───────────┼─────┼──────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 0 B │ 0 B  │ 24.4 kB │ 42.3 kB │ 24.5 kB │ 12.4 kB
 │ 10.9 kB │
└───────────┴─────┴──────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.
# of samples: 20

0 2xx responses, 986 non 2xx responses
1k requests in 20.17s, 491 kB read

```