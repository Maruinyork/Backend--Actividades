const admin = require("firebase-admin");

const connectFirebase = async () => {
    try {
        const serviceAccount = {
            "type": "service_account",
            "project_id": "ecommerce-92c38",
            "private_key_id": "06e238f5aeb1fbcdd2c06c6c319db754f5664cb8",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC5DW1uMXK3ecHJ\n0p5f+DjNRG/taTrnpmqxjVfIwe9h1D+JKxdpvzpq4EsZGOBsLR1vX3vgxoD1vkZG\nIYrzb4YS/EN+LgjQCXF357AfbFlApUl4eidw19PXwd8zjnfdY8MLxjKhm9VwJ8AQ\ni2lO5Kyph7KiPN0JyVBJQ8yqoilneCNpOKJmTfomdcABOi0kG2EcdkgRgWm8AH9Z\nINAyMJD4CH/ovXSDBftS6PfbRGOhB2PpzWPrzkL0nn+e2i48pq1rxUVhnZknxjul\nJq5hdQIMlIMEr9ZnVl13p+ITSipz7sQ2Hwk3hDf+tyRkaLGOW3fcSt1HEb6q/Aa0\nXKDt3lU3AgMBAAECggEAWmPgrA6jRlPHANpMWfxZYoqnUYQxLa3wN8IeuwVf9J1E\nW7Acw56Q3luo0x1/odd3pUsyq1zK6T6D/QWtZbN3/hYSsbOywkuajUMymGbIQfd6\np8qjMU97PsyIRhq1GgL85udtG9uOqjYAbxRp4At6+2Q5MV4hagJXoTHo6wBC0TLb\nS0+LONkwvQwE/uizif0IUT+gl4FJeHdWpgj+gzC72+o4FAG9ybGnc07cRnKYPDKZ\nzpPPcGTzY77BZdCg/6NXLeRmT4mdlAVBsT3T3fPfhFMf0L7s9RCVpKl74bX1FF4p\nVQE1SmnMIApwC2XhVEV3V2KMKCpENreLW0CLODO6wQKBgQD32E/VXgr3WVWN+Ks3\nJO+7zrGBqr3qg53GKC94lCRIo5C7vTYVpmTxTOr2dni53qhi6oM/V/tB6cRl55Q9\n5qiK0fj+y5wTPiHnM18w9tDwuFDdyFFfarz+eDRnqXVogWAYKTHSOt8SYqmlGjKu\nK3ktRcWBezaFKJUJXw38L5SJeQKBgQC/JDECcvhvKKMrhDXjAaEF9ArxJPMF+MFJ\nemPa3NixiIcWrmi+Ye1zCEbgoKd2lo6N1LuOZGIGL9hMy9NFdC/KPXOzBpq0aP7X\nm3aluSQ7XBy3Ba35LY93EymlQHS1Edj/pE43T0808vnCi8VgrZXoN9JC64FNp2oT\naiHXLrPYLwKBgALd156KJepSeDDaLXDH1pX/gAIV7Xhm6U4/bL0iSYElkyj4uUVq\n1UQNNbKAEElmD+CFAdubsuZCQ+lB0m8c2doxL4YS6M04LMA10eYJFMWT/Ct0g6xs\n2Z6/2StRxG/e/zOIVnEuCSJ3TasBMJDfI9moMu6adDj6DS88kDbYfglRAoGBAIqR\nWzJSVQaI6FnI3CP471pYhIIzbjc7Ei0JnFBzYGi7+GsZ/3ddmP2W14NLFHxlQ21Q\n9rOQ1Ht1vhJWhZBJXcf46uKze/4kS/PUkZws7zZVXb/VTz1gqSwC6WMSqkkGalFS\nNR3l0h8psqU2HN4smYuixDydbLz2DHGMtIHCKsEjAoGBAJfuVMzQOmQVPr9eYFrC\n4+EBythezpnPUEtEmqw8jYyjPg2IFZi1ZzCIP8ivQ8Gpbqb0Sg0+fAX0EBR3EZtj\n8ym3ZOopxR4cRH0AFfYfkprm51dJUYrj7xi445ziNWf8PPMoVCwMkT7TDCbt/nJR\nDwmDfMU3UCLC8/5x6qFUYUR7\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-sovg4@ecommerce-92c38.iam.gserviceaccount.com",
            "client_id": "117745404518154999243",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-sovg4%40ecommerce-92c38.iam.gserviceaccount.com"
          }

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