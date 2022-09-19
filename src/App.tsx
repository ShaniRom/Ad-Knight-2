import React, { useState, useEffect } from "react";
import "./App.css";
import event_mapping from "./features/event_mapping.json";
import { Doughnut } from "react-chartjs-2";
import BarChart from "./components/BarChart";
import { Chart, registerables } from "chart.js";
import Papa from "papaparse";
import { filterData } from "./features/filter";
import createChartData from "./features/chartData";
import { ListFormat } from "typescript";
// import { FileHandle } from "fs/promises";
import ChangeLabels from "./components/ChangeLabels";
const allowedExtensions = ["csv"];

function App() {
  const [fileAdded, setFileAdded] = useState(false);
  const [csvData, setCsvData] = useState<any>();

  const [keysOfObj, setKeysOfObj] = useState<any>([]);
  const [dataSaved, setDataSaved] = useState<any>([]);
  const [keysWIFI, setKeysWIFI] = useState<any>([]);
  const [keysBLE, setKeysBLE] = useState<any>([]);
  let [chartdata, setChartData] = useState<any>();
  let [dataWifi, setDataWifi] = useState<any>([]);
  let [dataBLE, setDataBLE] = useState<any>([]);

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

    setKeysWIFI(tempWifi);
    setKeysBLE(tempBLE);
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

    const bleData = createChartData(bleList, "rssi_0");
    const wifiData = createChartData(wifiList, "rssi_0");

    setFileAdded(true);
    setDataBLE(bleList);
    setDataWifi(wifiList);
    setChartData({ wifiData, bleData });

    // await setChartData(data);
  }

  return (
    <div className="App">
      {fileAdded ? (
        <BarChart
          dataSaved={dataSaved}
          chartdata={chartdata}
          dataWifi={dataWifi}
          dataBLE={dataBLE}
        />
      ) : null}

      {fileAdded ? null : (
        <input type="file" name="csvFile" accept=".csv" onChange={getCsvFile} />
      )}
      {/* <input type="file" name="csvFile" accept=".csv" onChange={getCsvFile} /> */}
    </div>
  );
}

export default App;

function papaparse(newFile:any): Promise<Array<any>> {
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
