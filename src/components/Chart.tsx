import { useRef, useEffect, useState } from "react";
// import { Line , getElementAtEvent, Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS } from 'chart.js';
// import {Chart,registerables} from 'chart.js'
// Chart.register(...registerables)

// import zoomPlugin from 'chartjs-plugin-zoom';
// ChartJS.register(zoomPlugin)

///////v4 -in order to improve performance and maintainability
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  registerables,
} from "chart.js";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  ...registerables
);

interface ChartProps {
  isBleOrWifi: boolean;
  wifiData: any;
  bleData: any;
  chartRef: any;
}

function ChartDiv(props: ChartProps) {
  const { isBleOrWifi, bleData, wifiData, chartRef } = props;
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);

  useEffect(() => {
    if (isBleOrWifi) {
      selectMinMax(wifiData);
    } else {
      selectMinMax(bleData);
    }
  });

  function selectMinMax(list: any) {
    let lowest = Math.max(...list.datasets[0].data);
    let highest = Math.min(...list.datasets[0].data);

    list.datasets.map((dataSet: any) => {
      const tempMin = Math.min(...dataSet.data);
      if (lowest > tempMin) lowest = tempMin;
      const tempMax = Math.max(...dataSet.data);
      if (highest < tempMax) highest = tempMax;
    });

    setMin(lowest - 2);
    setMax(highest + 2);
  }

  return (
    <div className="chart" id="chartImg">
      <Chart
        type="line"
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
