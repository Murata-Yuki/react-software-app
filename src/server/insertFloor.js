const mongoose = require('mongoose');

// MongoDBに接続
mongoose.connect('mongodb://localhost:27017/floordb')
    .then(() => console.log('Connected to Floordb'))
    .catch(err => console.log(err));

// Floorのスキーマとモデル
const floorSchema = new mongoose.Schema({
    floorNumber: [Number] // データポイントのリストを含む配列
});

const Floor = mongoose.model('Floor', floorSchema);

// 挿入するデータ
const floorData = [1, 2, 3, 4, 5];

// floorDataを1つの配列として挿入
const floorDocument = {
    floorNumber: floorData // すべてのデータポイントを1つの配列として保存
};

// insertOneを使用してデータを挿入
Floor.create(floorDocument)
    .then(() => console.log('Data inserted'))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
