import {useRef,useEffect,useState} from 'react'
import { Line , getElementAtEvent, Doughnut } from "react-chartjs-2";


interface ChartProps{
    wifiBLE:boolean;
    wifiData:any;
    bleData:any
}

function ChartDiv(props:ChartProps) {

  const {wifiBLE,bleData,wifiData} = props;

  const chartRef:any = useRef(null);

  console.log(wifiData);

  console.log(wifiData);
  
  

  return (

    <div className="chart" id="chartImg">
        <Line style={{ width: '100%', height: 500 , opacity:0.8}} 
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
                text: 'Chart.js Line Chart',
              },
            },
            scales: {
              y: {
                type: 'linear',
                display: true,
                position: 'left',
                min: -100,
                max: -60,
                
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