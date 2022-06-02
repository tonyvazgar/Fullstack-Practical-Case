const mongoose = require("mongoose");
const NODE_ENV = process.env.NODE_ENV;
const dbConnect = () => {
    const DB_URI = (NODE_ENV === 'test') ? process.env.DB_URI_TEST : process.env.DB_URI;
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, resp) => {
        if (!err) {
            console.log("** Conexión correcta **")
        } else {

        }
    }
    );
};

module.exports = dbConnect;