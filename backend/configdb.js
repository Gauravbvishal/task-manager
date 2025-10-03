    const mongoose = require('mongoose');

    const connectDB = async () => {
      try {
        await mongoose.connect('database connection URL', {
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