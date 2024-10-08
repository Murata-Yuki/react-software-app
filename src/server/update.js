const mongoose = require('mongoose');

// MongoDB に接続
mongoose.connect('mongodb://localhost:27017/floordb')
.then(async () => {
    console.log('Connected to floordb');

    // Floorのスキーマとモデル
    const floorSchema = new mongoose.Schema({
        floorId: Number,
        trajectoryPoints: Array
    });

    const Floor = mongoose.model('Floor', floorSchema);

    // 重複するドキュメントを取得
    const duplicates = await Floor.aggregate([
        {
            $group: {
                _id: { floorId: "$floorId", trajectoryPoints: "$trajectoryPoints" }, // floorId と trajectoryPoints でグループ化
                count: { $sum: 1 }, // 各グループの出現回数を数える
                ids: { $push: "$_id" } // 各グループに属するドキュメントの _id を配列として保存
            }
        },
        {
            $match: { count: { $gt: 1 } } // 出現回数が 1 を超える（重複している）グループを選択
        }
    ]);

    // 重複するドキュメントを削除
    for (const duplicate of duplicates) {
        // 最初の 1 つを残し、他の重複したドキュメントを削除
        const idsToDelete = duplicate.ids.slice(1); // 最初の 1 つ以外を削除
        await Floor.deleteMany({ _id: { $in: idsToDelete } });
        console.log(`Deleted duplicate entries for floorId: ${duplicate._id.floorId}, trajectoryPoints: ${duplicate._id.trajectoryPoints}`);
    }

    console.log('Duplicate floor entries removed successfully');
})
.catch(err => console.error('Error connecting to MongoDB:', err))
.finally(() => mongoose.connection.close());
