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
import Form from "./Form";
import {getColors} from '../features/colors'
Chart.register(...registerables);


interface BarChartProps {
  dataSaved: any;
  keysBLE:Array<any>
  keysOfObj: Array<any>;
  keysWIFI: Array<any>;
  chartdata:any;
}



const BarChart = (props: BarChartProps) => {

  let { dataSaved, keysOfObj,keysBLE ,keysWIFI,chartdata} = props;


  
  // console.log(keysOfObj);
  
dataSaved.length = 500;


// console.log(dataSaved);

  let [CSVdata, setCSVdata] = useState(dataSaved);
  let [dataSetData,setdataSetsData] = useState("rssi_0")
  let [Label, setChosenLabel] = useState();
  let [dataWifi, setDataWifi] = useState<any>([]);
  let [dataBLE , setDataBLE] = useState<any>([]); 
  let [backgroundcolor, setBackGroundColor] = useState<any>([]);
  let [chartClicked, setChartClicked] = useState(false);
  let [years, setYears] = useState<any>({});
  let [choseYears, setChoseYears] = useState(false);
  const [wifiBLE,setWifiBLE] = useState(false)
  let [chartData, setChartData] = useState<any>();
  let [filteredData, setfilteredData] =useState<any>([]);
  const chartRef: any = useRef(null);

 
  
  
  const [wifidata, setwifidata] = useState<any>(chartdata.wifiData);
  const [bledata, setbledata] = useState<any>(chartdata.bleData);
  
  console.log(wifiBLE);
  

  // set colors by values
  useEffect(() => {
    (async () => {
      getColors(dataSaved).then((result) => {
        const colors = result.backGroundColor;
        colors.map((color:any) => {
         backgroundcolor.push(color) 
        })
         
         setBackGroundColor(colors)
       })
       
        
      //  setUserData
      //  console.log(result);
      //  const rssi = result.BLEData.rssi_0 * -1;
      //  const sec:any = "seconds"
      //  const newData = await createChartData(result.BLEData,sec,rssi)
      //  setUserData(newData);
       
    })();
  
    
  }, []);


       

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
    if(choseYears){
     chartData=filteredData[index]
    }else{
       chartData = CSVdata[index];
    }
    setChartData(chartData);
    // console.log(chartData);
  }



  function handleDownload(CSVdata: any) {
    console.log(wifidata.datasets[0].data);
    console.log(wifidata.labels);
   

    const dataTemp = wifidata.labels.map((year: any, i: number) => {
      return { mam: wifidata.datasets[0].data[i], Year: year };
    });

    console.log(dataTemp);

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
    console.log(link);
  }

  async function changeBLE(){
    setWifiBLE(!wifiBLE)

  }
 
  return (
    <>
      <div className="chart" id="chartImg">
        <Line 
          style={{ width: 500, height: 350 }}
          ref={chartRef}
          onClick={getChart}
          data={wifiBLE?wifidata:bledata}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
              },
              title: {
                display: true,
                text: 'Chart.js Line Chartsssssss',
              },
            },
          }}
        />
      
      </div>

      <button name="changeBLE" onClick={changeBLE}>{wifiBLE?"BLE":"WIFI"}</button>
      {/* <Form
        userData={userData}
        setYears={setYears}
        dataSaved={dataSaved}
        setChoseYears={setChoseYears}
        setfilteredData={setfilteredData}
      /> */}
      <Table
        chartClicked={chartClicked}
        chartData={chartData}
        keysOfObj={keysOfObj}
      />

      

      {/* </div>  */}
      {/* <CSVLink data={dataSaved}>Export CSV</CSVLink>; */}
      <button onClick={(CSVdata) => handleDownload(CSVdata)}>
        Download To CSV
      </button>
      <button onClick={handleDownloadToImg}>Download To Image</button>
    </>
  );
};

export default BarChart;
