const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const result = mongoose.connect(process.env.MONGO_URL);
        if(result){
            console.log("Connected to MongoDB");
        }
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}
module.exports = connectDB;