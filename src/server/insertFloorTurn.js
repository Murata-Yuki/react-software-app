const mongoose = require('mongoose');

// 配列データを保存するためのスキーマとモデル
const trajectorySchema = new mongoose.Schema({
    trajectoryData: Array
});

const Trajectory = mongoose.model('Trajectory', trajectorySchema);

// MongoDBに接続（別のデータベース "trajectoryDB"）
mongoose.connect('mongodb://localhost:27017/trajectoryDB')
    .then(async () => {
        console.log('Connected to MongoDB trajectoryDB');

        // 保存する配列データ
        const trajectories = [
            [2, 1, 1, 1],
            [1, 3, 5, 2],
            [4, 3, 3, 3],
            [3, 4, 1, 5],
            [6, 5, 5, 5],
            [5, 1, 6, 3]
        ];

        try {
            // 配列データを保存
            const trajectoryDocument = new Trajectory({ trajectoryData: trajectories });
            await trajectoryDocument.save();

            console.log('Trajectory data saved successfully.');
        } catch (error) {
            console.error('Error saving trajectory data:', error);
        }
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    })
    .finally(() => {
        // 接続を閉じる
        mongoose.connection.close()
            .then(() => console.log('MongoDB connection closed.'))
            .catch(err => console.error('Error closing MongoDB connection:', err));
    });
