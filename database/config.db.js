const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);

    console.log('connection with the database successful');
  } catch (error) {
    throw new Error('Failed to start the database ', error);
  }
};

module.exports = {
  dbConnection,
};
