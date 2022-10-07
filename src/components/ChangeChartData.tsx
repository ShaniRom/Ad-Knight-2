import React, { useEffect, useState } from "react";
import { findTimeFrame } from "../features/timeRange";

 import { filterDataToSelect, filterDataSet } from "../features/filter";
import { chosenLineChart } from "../features/chartData";

interface ChangeChartDataProps {
  setYdata: Function;
  setDataSet: Function;
  isBleOrWifi: boolean;
  dataBLEAndKey: Array<any>;
  dataWifiAndKey: Array<any>;
  dataSet: string;
  setLabels: Function;
  setChoseOne: Function;
  setWifiData: Function;
  setBleData: Function;
  setselectedDS: Function;
}

function ChangeChartData(props: ChangeChartDataProps) {
  const {
    setBleData,
    setWifiData,
    setDataSet,
    setYdata,
    isBleOrWifi,
    dataBLEAndKey,
    dataSet,
    dataWifiAndKey,
    setLabels,
    setChoseOne,

    setselectedDS,
  } = props;

  const [chosenTime, setChosenTime] = useState<Array<object>>([]);
  const [Ydata, setDSdata] = useState("");
  const [chosenDS, setChosenDateSet] = useState<any>([]);
  const bleOptions = filterDataToSelect(dataBLEAndKey);
  const wifiOptions = filterDataToSelect(dataWifiAndKey);

  useEffect(() => {
    
   
   

  }, [chosenDS, chosenTime, changeDatasets, filterByChosenTS,filterDataSet]);

  function selectByDataSet() {
    console.log(isBleOrWifi + "issBleOrWifi");
    if (isBleOrWifi) {
      const timestamp = findTimeFrame(dataWifiAndKey);
      const selectedDS = filterDataSet(dataWifiAndKey, dataSet);
      setChosenDateSet(selectedDS);
       setChosenTime(timestamp);
    } else {
      const timestamp = findTimeFrame(dataBLEAndKey);
      const selectedDS = filterDataSet(dataBLEAndKey, dataSet);      
      setChosenDateSet(selectedDS);
      setChosenTime(timestamp);
      console.log(chosenDS)
     //---chosendata takes a two clicks to show and when setchosendataset and chosentime it rerenders each time
     //maybe make it async 
    // maybe try to change the stuff needed in filterdataset to two different functions instead of it having to get datawifiandkeys and dataset 
    }
  }
 

  function changeDatasets(ev: any) {
    ev.preventDefault();
    selectByDataSet();
    const newDataSetData = ev.target.elements.changeChartData.value;
    const newDataSet = ev.target.elements.changeChartDataset.value;
    setYdata(newDataSetData);
    setDSdata(newDataSetData);
    setDataSet(newDataSet);
  }

  function filterByChosenTS(ev: any) {
    ev.preventDefault();
    const minimumTS = parseInt(ev.target.elements.minTS.value);
    const maximumTS = parseInt(ev.target.elements.maxTS.value);
    const chosenTS = chosenTime.slice(minimumTS, maximumTS + 1);
    setLabels(chosenTS);
  }

  function getChosenLINE(ev: any) {
    const selectedIndex = ev.target.value;
    const selectedDS = chosenDS[selectedIndex];
    setselectedDS(selectedDS);
    console.log(selectedDS);
    setChoseOne(true);
  }

  return (
    <>
      <form className="form" onSubmit={changeDatasets}>
        <label htmlFor="changeChartData">
          select data:
          <select
            className="form_selectChangeChartData"
            name="changeChartData"
            required
          >
            {isBleOrWifi
              ? wifiOptions.newNumbers.map((option: any, i: number) => {
                  return (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  );
                })
              : bleOptions.newNumbers.map((option: any, i: number) => {
                  return (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  );
                })}
          </select>
        </label>

        <label htmlFor="changeChartDataset">
          select Data set:
          <select
            className="form_selectChangeChartData"
            name="changeChartDataset"
            required
          >
            {isBleOrWifi
              ? wifiOptions.numbersAndLetters.map((option: any, i: number) => {
                  return (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  );
                })
              : bleOptions.numbersAndLetters.map((option: any, i: number) => {
                  return (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  );
                })}
          </select>
        </label>
        
        <button type="submit">submit</button>
      </form>

      <form className="form" onSubmit={filterByChosenTS}>
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

      <label
        style={{ fontSize: 20, fontWeight: "bold" }}
        htmlFor="chooseOneLine"
      >
        select which {dataSet} on chart:
        <select
          className="main_chooseOneByOne"
          name="chooseOneLine"
          required
          multiple
          onChange={getChosenLINE}
        >
          {chosenDS.map((ds: any, i: number) => {
            
            return (
              <option key={i} value={i}>
                {ds.chosendataSet}
              </option>
            );
          })}
        </select>
      </label>
    </>
  );
}

export default ChangeChartData;
