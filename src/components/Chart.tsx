import {useRef,useEffect,useState} from 'react'
import { Line , getElementAtEvent, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
ChartJS.register(zoomPlugin)


interface ChartProps{
    wifiBLE:boolean;
    wifiData:any;
    bleData:any;
}

function ChartDiv(props:ChartProps) {

  const {wifiBLE,bleData,wifiData} = props;

  const [min,setMin] = useState(-100);
  const [max,setMax] = useState(-65);


  const chartRef:any = useRef(null);

  
  

  return (

    <div className="chart" id="chartImg">
        <Line style={{ width: '100%', height: 100 , opacity:0.8,backgroundColor:"black"}} 
        ref={chartRef}  
        data={wifiBLE?wifiData:bleData}
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
                text: wifiBLE?"WIFI":"BLE",
              },
            },
            scales: {
              y: {
                type: 'linear',
                display: true,
                position: 'left',
                min: min,
                max: max,
                
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