import { filterDataSet } from "./filter";
import { getColors } from "./colors";
import {findTimeFrame} from './timeRange';


//dataset is the line
const createChartData =  (someData : any,dataSetData:string,dataSet:string,labels:Array<number>) => {

  
  const type =someData[0].wifi_ble
  const dataSetList =  filterDataSet(someData,dataSet);


  const backGroundColor = getColors(dataSetList);
console.log(dataSetList)
  // console.log(dataSetData)
  // console.log(dataSet)
 console.log(labels)
  const data = {
    labels: labels.map((date:any) =>  ` ${date.hours}` + " " +
    `:0${date.minutes}:0${date.seconds}`),
    datasets: dataSetList.map((line: any,i:number) => {
      
      return {
        label: line.chosendataSet + " " + type + " "+ dataSetData,
        data:  line.objArray.map((data: any) => data[`${dataSetData}`]),
        borderColor: backGroundColor.map((color: any) =>  color),
        backgroundColor: backGroundColor[i],
        tension:0.5
      };
    }),
  }
  
    console.log(data)  
  return data;

};




export default createChartData;
