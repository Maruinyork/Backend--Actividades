const admin = require("firebase-admin");

const connectFirebase = async () => {
    try {
        const serviceAccount = require("./ecommerce-92c38-firebase-adminsdk-sovg4-06e238f5ae.json");

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