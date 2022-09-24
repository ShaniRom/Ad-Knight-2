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

  const [chosenTime, setChosenTime] = useState<Array<object>>([]);
  
  useEffect(() => {
    const timestamp = findTimeFrame(data);
    setChosenTime(timestamp);
  }, []);




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
          <option value="rssi_0">rssi 0</option>
          <option value="rssi_1">rssi 1</option>
          <option value="rssi_2">rssi 2</option>
        </select>
        </label>

        <label htmlFor="changeChartDataset">select Data set:

        <select className="form_selectChangeChartData" name="changeChartDataset" required>

          <option value="MAC_1">MAC 1</option>
          {isBleOrWifi ? <option value="MAC_2">MAC_2</option> : null}
          <option value="event_id">event id</option>
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
