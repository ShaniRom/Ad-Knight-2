import { filterByMac1 } from "./filter";
import { getColors } from "./colors";
import {findTimeFrame} from './timeRange';



const createChartData =  (someData : any,dataSetData:string,dataSet:string) => {

  
  
  const dataSetList =  filterByMac1(someData,dataSet);
  const labelsList=  findTimeFrame(someData);
  const backGroundColor = getColors(dataSetList);
 
  console.log(dataSetData);
  
  console.log(dataSetList);
  
  
  const data = {
    labels: labelsList.map((date:any) =>  ` ${date.hours}` + " " +
    `:0${date.minutes}:0${date.seconds}`),
    datasets: dataSetList.map((mac1: any,i:number) => {
    
      return {
        label: mac1.chosendataSet + " " + dataSetData,
        data:  mac1.objArray.map((data: any) => data[`${dataSetData}`]),
        borderColor: backGroundColor.map((color: any) =>  color),
        backgroundColor: backGroundColor[i],
        tension:0.5
      };
    }),
  }
  
      
  return data;

};




export default createChartData;
