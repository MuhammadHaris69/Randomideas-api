const mongoose = require('mongoose');

// Set strictQuery mode before connecting
mongoose.set('strictQuery', true);

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;
