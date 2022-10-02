import React, { useEffect, useState } from "react";
import { findTimeFrame } from "../features/timeRange";
import {filterDataToSelect,filterDataSet} from '../features/filter'


interface ChangeChartDataProps {
  setYdata:Function;
  setDataSet:Function;
  isBleOrWifi:boolean;
  dataBLEAndKey:Array<any>;
  dataWifiAndKey:Array<any>;
  dataSet: string
  setLabels:Function
}

function ChangeChartData(props: ChangeChartDataProps) {


  const { setDataSet ,setYdata,isBleOrWifi,dataBLEAndKey,dataSet,dataWifiAndKey,setLabels} = props;

  const [chosenTime, setChosenTime] = useState<Array<object>>([]);
const [chosenDS , setChosetDateSet] = useState<any>([])


    const bleOptions = filterDataToSelect(dataBLEAndKey)
    const wifiOptions = filterDataToSelect(dataWifiAndKey)
    
console.log(chosenDS);

 

  useEffect(() => {
    if(isBleOrWifi){
      const timestamp = findTimeFrame(dataWifiAndKey);
      const selectedDS = filterDataSet(dataWifiAndKey,dataSet)
      
    setChosenTime(timestamp);
    }else{
      const timestamp = findTimeFrame(dataBLEAndKey);
      const selectedDS = filterDataSet(dataBLEAndKey,dataSet)
      console.log(selectedDS);
      setChosetDateSet(selectedDS)
      setChosenTime(timestamp);
    }
  
  }, []);

    console.log('ble',bleOptions);
    console.log('wifi',wifiOptions);
    
  
   function changeDatasets(ev: any) {
    ev.preventDefault();
    
    const newDataSetData = ev.target.elements.changeChartData.value;
    const newDataSet = ev.target.elements.changeChartDataset.value;
    setYdata(newDataSetData)
     setDataSet(newDataSet)
  }
  function filterByChosenTS(ev: any) {
    ev.preventDefault();
    const minimumTS=parseInt(ev.target.elements.minTS.value)
    const maximumTS=parseInt(ev.target.elements.maxTS.value)
    console.log( typeof(maximumTS))
    
    const chosenTS= chosenTime.slice(minimumTS,maximumTS+1);
    setLabels(chosenTS)
   
  }

  return (
    <>
      <form className="form" onSubmit={changeDatasets}>

        <label htmlFor="changeChartData">select data:
        
        <select className="form_selectChangeChartData" name="changeChartData" required>
        {isBleOrWifi?wifiOptions.newNumbers.map((option:any,i:number) => {
        return(
          <option key={i} value={option}>{option}</option>
        )
      }):bleOptions.newNumbers.map((option:any,i:number) => {
        return(
          <option key={i} value={option}>{option}</option>
        )
      })}
        </select>


        </label>

        <label htmlFor="changeChartDataset">select Data set:

        <select className="form_selectChangeChartData" name="changeChartDataset" required>
        {isBleOrWifi?wifiOptions.numbersAndLetters.map((option:any,i:number) => {
        return(
          <option key={i} value={option}>{option}</option>
        )
      }):bleOptions.numbersAndLetters.map((option:any,i:number) => {
        return(
          <option key={i} value={option}>{option}</option>
        )
      })}
        </select>
        </label>
        <button type="submit">submit</button>
      </form>

      <form  className="form" onSubmit={filterByChosenTS}>
        <label htmlFor="minTS">
          Choose minimum:
          <select className="selectMinTS" name="minTS">
            {chosenTime.map((time: any, i: number) => {
              return (
                <option key={i} value={i}>
                  {time.hours}:{time.minutes}:{time.seconds}
                </option>
              );
            })}
          </select>
        </label>
        <label htmlFor="maxTS">
          Choose maximum:
          <select className="selectMaxTS" name="maxTS">
            {chosenTime.map((time: any, i: number) => {
              return (
                <option key={i} value={i}>
                  {time.hours}:{time.minutes}:{time.seconds}
                </option>
              );
            })}
          </select>
        </label>
        <button type="submit">submit</button>
      </form>

      <div className="main_selectedDS">
        {chosenDS.map((DS:object,i:number) => {
          // <span>{DS["chosenDataSet"]}</span>
        })}

      </div>
    </>
  );
}

export default ChangeChartData;
