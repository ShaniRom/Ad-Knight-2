import React, { useState, useEffect } from "react";

import event_mapping from "./features/event_mapping.json";

import BarChart from "./components/BarChart";

import Papa from "papaparse";
import { filterData } from "./features/filter";
import createChartData from "./features/chartData";

// import { FileHandle } from "fs/promises";
const allowedExtensions = ["csv"];

function App() {
  const [fileAdded, setFileAdded] = useState(false);
  const [csvData, setCsvData] = useState<any>();
  let [theChartData, setTheChartData] = useState<any>();
  let [dataWifiAndKey, setdataWifiAndKey] = useState<any>([]);
  let [dataBLEAndKey, setdataBLEAndKey] = useState<any>([]);

  function handleFilterHeaders(event_mapping: any) {
    const tempWifi: any = [];
    const tempBLE: any = [];
    const wifi = event_mapping["WIFI"]["0.8.5"];
    const ble = event_mapping.BLE["0.8.5"];
    const sortedWIFI = Object.entries(wifi).sort(
      (a: any, b: any) => a[1] - b[1]
    );
    const sortedBLE = Object.entries(ble).sort((a: any, b: any) => a[1] - b[1]);

    sortedWIFI.forEach((obj) => {
      tempWifi.push(obj[0]);
    });
    sortedBLE.forEach((obj) => {
      tempBLE.push(obj[0]);
    });

    return { tempWifi, tempBLE };
  }

  async function getCsvFile(ev: any) {
    const newFile = ev.target.files[0];

    const data = await papaparse(newFile);

    const newData: Array<any> = data;

    const { tempWifi, tempBLE } = handleFilterHeaders(event_mapping);

    newData.length = 1000;

    const result = filterData(newData, tempBLE, tempWifi);

    const wifiList = result.wifiData;
    const bleList = result.BLEData;

    console.log(wifiList);
    const bleData = createChartData(bleList, "rssi_0", "MAC_1");
    const wifiData = createChartData(wifiList, "rssi_0", "MAC_1");

    setFileAdded(true);
    setdataBLEAndKey(bleList);
    setdataWifiAndKey(wifiList);
    setTheChartData({ wifiData, bleData });
  }

  return (
    <div className="App">
      {fileAdded ? (
        <BarChart theChartData={theChartData} dataWifiAndKey={dataWifiAndKey} dataBLEAndKey={dataBLEAndKey} />
      ) : null}

      {fileAdded ? null : (
        <input type="file" name="csvFile" accept=".csv" onChange={getCsvFile} />
      )}
      {/* <input type="file" name="csvFile" accept=".csv" onChange={getCsvFile} /> */}
    </div>
  );
}

export default App;

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
