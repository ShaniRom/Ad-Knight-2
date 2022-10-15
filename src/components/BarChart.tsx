import { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
// import CSVDownloader from "./CSVDownloader";
import createChartData,{chosenLineChart} from "../features/chartData";
import "../style/style.scss";
import Table from "./Table";
import ChangeChartData from "./ChangeChartData";
import ChartDiv from "./Chart";



interface BarChartProps {
  theChartData: any;
  dataWifiAndKey: Array<string>;
  dataBLEAndKey: Array<string>; 
  setDataAmount:Function;
  count:number;
  setCount:Function; 
  
}

const BarChart = (props: BarChartProps) => {

  const { theChartData, dataWifiAndKey, dataBLEAndKey,setDataAmount,count,setCount } = props;

  
  let [chartClicked, setChartClicked] = useState(false)
  const [isBleOrWifi, setisBleOrWifi] = useState(false)
  const [labels, setLabels] = useState([])
  const [wifiData, setWifiData] = useState<any>(theChartData.wifiData)
  const [bleData, setBleData] = useState<any>(theChartData.bleData)
  const [choseOne,setChoseOne] = useState(false)
  const [Ydata, setYdata] = useState("rssi_0")
  const [dataSet, setDataSet] = useState("MAC_1")
  const [chosenDS , setChosenDateSet] = useState<any>([]);
  const chartRef: any = useRef(null)

  const [selectedDS, setselectedDS] = useState<any>({})

  useEffect(() => {
    if(choseOne){
      if(isBleOrWifi){
        const chosenDatasetLine = chosenLineChart(selectedDS,dataWifiAndKey,Ydata)

      
        setWifiData(chosenDatasetLine)
        setChoseOne(false)
      }else{
        const chosenDatasetLine = chosenLineChart(selectedDS,dataBLEAndKey,Ydata)
        setBleData(chosenDatasetLine)
        setChoseOne(false)
      }
    }else{
      const wifi = createChartData(dataWifiAndKey, Ydata, dataSet, labels);
      const ble = createChartData(dataBLEAndKey, Ydata, dataSet, labels);
      const wifiData = wifi.data
      const bleData = ble.data 
      const selectedDS = ble.dataSetList;
      setChosenDateSet(selectedDS)
      setWifiData(wifiData);
      setBleData(bleData);
    }
    
    
    
  }, [Ydata, dataSet, isBleOrWifi, labels,selectedDS,count])


  async function getChartData(index: any) {
    let chartData;
    // if(choseYears){
    //  chartData=filteredData[index]
    // }else{
    //    chartData = CSVdata[index];
    // }
    // setChartData(chartData);
  }

  function handleDownloadToCSV(CSVdata: any) {
    const dataTemp = wifiData.labels.map((year: any, i: number) => {
      return { mam: wifiData.datasets[0].data[i], Year: year };
    });
  // console.log(dataBLEAndKey)
  
 // console.log(theChartData)
    //  const dataTemp =  Object.keys(dataBLEAndKey).map((header:any, i: number) => {
    //   console.log(header+"header")
    //   return {header};
    // });
    // const templist = dataBLEAndKey.map((obj: any, i: number) => {
      
    //     Object.keys(obj).map((header:any, i: number) => {
    //         console.log(header+"header")
    //         return {header}
    //   };
    // });

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

  return (
    <div className="main">
      {/* <List bleData={bleData} wifiData={wifiData} isBleOrWifi={isBleOrWifi} /> */}
      <ChartDiv
        chartRef={chartRef}
        bleData={bleData}
        wifiData={wifiData}
        isBleOrWifi={isBleOrWifi}
        count={count}
        setCount={setCount}
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
        setDataAmount={setDataAmount}
          setYdata={setYdata}
          setDataSet={setDataSet}
          isBleOrWifi={isBleOrWifi}
          dataBLEAndKey={dataBLEAndKey}
          dataWifiAndKey={dataWifiAndKey}
          dataSet={dataSet}
          setLabels={setLabels}
          setChoseOne={setChoseOne}
          setWifiData={setWifiData}
          setBleData={setBleData}
          chosenDS={chosenDS}
          setselectedDS={setselectedDS}
          
        />
        
        <button onClick={(CSVdata) => handleDownloadToCSV(CSVdata)}>
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
