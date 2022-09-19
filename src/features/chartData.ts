import { filterByMac1 } from "./filter";
import { getColors } from "./colors";
import {findTimeFrame} from './timeRange'
//  backgroundcolor:any
const createChartData = async (someData: any) => {
  const dataSetList = await filterByMac1(someData);
  // const labelsList= await findTimeFrame(someData)
  // console.log(labelsList)
  console.log(dataSetList)
  const backGroundColor = await getColors(dataSetList);
  const data = {
    labels:someData.map((data: any) => data["date"]["seconds"]),
    datasets: dataSetList.map((mac1: any) => {
      return {
        label: mac1.mac1Value,
        data:  mac1.objArray.map((data: any) => data["rssi_0"]),
        borderColor: backGroundColor.map((color: any) => color),
        backgroundColor: backGroundColor.map((color: any) => color),
      };
    }),

    // {
    //   label: "negative rssi_0",
    //   data: someData.map((data: any) => data["rssi_0"] * -1),
    //   backgroundColor: ["green", "blue"],
    // },
    // {
    //   label: "negative rssi_1",
    //   data: someData.map((data: any) => data["rssi_1"] * -1),
    //   backgroundColor: ["yellow", "red"],
    // },
  };

  return data;
};


export default createChartData;
