import { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
// import CSVDownloader from "./CSVDownloader";
import createChartData from "../features/chartData";
// import { Line, getElementAtEvent, Doughnut } from "react-chartjs-2";
import "../style/style.scss";
import Table from "./Table";
import ChangeChartData from "./ChangeChartData";
import ChartDiv from "./Chart";


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
  const [labels,setLabels]=useState([])
  const [wifiData, setWifiData] = useState<any>(theChartData.wifiData);
  const [bleData, setBleData] = useState<any>(theChartData.bleData);
  const [Ydata, setYdata] = useState("rssi_0");
  const [dataSet, setDataSet] = useState("MAC_1");
  const chartRef: any = useRef(null);

  useEffect(() => {
    const wifiData = createChartData(dataWifiAndKey, Ydata, dataSet,labels);
    const bleData = createChartData(dataBLEAndKey, Ydata, dataSet,labels);
    setWifiData(wifiData);
    setBleData(bleData);
  }, [Ydata, dataSet, isBleOrWifi,labels]);

  // get chart data for table

  // const getChart = async (ev: any) => {
  //   const chosenChart = getElementAtEvent(chartRef.current, ev);
  //   const index = chosenChart[0].index;

  //   await getChartData(index);
  //   setChartClicked(true);
  // };

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
    const dataTemp = wifiData.labels.map((year: any, i: number) => {
      return { mam: wifiData.datasets[0].data[i], Year: year };
    });

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
      <ChartDiv
        chartRef={chartRef}
        bleData={bleData}
        wifiData={wifiData}
        isBleOrWifi={isBleOrWifi}
      />
      <div className="main_filterChart">
        <button
          className="main_changeBLEbtn"
          name="changeBLE"
          onClick={changeBLE}
        >
          {isBleOrWifi ? "BLE" : "WIFI"}
        </button>

        <ChangeChartData
          setYdata={setYdata}
          setDataSet={setDataSet}
          isBleOrWifi={isBleOrWifi}
          dataBLEAndKey={dataBLEAndKey}
          dataWifiAndKey={dataWifiAndKey}
          data={isBleOrWifi?dataWifiAndKey:dataBLEAndKey}
         setLabels={setLabels}
        />

        <button onClick={(CSVdata) => handleDownload(CSVdata)}>
          Download To CSV
        </button>
        <button onClick={handleDownloadToImg}>Download To Image</button>
      </div>
    </div>
  );
};

{
  /* <Table chartClicked={chartClicked} chartData={chartData} keysOfObj={keysOfObj} /> */
}

export default BarChart;
