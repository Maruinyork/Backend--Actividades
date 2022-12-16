const express = require('express')
// const { fork } = require('child_process')
const router = express.Router()


router.get('/randoms/', (req, res) => {
    const qty = req.query.cant || 100000000

    // const forked = fork('public/fork.js')
    // forked.send(qty)

    // forked.on('message', (message) => {
    //     res.json(message)
    // })

    const obj = {}
    
    for (let i = 0; i < qty; i++) {
        let num = Math.floor(Math.random() * 99)
        !obj[num] ? obj[num] = 1 : obj[num]++
    }
    
    res.json(obj)
})


module.exports = router;


//artillery quick --count 50 -n 20 http://localhost:8080/api/randoms?cant=999999999999999999999999999999 > artillery/result_fork.txt
//artillery quick --count 50 -n 20 http://localhost:8080/api/randoms?cant=999999999999999999999999999999 > artillery/result_cluster.txt

