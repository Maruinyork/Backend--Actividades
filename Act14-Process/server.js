const { httpServer } = require('./app')

//Uso de libreria yargs//
const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs
.default({
    port: 8080
})
.argv


httpServer.listen(args.port, err => {
    if (err) throw err
    console.log(`>>>>> 🚀 Server started at port ${args.port}`)
})