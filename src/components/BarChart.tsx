import { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
// import CSVDownloader from "./CSVDownloader";
import createChartData from "../features/chartData";
import { Line, getElementAtEvent, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "../style/style.scss";
import Table from "./Table";

import ChangeChartData from "./ChangeChartData";
import ChartDiv from "./Chart";
Chart.register(...registerables);

interface BarChartProps {
  theChartData: any;
  dataWifiAndKey: Array<string>;
  dataBLEAndKey: Array<string>;
}

const BarChart = (props: BarChartProps) => {
  const { theChartData, dataWifiAndKey, dataBLEAndKey } = props;

  let [chartClicked, setChartClicked] = useState(false);
  const [isBleOrWifi, setisBleOrWifi] = useState(false);
  // let [chartData, setChartData] = useState<any>(chartdata);

  const [wifiData, setWifiData] = useState<any>(theChartData.wifiData);
  const [bleData, setBleData] = useState<any>(theChartData.bleData);
  const [rssiData, setRssiData] = useState("rssi_0");
  const [macData, setMacData] = useState("MAC_1");
  const chartRef: any = useRef(null);
console.log(wifiData)
  // set colors by values
  useEffect(() => {
    const wifiData = createChartData(dataWifiAndKey, rssiData, macData);
    const bleData = createChartData(dataBLEAndKey, rssiData, macData);
    setWifiData(wifiData);
    setBleData(bleData);
  }, [rssiData, macData, isBleOrWifi]);

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

  async function changeBLE() {
    setisBleOrWifi(!isBleOrWifi);
  }

console.log(theChartData);


  return (
    <div className="main">
      {/* <List bleData={bleData} wifiData={wifiData} isBleOrWifi={isBleOrWifi} /> */}
      <ChartDiv bleData={bleData} wifiData={wifiData} isBleOrWifi={isBleOrWifi} />

      <button name="changeBLE" onClick={changeBLE}>
        {isBleOrWifi ? "BLE" : "WIFI"}
      </button>

      {/* <Table chartClicked={chartClicked} chartData={chartData} keysOfObj={keysOfObj} /> */}

      <ChangeChartData
        isBleOrWifi={isBleOrWifi}
        setRssiData={setRssiData}
        setMacData={setMacData}
      />

      <button onClick={(CSVdata) => handleDownload(CSVdata)}>
        Download To CSV
      </button>
      <button onClick={handleDownloadToImg}>Download To Image</button>
    </div>
  );
};

export default BarChart;
