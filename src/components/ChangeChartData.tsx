import React, { useEffect, useState } from "react";
import createChartData from "../features/chartData";
import { findTimeFrame } from "../features/timeRange";
import {filterDataToSelect} from '../features/filter'


interface ChangeChartDataProps {
  setYdata:Function;
  setDataSet:Function;
  isBleOrWifi:boolean;
  dataBLEAndKey:Array<any>;
  dataWifiAndKey:Array<any>;
  data: Array<any>;
  setLabels:Function
}

function ChangeChartData(props: ChangeChartDataProps) {
  const { setDataSet ,setYdata,isBleOrWifi,dataBLEAndKey,data,dataWifiAndKey,setLabels} = props;

    const bleOptions = filterDataToSelect(dataBLEAndKey)
    const wifiOptions = filterDataToSelect(dataWifiAndKey)
  const [chosenTime, setChosenTime] = useState<Array<object>>([]);
  
  useEffect(() => {
    const timestamp = findTimeFrame(data);
    setChosenTime(timestamp);
  }, []);

    console.log('ble',bleOptions);
    console.log('wifi',wifiOptions);
    
  



  const lala = filterDataToSelect(dataBLEAndKey)
  // const lalas = filterDataToSelect(dataWifi)
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
        {isBleOrWifi?wifiOptions.numbersList.map((option:any,i:number) => {
        return(
          <option key={i} value={option}>{option}</option>
        )
      }):bleOptions.numbersList.map((option:any,i:number) => {
        return(
          <option key={i} value={option}>{option}</option>
        )
      })}
        </select>


        </label>

        <label htmlFor="changeChartDataset">select Data set:

        <select className="form_selectChangeChartData" name="changeChartDataset" required>
        {isBleOrWifi?wifiOptions.newNumersAndLetters.map((option:any,i:number) => {
        return(
          <option key={i} value={option}>{option}</option>
        )
      }):bleOptions.newNumersAndLetters.map((option:any,i:number) => {
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
    </>
  );
}

export default ChangeChartData;
