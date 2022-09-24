import React, { useEffect, useState } from "react";
import createChartData from "../features/chartData";
import { findTimeFrame } from "../features/timeRange";

interface ChangeChartDataProps {
  setRssiData: Function;
  setMacData: Function;
  isBleOrWifi: boolean;
  data: Array<any>;
  setLabels:Function
}

function ChangeChartData(props: ChangeChartDataProps) {
  const { setRssiData, setMacData, isBleOrWifi, data ,setLabels} = props;
  const [chosenTime, setChosenTime] = useState<Array<object>>([]);
  
  useEffect(() => {
    const timestamp = findTimeFrame(data);
    setChosenTime(timestamp);
  }, []);

  function changeDatasets(ev: any) {
    ev.preventDefault();

    const newDataSetData = ev.target.elements.changeChartData.value;
    const newDataSet = ev.target.elements.changeChartDatasetBle.value;
    setRssiData(newDataSetData);
    setMacData(newDataSet);
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
      <form onSubmit={changeDatasets}>
        <label htmlFor="changeChartData">select data:</label>
        <select
          className="selectChangeChartData"
          name="changeChartData"
          required
        >
          <option value="rssi_0">rssi 0</option>
          <option value="rssi_1">rssi 1</option>
          <option value="rssi_2">rssi 2</option>
        </select>

        <label htmlFor="changeChartDatasetBle">select Data set:</label>
        <select
          className="selectChartDataset"
          name="changeChartDatasetBle"
          required
        >
          <option value="MAC_1">MAC 1</option>
          {isBleOrWifi ? <option value="MAC_2">MAC_2</option> : null}
          <option value="event_id">event id</option>
        </select>
        <button type="submit">submit</button>
      </form>

      <form style={{ border: "solid 2px black" }} onSubmit={filterByChosenTS}>
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
