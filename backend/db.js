const mongoose = require("mongoose");

const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGOOSE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("Connect to MongoDB successfully on host: ", conn.connection.host);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectMongoDB;