import React, { useState, useEffect } from 'react';
import trajectory1 from "../../trajectry/keyframe1-1.txt";
import trajectory2 from "../../trajectry/keyframe1-2.txt";
import trajectory3 from "../../trajectry/keyframe1-3.txt";
import trajectory4 from "../../trajectry/keyframe1-4.txt";
import trajectory5 from "../../trajectry/keyframe1-5.txt";
import trajectory6 from "../../trajectry/keyframe1-6.txt";

export default function TrajectoryOutput() {
    const [column4Data, setColumn4Data] = useState([]);

    useEffect(() => {
        const fetchFileData = async () => {
            try {
                // テキストファイルのパスを指定
                const filePaths = [trajectory1, trajectory2, trajectory3, trajectory4, trajectory5, trajectory6];
                const allColumn4Data = [];

                // 各ファイルから4列目のデータを取得
                for (const path of filePaths) {
                    const response = await fetch(path);
                    const text = await response.text();
                    const lines = text.split('\n');

                    // 各行から4列目のデータを取得
                    const column4 = lines.map(line => {
                        const columns = line.trim().split(' ');
                        return parseFloat(columns[2]) || null; // 4列目のデータを取得（存在しない場合はnull）
                    });

                    allColumn4Data.push(column4);
                }

                setColumn4Data(allColumn4Data);
                // console.log(allColumn4Data);
            } catch (error) {
                console.error('Error fetching the file:', error);
            }
        };

        fetchFileData();
    }, []);

    return column4Data;
}
