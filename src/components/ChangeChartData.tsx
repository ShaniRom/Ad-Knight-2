import React, { useEffect } from "react";
import {filterDataToSelect} from '../features/filter'
// import ObjectModel from '../models/ObjectModelBLE'


interface ChangeChartDataProps {
  setRssiData:Function;
  setMacData:Function;
  isBleOrWifi:boolean;
}

function ChangeChartData(props: ChangeChartDataProps) {
  const { setRssiData ,setMacData,isBleOrWifi} = props;


  const { setData ,setDataset,wifiBLE,dataBLE,dataWifi} = props;

  const lala = filterDataToSelect(dataBLE)
  // const lalas = filterDataToSelect(dataWifi)
   function changeDatasets(ev: any) {
    ev.preventDefault();
    
    const newDataSetData = ev.target.elements.changeChartData.value;
    const newDataSet = ev.target.elements.changeChartDataset.value;
     setData(newDataSetData)
     setDataset(newDataSet)
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
          {isBleOrWifi?<option value="MAC_2">MAC_2</option>:null}
          <option value="event_id">event id</option>
        </select>
        </label>
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default ChangeChartData;
