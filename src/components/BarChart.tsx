import { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import createChartData,{chosenLineChart} from "../features/chartData";
import "../style/style.scss";
import ChangeChartData from "./ChangeChartData";
import ChartDiv from "./Chart";



interface BarChartProps {
  theChartData: any;
  dataWifiAndKey: Array<string>;
  dataBLEAndKey: Array<string>; 
  dataAmount:number;
  setDataAmount:Function;
  count:number;
  setCount:Function; 
  
}

const BarChart = (props: BarChartProps) => {

  const { theChartData, dataWifiAndKey, dataBLEAndKey,dataAmount,setDataAmount,count,setCount } = props;

  const [isBleOrWifi, setisBleOrWifi] = useState(false)
  const [labels, setLabels] = useState([])
  const [wifiData, setWifiData] = useState<any>(theChartData.wifiData)
  const [bleData, setBleData] = useState<any>(theChartData.bleData)
  const [choseOne,setChoseOne] = useState(false)
  const [Ydata, setYdata] = useState("rssi_0")
  const [dataSet, setDataSet] = useState("event_id")
  const [chosenDS , setChosenDateSet] = useState<any>([]);
  const [bleList,setBleList] = useState<any>([])
  const [wifiList,setWifiList] = useState<any>([])
  const chartRef: any = useRef(null)

  const [selectedDS, setselectedDS] = useState<any>({})


 //-----Presenting the chart either by the users single dataset choice or by the users filter presenting all the data   --------
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
      setBleList(ble.dataSetList)
      setWifiList(wifi.dataSetList)
       if(isBleOrWifi){
        const selectedDS = wifi.dataSetList
        
        setChosenDateSet(selectedDS)
      }else{
        const selectedDS = ble.dataSetList
        
        setChosenDateSet(selectedDS)
      }
      setWifiData(wifiData);
      setBleData(bleData);
    }
    
    
    
  }, [Ydata, dataSet, isBleOrWifi, labels,selectedDS,count,dataAmount])


 
  function handleDownloadToCSV(CSVdata: any) {
    let list:any = []
    let dataByType:any={}
    let dataForCSV:any = []
    
    if(isBleOrWifi){ 
      list = wifiList;
      dataByType=wifiData
    }else{
      list = bleList;
      dataByType=bleData
    }
    
    list.forEach((obj: any, i: number) => { 
      obj.objArray.map((dataSetObj:any,i:number) => {
        let tempObj:any = {}  
        tempObj = {dataSet: obj.chosendataSet, yaxios: dataSetObj[`${Ydata}`] ,timestamp : dataByType.labels[i] };
        dataForCSV = [...dataForCSV,tempObj]
      })
      
    });

    console.log(dataForCSV)
console.log(Ydata)
console.log(dataSet)

  const templist = dataForCSV.map((obj: any, i: number) => {
   
    return {
      Type: isBleOrWifi?"WIFI":"BLE",
      DataSet: obj.dataSet,
      Ydata: obj.yaxios,
      TimeStamp: obj.timestamp
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

  //-----The button to switch between Ble and wifi --------
  async function changeDataType() {
    setisBleOrWifi(!isBleOrWifi);
  }

  return (
    <div className="main">
      <ChartDiv
        chartRef={chartRef}
        bleData={bleData}
        wifiData={wifiData}
        isBleOrWifi={isBleOrWifi}
        count={count}
        setCount={setCount}
        dataAmount={dataAmount}
      />
      <div className="main_filterChart">
        <button
          className="main_changeDataType"
          name="changeDataType"
          onClick={changeDataType}
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



export default BarChart;
