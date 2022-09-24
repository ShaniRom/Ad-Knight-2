import {useRef,useEffect,useState} from 'react'
import { Line , getElementAtEvent, Doughnut } from "react-chartjs-2";


interface ChartProps{
    isBleOrWifi:boolean;
    wifiData:any;
    bleData:any;
    chartRef:any
}

function ChartDiv(props:ChartProps) {

  const {isBleOrWifi,bleData,wifiData,chartRef} = props;

  const [min,setMin] = useState(0);
  const [max,setMax] = useState(0);


  

  console.log(wifiData);
  
  

  return (

    <div className="chart" id="chartImg">
        <Line style={{ width: '95%', height: 500 , opacity:0.8,backgroundColor:"black"}} 
        ref={chartRef}  
        data={isBleOrWifi?wifiData:bleData}
          options={{
            responsive: true,
            interaction: {
              mode: 'index',
            },
            plugins: {
              legend: {
                position: 'right' as const,
              },
              title: {
                display: true,
                text: 'Chart.js Line Chart',
              },
            },
            scales: {
              y: {
                type: 'linear',
                display: true,
                position: 'left',
                min: -100,
                max: 20,
                
                grid: {
                  borderColor: 'blue', 
                },
              },
                // grid line settings
              },
            }}
        />
        
      
      </div>
  )
}

export default ChartDiv