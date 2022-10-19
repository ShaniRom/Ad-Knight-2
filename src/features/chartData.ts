import { filterDataSet } from "./filter";
import { getColors } from "./colors";
import {findTimeFrame} from './timeRange';
import ObjectModel from "../models/ObjectModelBLE";



const createChartData =  (someData : any,dataSetData:string,dataSet:string,labels:Array<number>) => {

  
  const type =someData[0].wifi_ble;
  const dataSetList =  filterDataSet(someData,dataSet);
  const backGroundColor = getColors(dataSetList);
  
  const data = {
    labels: labels.map((date:any) =>  ` ${date.hours}` + " " +
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
  
  
  
  return {data,dataSetList};

}


  export const defaultChartData = (someData : Array<ObjectModel>) => {

    const labelsList =  findTimeFrame(someData);
    

    const data = {

      labels: labelsList.map((date:any) =>  ` ${date.hours}` + " " +
      `:0${date.minutes}:0${date.seconds}`),

      datasets: [{
        label: `${someData[0].wifi_ble}`,
        data: [-60,-65,-70,-75,-80,-95],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    }
    
      
    return data;
  
  }



export const chosenLineChart = (selectedDS:any,list:Array<any>,yData:string) => {

  const dataArray = selectedDS.objArray
  const dataSet = selectedDS.chosendataSet
  const labelsList =  findTimeFrame(list);
  
  console.log(labelsList);
  
      const data = {
        labels: labelsList.map((date:any) =>  ` ${date.hours}` + " " +
        `:0${date.minutes}:0${date.seconds}`),
        datasets:[{ 
            label: dataSet,
            data:  dataArray.map((data: any) => Number(data[`${yData}`])),
            borderColor: 'rgb(17, 247, 78)',
            backgroundColor: 'rgb(17, 247, 78)',
            tension: 0.4
          }]
        }
        return data;
      }
      
      
      
    
    
   
    
        





export default createChartData
