import React, { useEffect } from "react";
import createChartData from "../features/chartData";

interface ChangeChartDataProps {
  setRssiData:Function;
  setMacData:Function;
  isBleOrWifi:boolean;
}

function ChangeChartData(props: ChangeChartDataProps) {
  const { setRssiData ,setMacData,isBleOrWifi} = props;

   function changeDatasets(ev: any) {
    ev.preventDefault();

    const newDataSetData = ev.target.elements.changeChartData.value;
    const newDataSet = ev.target.elements.changeChartDatasetBle.value;
     setRssiData(newDataSetData)
     setMacData(newDataSet)
  }

  return (
    <>
      <form onSubmit={changeDatasets}>
        <label htmlFor="changeChartData">select data:</label>
        <select className="selectChangeChartData" name="changeChartData" required>
          <option value="rssi_0">rssi 0</option>
          <option value="rssi_1">rssi 1</option>
          <option value="rssi_2">rssi 2</option>
        </select>

        <label htmlFor="changeChartDatasetBle">select Data set:</label>
        <select className="selectChartDataset" name="changeChartDatasetBle" required>
          
          <option value="MAC_1">MAC 1</option>
          {isBleOrWifi?<option value="MAC_2">MAC_2</option>:null}
          <option value="event_id">event id</option>
        </select>
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default ChangeChartData;
