
const randoms = (qty) => {
    const obj = {}

    for (let i = 0; i < qty; i++) {
        let num = Math.floor(Math.random() * (1000-1+1)+1) //devuelve un numero aleatorio entero entre 1 y 1000
        !obj[num] ? obj[num] = 1 : obj[num]++
    }
    return obj
}


  process.on('exit', () => {
    console.log(`worker #${process.pid} | randoms cerrado`)
  })
  
  process.on('message', msg => {
    console.log(`worker #${process.pid} | randoms iniciando la tarea`)
    if (!isNaN(msg)) {
      const numbers = randoms(msg)
      process.send(numbers)
      console.log(`worker #${process.pid} | randoms finalizó la tarea`)
      process.exit()
    }
  })

