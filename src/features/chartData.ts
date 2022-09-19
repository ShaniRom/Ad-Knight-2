import { filterByMac1 } from "./filter";
import { getColors } from "./colors";
import {findTimeFrame} from './timeRange';



const createChartData =  (someData : any,rssi:string) => {

  
  const dataSetList =  filterByMac1(someData);
  const labelsList=  findTimeFrame(someData);
  const backGroundColor = getColors(dataSetList);


  const label = rssi;
  console.log(label);
 
  const data = {
    labels: labelsList.map((date:any) =>  ` ${date.day}/${date.month}/${date.year}` + " " +
    `${date.hours}:${date.minutes}:${date.seconds}`),
    datasets: dataSetList.map((mac1: any,i:number) => {
      return {
        label: mac1.mac1Value + " " + label,
        data:  mac1.objArray.map((data: any) => data[`${label}`]),
        borderColor: backGroundColor.map((color: any) =>  color),
        backgroundColor: backGroundColor[i],
        tension:0.5
      };
    }),
  }
  // console.log(data);
 console.log('--------------------------------------------------------');
 
  
  return data;

};




export default createChartData;
