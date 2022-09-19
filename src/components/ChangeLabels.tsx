import React, { useEffect } from "react";
import createChartData from "../features/chartData";

interface ChangeLabelsProps {
  dataBLE: any;
  dataWifi: any;
  setChartData: Function;
  
}

function ChangeLabels(props: ChangeLabelsProps) {
  
  
  const {dataBLE,setChartData,dataWifi } = props;

 
    async function changeDatasets (ev: any) {

    ev.preventDefault()
   
    const label = ev.target.elements.changeLabels.value;

   console.log(label);
   

    const wifiData = await createChartData(dataWifi,label)


    const bleData = await createChartData(dataBLE,label)


     setChartData({wifiData,bleData})

  }

  return (
    <>
    <form onSubmit={changeDatasets}>
    <label htmlFor="changeLabels">select label:</label>
      <select className="selectChangeLabels" name="changeLabels" >
        <option  value="rssi_0">rssi 0</option>
        <option value="timer_0">rssi 1</option>
        <option value="rssi_2">rssi 2</option>
      </select>
      <button type="submit">submit</button>
      </form>
    </>
  );
}


export default ChangeLabels;
