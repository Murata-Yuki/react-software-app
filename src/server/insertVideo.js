const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/videoDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

const videoSchema = new mongoose.Schema({
    videoId: Number,
    url: String,
    floor: Number,
});

const Video = mongoose.model('Video', videoSchema);

// 挿入する複数の動画データ
const videos = [
    {
        videoId: 11, 
        url: "../../images/O1/O11.mp4", 
        floor: 1,
    },
    {
        videoId: 12,  
        url: "../../images/O1/O12.mp4", 
        floor: 1,
    },
    {
        videoId: 13,  
        url: "../../images/O1/O13.mp4", 
        floor: 1,
    },
    {
        videoId: 14, 
        url: "../../images/O1/O14.mp4", 
        floor: 1,
    },
    {
        videoId: 15, 
        url: "../../images/O1/O15.mp4", 
        floor: 1,
    },
    {
        videoId: 16, 
        url: "../../images/O1/O16.mp4", 
        floor: 1,
    },
    {
        videoId: 21, 
        url: "../../images/O2/O21.mp4", 
        floor: 2,
    },
    {
        videoId: 2, 
        url: "../../images/O2/O22.mp4", 
        floor: 2,
    },
    {
        videoId: 23, 
        url: "../../images/O2/O23.mp4", 
        floor: 2,
    },
    {
        videoId: 24, 
        url: "../../images/O2/O24.mp4", 
        floor: 2,
    },
    {
        videoId: 25, 
        url: "../../images/O2/O25.mp4", 
        floor: 2,
    },
    {
        videoId: 26, 
        url: "../../images/O2/O26.mp4", 
        floor: 2,
    },
    {
        videoId: 31, 
        url: "../../images/O3/O31.mp4", 
        floor: 3,
    },
    {
        videoId: 32, 
        url: "../../images/O3/O32.mp4", 
        floor: 3,
    },
    {
        videoId: 33, 
        url: "../../images/O3/O33.mp4", 
        floor: 3,
    },
    {
        videoId: 34, 
        url: "../../images/O3/O34.mp4", 
        floor: 3,
    },
    {
        videoId: 35, 
        url: "../../images/O3/O35.mp4", 
        floor: 3,
    },
    {
        videoId: 36,  
        url: "../../images/O3/O36.mp4", 
        floor: 3,
    },
    {
        videoId: 41, 
        url: "../../images/O4/O41.mp4", 
        floor: 4,
    },
    {
        videoId: 42, 
        url: "../../images/O4/O42.mp4", 
        floor: 4,
    },
    {
        videoId: 43, 
        url: "../../images/O4/O43.mp4", 
        floor: 4,
    },
    {
        videoId: 44, 
        url: "../../images/O4/O44.mp4", 
        floor: 4,
    },
    {
        videoId: 45, 
        url: "../../images/O4/O45.mp4", 
        floor: 4,
    },
    {
        videoId: 46, 
        url: "../../images/O4/O46.mp4", 
        floor: 4,
    },
    {
        videoId: 51, 
        url: "../../images/O5/O51.mp4", 
        floor: 5,
    },
    {
        videoId: 52, 
        url: "../../images/O5/O52.mp4", 
        floor: 5,
    },
    {
        videoId: 53, 
        url: "../../images/O5/O53.mp4", 
        floor: 5,
    },
    {
        videoId: 54, 
        url: "../../images/O5/O54.mp4", 
        floor: 5,
    },
    {
        videoId: 55, 
        url: "../../images/O5/O55.mp4", 
        floor: 5,
    },
    {
        videoId: 56, 
        url: "../../images/O5/O56.mp4", 
        floor: 5,
    }
];

// insertManyを使用して一括でデータを挿入
Video.insertMany(videos)
    .then(() => console.log('Data inserted'))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
