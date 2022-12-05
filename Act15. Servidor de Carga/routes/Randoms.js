const express = require('express')
const { fork } = require('child_process')
const router = express.Router()


router.get('/randoms', (req, res) => {
    
    const cant = req.query.cant || 1000; //según la consigna si no se pasa un parametro calculara 100millones de veces, como es una locura infinita coloque solo 1000
    
    const randomNumbersGeneratorFork = fork('public/fork.js',[cant])

    randomNumbersGeneratorFork.on('message', (resultado) => {
        res.status(200).json(resultado);
    })
    randomNumbersGeneratorFork.send(cant);
    
})

router.get('/datos', (req, res)=>{
    res.send(`Servidor express - PID: ${process.pid} - FyH: ${new Date().toLocaleString()}`)
})

module.exports = router;

//Usuario@Summer2 MINGW64 ~/Desktop/Act15. Servidor de Carga
//$ pm2 start server.js --name="Server_cluster" --watch -i max -- 8081
//[PM2] Starting C:\Users\Usuario\Desktop\Act15. Servidor de Carga\server.js in cluster_mode (0 instance)[PM2] Done.

//Usuario@Summer2 MINGW64 ~/Desktop/Act15. Servidor de Carga
//$ pm2 start server.js --name="Server_fork" --watch -- 8080
//[PM2] Starting C:\Users\Usuario\Desktop\Act15. Servidor de Carga\server.js in fork_mode (1 instance) 
//[PM2] Done.