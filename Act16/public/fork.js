process.on('message', (message) => {
    const result = randoms(message)
    process.send(result)
})

const randoms = (qty) => {
    const obj = {}

    for (let i = 0; i < qty; i++) {
        let num = Math.floor(Math.random() * 99)
        !obj[num] ? obj[num] = 1 : obj[num]++
    }

    return obj
}