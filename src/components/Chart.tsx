import { useRef, useEffect, useState } from "react";
import { Line, getElementAtEvent, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
ChartJS.register(zoomPlugin);

interface ChartProps {
  isBleOrWifi: boolean;
  wifiData: any;
  bleData: any;
}

function ChartDiv(props: ChartProps) {
  const { isBleOrWifi, bleData, wifiData } = props;

  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const chartRef: any = useRef(null);

  useEffect(() => {

      if (isBleOrWifi) {
        selectMinMax(wifiData);
      } else {
       selectMinMax(bleData);
        
      }
      
    
  },);



  function selectMinMax(list:any) {

    
    let lowest = Math.max(...list.datasets[0].data);
    let highest= Math.min(...list.datasets[0].data);

    list.datasets.map((dataSet: any) => {

      const tempMin = Math.min(...dataSet.data);
      if(lowest > tempMin) lowest = tempMin
      const tempMax = Math.max(...dataSet.data);
      if(highest < tempMax) highest = tempMax
    });
    
    
    
    
    setMin(lowest - 2);
    setMax(highest + 2);
  }

  return (
    <div className="chart" id="chartImg">
      <Line
        style={{
          width: "100%",
          height: 100,
          opacity: 0.8,
          backgroundColor: "black",
        }}
        ref={chartRef}
        data={isBleOrWifi ? wifiData : bleData}
        options={{
          responsive: true,
          interaction: {
            mode: "index",
          },
          plugins: {
            legend: {
              position: "right" as const,
            },
            title: {
              display: true,
              text: isBleOrWifi ? "WIFI" : "BLE",
            },
          },
          scales: {
            y: {
              type: "linear",
              display: true,
              position: "left",
              min: min,
              max: max,

              grid: {
                borderColor: "blue",
              },
            },
            // grid line settings
          },
        }}
      />
    </div>
  );
}

export default ChartDiv;
