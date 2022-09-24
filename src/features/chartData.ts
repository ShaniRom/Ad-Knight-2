import { filterDataSet } from "./filter";
import { getColors } from "./colors";
import {findTimeFrame} from './timeRange';
import ObjectModel from "../models/ObjectModelBLE";

//dataset is the line
const createChartData =  (someData : any,dataSetData:string,dataSet:string) => {

  const type =someData[0].wifi_ble;
  const dataSetList =  filterDataSet(someData,dataSet);
  const labelsList =  findTimeFrame(someData);
  const backGroundColor = getColors(dataSetList);

 
  
  const data = {

    labels: labelsList.map((date:any) =>  ` ${date.hours}` + " " +
    `:0${date.minutes}:0${date.seconds}`),
    datasets: dataSetList.map((line: any,i:number) => {
      
      return {
        label: line.chosendataSet + " " + type + " "+ dataSetData,
        data:  line.objArray.map((data: any) => data[`${dataSetData}`]),
        borderColor: backGroundColor.map((color: any) =>  color),
        backgroundColor: backGroundColor[i],
        tension:0.4
      };
    }),
  }
  return data;

}


  export const defaultChartData = (someData : Array<ObjectModel>) => {

    const labelsList =  findTimeFrame(someData);

    const data = {
      labels: labelsList.map((date:any) =>  ` ${date.hours}` + " " +
      `:0${date.minutes}:0${date.seconds}`),

      datasets: [{
        label: `${someData[0].wifi_ble}`,
        data: [-60, -55, -50, -45, -40, -35, -30],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    }
    
      
    return data;
  
  }




export default createChartData
