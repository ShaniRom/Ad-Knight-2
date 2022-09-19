import React, { useEffect } from "react";
import createChartData from "../features/chartData";

interface ChangeLabelsProps {
  dataSetData:String;
  setData:Function
}


function ChangeLabels(props: ChangeLabelsProps) {
  const { setData } = props;

   function changeDatasets(ev: any) {
    ev.preventDefault();

    const newDataSet = ev.target.elements.changeLabels.value;

     setData(newDataSet)
  }

  return (
    <>
      <form onSubmit={changeDatasets}>
        <label htmlFor="changeLabels">select label:</label>
        <select className="selectChangeLabels" name="changeLabels">
          <option value="rssi_0">rssi 0</option>
          <option value="rssi_1">rssi 1</option>
          <option value="rssi_2">rssi 2</option>
        </select>
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default ChangeLabels;
