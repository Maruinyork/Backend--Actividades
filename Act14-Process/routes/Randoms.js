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

module.exports = router;