import { useState, useEffect } from "react";
import { findTimeFrame } from "./features/timeRange";
import event_mapping from "./features/event_mapping.json";
import { defaultChartData } from "./features/chartData";
import BarChart from "./components/BarChart";
import ObjectModel from "./models/ObjectModelBLE";
import Papa from "papaparse";
import { filterData } from "./features/filter";
import createChartData from "./features/chartData";



function App() {
  const [dataAmount, setDataAmount] = useState<number>(0);
  const [allData, setAllData] = useState<any>([]);
  const [fileAdded, setFileAdded] = useState(false);
  let [theChartData, setTheChartData] = useState<any>();
  let [dataWifiAndKey, setdataWifiAndKey] = useState<any>([]);
  let [dataBLEAndKey, setdataBLEAndKey] = useState<any>([]);
  const [count, setCount] = useState(0);


   //-----Scrolling through the data amount user chose --------
  useEffect(() => {
    
    if (dataAmount !== 0 && count === 0) {
      const newData = allData.slice(0, dataAmount);
      const { tempWifi, tempBLE } = handleFilterHeaders(event_mapping);
      const amountChanged = true;
      setChartData(newData, tempWifi, tempBLE, amountChanged);
    } else if (dataAmount !== 0 && count !== 0) {
      const newData = allData.slice(dataAmount * count,dataAmount * (count + 1));
      const { tempWifi, tempBLE } = handleFilterHeaders(event_mapping);
      const amountChanged = true;
      setChartData(newData, tempWifi, tempBLE, amountChanged);
      
    }
  }, [dataAmount, count]);


  // -----Filtering the headers from event_mapping version 0.8.5 and making sure its in the original order, by index instead of alphabetical --------------

 function handleFilterHeaders(event_mapping: any) {
    const tempWifi: any = [];
    const tempBLE: any = [];
    const wifi = event_mapping["WIFI"]["0.8.5"];
    const ble = event_mapping.BLE["0.8.5"];

    const sortingByIndexWIFI = Object.entries(wifi).sort(
      (currentEl: any, nextEl: any) => currentEl[1] - nextEl[1]
    );
    const sortedByIndexBLE = Object.entries(ble).sort(
      (currentEl: any, nextEl: any) => currentEl[1] - nextEl[1]
    );
    sortingByIndexWIFI.forEach((obj) => {
      tempWifi.push(obj[0]);
    });
    sortedByIndexBLE.forEach((obj) => {
      tempBLE.push(obj[0]);
    });
   
    return { tempWifi, tempBLE };
  }

  async function getCsvFile(ev: any) {
    let newFile = ev.target.files[0];

    const data = await papaparse(newFile);
   

    setAllData(data);

    const newData: Array<ObjectModel> = data.slice(0, 4999);
    const { tempWifi, tempBLE } = handleFilterHeaders(event_mapping);
    const amountChanged = false;
    setChartData(newData, tempWifi, tempBLE, amountChanged);
  }

  function setChartData(
    newData: Array<any>,
    tempWifi: Array<any>,
    tempBLE: Array<any>,
    amountChanged: boolean
  ) {
    const result = filterData(newData, tempBLE, tempWifi);

    const wifiList = result.wifiData;
    const bleList = result.BLEData;

    if (amountChanged) {
      setFileAdded(true);
      setdataBLEAndKey(bleList);
      setdataWifiAndKey(wifiList);
      const labelsListBle = findTimeFrame(bleList);
      const labelsListWifi = findTimeFrame(wifiList);
      const wifiData = createChartData(
        wifiList,
        "rssi_0",
        "event_id",
        labelsListWifi
      );
      const bleData = createChartData(
        bleList,
        "rssi_0",
        "event_id",
        labelsListBle
      );
      setTheChartData({ wifiData, bleData });
    } else {
      setFileAdded(true);
      setdataBLEAndKey(bleList);
      setdataWifiAndKey(wifiList);
      const bleData = defaultChartData(bleList);
      const wifiData = defaultChartData(wifiList);
      setTheChartData({ wifiData, bleData });
    }
  }

  return (
    <div className="App">
      {fileAdded ? (
        <BarChart
        dataAmount={dataAmount}
          setDataAmount={setDataAmount}
          theChartData={theChartData}
          dataWifiAndKey={dataWifiAndKey}
          dataBLEAndKey={dataBLEAndKey}
          count={count}
          setCount={setCount}
        />
      ) :  <input type="file" name="csvFile" accept=".csv" onChange={getCsvFile} />}
    
     
    </div>
  );
}



function papaparse(newFile: any): Promise<Array<any>> {
  return new Promise((resolve, reject) => {
    Papa.parse(newFile, {
      header: false,
      skipEmptyLines: true,
      complete: ({ data }) => {
        resolve(data);
      },
    });
  });
}

export default App;
