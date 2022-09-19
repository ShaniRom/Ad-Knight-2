import React, { useState ,useEffect} from "react";
import "./App.css";
import event_mapping from './features/event_mapping.json'
import { Doughnut } from "react-chartjs-2";
import BarChart from "./components/BarChart";
import { Chart, registerables } from "chart.js";
import Papa from "papaparse";
import { filterData } from "./features/filter";
import createChartData from "./features/chartData";
import { ListFormat } from "typescript";
// import { FileHandle } from "fs/promises";
import {filterByMac1} from './features/filter'
const allowedExtensions = ["csv"];

function App() {
  const [fileAdded, setFileAdded] = useState(false);
  const [csvData, setCsvData] = useState<any>();

  const [keysOfObj, setKeysOfObj] = useState<any>([]);
  const [dataSaved, setDataSaved] = useState<any>([]);
  const [keysWIFI , setKeysWIFI] = useState<any>([])
  const [keysBLE , setKeysBLE ] = useState<any>([]);
  let [chartdata,setChartData] =useState<any>();
  let [dataWifi, setDataWifi] = useState<any>([]);
  let [dataBLE , setDataBLE] = useState<any>([]);

  function handleFilter(){
    const tempWifi:any = []
    const tempBLE:any = []
    const wifi = event_mapping["WIFI"]["0.8.5"]
    const ble = event_mapping.BLE["0.8.5"]
    const sortedWIFI = Object.entries(wifi).sort((a,b) => a[1]-b[1])
    const sortedBLE = Object.entries(ble).sort((a,b) => a[1]-b[1])

    sortedWIFI.map((obj) => {
      tempWifi.push(obj[0]);
    });
    sortedBLE.map((obj) => {
      tempBLE.push(obj[0]);
    });

    setKeysWIFI(tempWifi)
    setKeysBLE(tempBLE)
    return {tempWifi,tempBLE}
  }

  
 
  async function getCsvFile(ev: any) {

    const newFile = ev.target.files[0];
    console.log();
    
        
    Papa.parse(newFile, {
      header: false,
      skipEmptyLines: true,
      complete: async function (results) {
        const list: any = results.data;
        
        let newData = [];
        let keys:any = [];
        for (let i = 0; i < list.length; i++) {
          if (i === 0) {
            Object.keys(list[i]).map((obj) => {
              keysOfObj.push(obj);
              setKeysOfObj(keysOfObj);
            });
          }
          
          
          newData.push(list[i]);
        }
        
        
         
        const {tempWifi,tempBLE} = await handleFilter()

        setDataSaved(newData);
        
        setFileAdded(true);

         newData.length = 100;

       const result = await filterData(newData,tempBLE,tempWifi)

       for(let field of result.BLEData){
          field.date.seconds = parseInt(field.date.seconds)
          
       }
       for(let field of result.wifiData){
        field.date.seconds = parseInt(field.date.seconds)
      }
      //  console.log(result);
      //  console.log(result.wifiData);
      //  console.log(result.BLEData);
       
       const wifiList = result.wifiData
       const bleList = result.BLEData;
       
       
       setDataBLE(bleList);
       setDataWifi(wifiList);
      console.log(bleList);
      console.log(wifiList);
      
       const bleData = await createChartData(bleList)
       const wifiData = await  createChartData(wifiList)

      

       setChartData({wifiData,bleData})
       console.log(wifiData)
        // await setChartData(data);
       
      },
    });
  }

  return (
    <div className="App">
      {fileAdded ? (
        <BarChart dataSaved={dataSaved} chartdata={chartdata} keysWIFI={dataBLE} keysBLE={keysBLE} keysOfObj={keysOfObj} />
      ) : null}

      {fileAdded ? null : (
        <input type="file" name="csvFile" accept=".csv" onChange={getCsvFile} />
      )}
      {/* <input type="file" name="csvFile" accept=".csv" onChange={getCsvFile} /> */}
    </div>
  );
}

export default App;
