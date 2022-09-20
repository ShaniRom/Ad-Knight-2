import { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
// import CSVDownloader from "./CSVDownloader";
import createChartData from "../features/chartData";
import { Line , getElementAtEvent, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "../style/style.scss";
import { setDatasets } from "react-chartjs-2/dist/utils";
import {filterData} from '../features/filter'
import Table from "./Table";

import ChangeChartData from "./ChangeChartData";
import ChartDiv from "./Chart";
Chart.register(...registerables);


interface BarChartProps {
  dataSaved: any;
  chartdata:any;
  dataWifi:Array<any>;
  dataBLE:Array<any>;
}



const BarChart = (props: BarChartProps) => {

  const { dataSaved,chartdata,dataWifi,dataBLE} = props;


  let [CSVdata, setCSVdata] = useState(dataSaved);  
  let [chartClicked, setChartClicked] = useState(false);
  const [wifiBLE,setWifiBLE] = useState(false)
  // let [chartData, setChartData] = useState<any>(chartdata);
  
  const [wifiData, setwifiData] = useState<any>(chartdata.wifiData);
  const [bleData, setbleData] = useState<any>(chartdata.bleData);
  const [dataSetData,setData]=useState('rssi_0')
  const [dataSet,setDataset]=useState('MAC_1')
  const chartRef: any = useRef(null);
  
  
  // set colors by values
  useEffect(() => {

    const wifiData = createChartData(dataWifi, dataSetData,dataSet);
    const bleData = createChartData(dataBLE, dataSetData,dataSet);
    setwifiData( wifiData)
    setbleData(bleData)
    
  }, [dataSetData,dataSet,wifiBLE]);
  

  // get chart data for table

  const getChart = async (ev: any) => {
    // console.log(ev);
    const chosenChart = getElementAtEvent(chartRef.current, ev);
    const index = chosenChart[0].index;
    console.log(chosenChart);
    await getChartData(index);
    setChartClicked(true);
  };

  async function getChartData(index: any) {
    
    let chartData;
    // if(choseYears){
    //  chartData=filteredData[index]
    // }else{
    //    chartData = CSVdata[index];
    // }
    // setChartData(chartData);
  }

  function handleDownload(CSVdata: any) {
    // console.log(wifiData.datasets[0].data);
    // console.log(wifiData.labels);
   

    const dataTemp = wifiData.labels.map((year: any, i: number) => {
      return { mam: wifiData.datasets[0].data[i], Year: year };
    });

    // console.log(dataTemp);

    const templist = dataTemp.map((obj: any, i: number) => {
      return {
        Year: obj.Year,
        MAM: obj.mam,
      };
    });

    let csv = Papa.unparse(templist);

    const blob = new Blob([csv]);

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);

    a.download = "CSVExportFile.csv";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function handleDownloadToImg() {
    const link = document.createElement("a");
    link.download = "chart.png";
    link.href = chartRef.current.toBase64Image("image/png", 1);
    link.click();
    
  }

  async function changeBLE(){
    setWifiBLE(!wifiBLE)

  }
 
  return (
    <div className="main">
      {/* <List bleData={bleData} wifiData={wifiData} wifiBLE={wifiBLE} /> */}
     <ChartDiv bleData={bleData} wifiData={wifiData} wifiBLE={wifiBLE}/>

      <button name="changeBLE" onClick={changeBLE}>{wifiBLE?"BLE":"WIFI"}</button>
      
      {/* <Table chartClicked={chartClicked} chartData={chartData} keysOfObj={keysOfObj} /> */}

      <ChangeChartData wifiBLE={wifiBLE} setData={setData} setDataset={setDataset}/>

      {/* <CSVLink data={dataSaved}>Export CSV</CSVLink>; */}
      <button onClick={(CSVdata) => handleDownload(CSVdata)}>
        Download To CSV
      </button>
      <button onClick={handleDownloadToImg}>Download To Image</button>
      
      </div>
    
  );
};

export default BarChart;
