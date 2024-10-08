const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/floorImageDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

const floorImageSchema = new mongoose.Schema({
    floorImageId: Number,
    url: String,
});
    
const FloorImage = mongoose.model('FloorImage', floorImageSchema);

const images = [
    {
        floorImageId: 1, 
        url: "../../images/O1/O1.jpg", 
    },
    {
        floorImageId: 2,  
        url: "../../images/O2/O2.jpg", 
    },
    {
        floorImageId: 3,  
        url: "../../images/O3/O3.jpg", 
    },
    {
        floorImageId: 4, 
        url: "../../images/O4/O4.jpg", 
    },
    {
        floorImageId: 5, 
        url: "../../images/O5/O5.jpg", 
    }
]

// insertManyを使用して一括でデータを挿入
FloorImage.insertMany(images)
    .then(() => console.log('Data inserted'))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());