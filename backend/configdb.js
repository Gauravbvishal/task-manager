    const mongoose = require('mongoose');

    const connectDB = async () => {
      try {
        await mongoose.connect('mongodb+srv://vishalgaurav985_db_user:vishal985@cluster0.b3d76sp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          // Other options if needed, e.g., useCreateIndex: true, useFindAndModify: false
        });
        console.log('MongoDB connected successfully!');
      } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the application on connection failure
      }
    };

    module.exports = connectDB;