import data1 from "../data/Data1";
import data2 from "../data/Data2";
import data3 from "../data/Data3";
import data4 from "../data/Data4";
import data5 from "../data/Data5";
import data6 from "../data/Data6";
import data52 from "../data/Data52";

const commonTrajectoryData = [data1, data2, data3, data4, data5, data6];
const commonTrajectoryData2 = [data1, data52, data3, data4, data5, data6];

export default function getTrajectoryForFloor(floor) {
    if (floor === 5) {
        return commonTrajectoryData2;
    } else {
        return commonTrajectoryData;
    }
}
