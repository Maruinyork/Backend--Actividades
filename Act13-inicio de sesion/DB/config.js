const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const url = process.env.MONGO_URL || 'mongodb+srv://MaruinYork:backend@cluster0.n9vmygq.mongodb.net/?retryWrites=true&w=majority'
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    connectDB
}