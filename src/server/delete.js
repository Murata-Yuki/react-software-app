const mongoose = require('mongoose');

// MongoDB に接続
mongoose.connect('mongodb://localhost:27017/floorImageDB')
    .then(async () => {
        console.log('Connected to MongoDB');
        try {
            await mongoose.connection.dropDatabase();
            console.log('Database floordb has been deleted.');
        } catch (err) {
            console.error('Error dropping the database:', err);
        }
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    })
    .finally(() => {
        mongoose.connection.close()
            .then(() => console.log('MongoDB connection closed.'))
            .catch(err => console.error('Error closing MongoDB connection:', err));
    });
