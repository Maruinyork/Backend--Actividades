const admin = require("firebase-admin");

const connectFirebase = async () => {
    try {
        const serviceAccount = require("./ecommerce.json");

        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });

    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    connectFirebase
}