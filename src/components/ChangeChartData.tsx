import React, { useEffect ,useState} from "react";
import {filterDataToSelect} from '../features/filter'
// import ObjectModel from '../models/ObjectModelBLE'


interface ChangeChartDataProps {
  setYdata:Function;
  setDataSet:Function;
  isBleOrWifi:boolean;
  dataBLEAndKey:Array<any>;
  dataWifiAndKey:Array<any>;

}

function ChangeChartData(props: ChangeChartDataProps) {
  const { setDataSet ,setYdata,isBleOrWifi,dataBLEAndKey,dataWifiAndKey} = props;

    const bleOptions = filterDataToSelect(dataBLEAndKey)
    const wifiOptions = filterDataToSelect(dataWifiAndKey)

    console.log('ble',bleOptions);
    console.log('wifi',wifiOptions);
    
  

   function changeDatasets(ev: any) {
    ev.preventDefault();
    
    const newDataSetData = ev.target.elements.changeChartData.value;
    const newDataSet = ev.target.elements.changeChartDataset.value;
    setYdata(newDataSetData)
     setDataSet(newDataSet)
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
    </>
  );
}

export default ChangeChartData;
