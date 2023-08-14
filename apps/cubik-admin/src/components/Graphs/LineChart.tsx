"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Center } from "@/utils/chakra";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const curveEnum = {
  SMOOTH: "smooth",
  STRAIGHT: "straight",
  STEPLINE: "stepline",
};

const xaxisType = {
  CATEGORY: "category",
  DATETIME: "datetime",
  NUMERIC: "numeric",
};

const LineChart = ({
  data,
  color,
  key,
}: {
  data: any;
  color: string;
  key: string;
}) => {
  const [chartData, setChartData] = useState({
    series: [{ name: "", data: [] }],
    options: {
      grid: { show: false, borderColor: "#1D1F1E80" },
      chart: {
        height: 100,
        width: 520,
        toolbar: {
          show: false,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
          },
        },
      },
      tooltip: {
        enabled: true,
        theme: "dark",
        followCursor: true,
        x: {
          show: false, // This hides the x-axis tooltip
        },
        custom: ({ series, seriesIndex, dataPointIndex, w }: any) => {
          const data = series[seriesIndex][dataPointIndex];
          const timestamp = w.globals.seriesX[seriesIndex][dataPointIndex];
          const date = new Date(timestamp)
            .toLocaleDateString(undefined, {
              day: "numeric",
              month: "long",
            })
            .replace(/\s\d{4}$/, ""); // Removes the year part

          return `
             <div class="arrow_box" style="display: flex; flex-direction: column; background-color: white; padding: 6px; align-items: center;">
               <div style="display: flex; justify-content: space-between;">
                 <span style="color: black;">${date}</span>
               </div>
               <div style="display: flex; justify-content: space-between;">
                 <span style="color: black; fontWeight: 600;"><strong>$${data}</strong></span>
               </div>
             </div>
           `;
        },
        onDatasetHover: {
          highlightDataSeries: true,
        },
        style: {
          size: 6,
          fillColor: "#000",
          strokeColor: color,
          radius: 4,
        },
      },
      stroke: {
        colors: [color],
        curve: curveEnum.SMOOTH,
        width: 3,
      },
      fill: {
        colors: [color],
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#141414"],
          shadeIntensity: 2,
          opacityFrom: 0,
          opacityTo: 0.6,
          stops: [0, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        show: false,
        // max: new Date(endDate).getTime(), // Set this to the future date till which you want the graph to extend
        axisTicks: {
          show: false,
          color: "#272929",
        },
        axisBorder: {
          show: false,
          color: "#272929",
        },
        tooltip: {
          enabled: false,
        },
        crosshairs: {
          show: false,
        },
        labels: {
          show: false,
          datetimeUTC: true,
          datetimeFormatter: {
            year: "yyyy",
            month: "MMM 'yy",
            day: "dd MMM",
            hour: "HH:mm",
          },
        },

        type: xaxisType.DATETIME,
      },
      yaxis: {
        show: false,
      },
      //  annotations: {
      //    xaxis: [
      //      {
      //        x: new Date(endDate).getTime(), // This sets the x position to today's date.
      //        borderColor: '#39B70D00', // Set the color of the line.
      //      },
      //    ],
      //    points: [
      //      {
      //        x: new Date(endDate).getTime(), // This sets the x position to today's date.
      //        y: findDonationOnDate(data, endDate), // This sets the y position (value) for today's date.
      //        marker: {
      //          size: 6,
      //          fillColor: '#000',
      //          strokeColor: '#39B70D',
      //          radius: 4,
      //        },
      //      },
      //    ],
      //  },
      responsive: [
        {
          breakpoint: 1200,
          options: {
            chart: {
              width: "180px",
              height: "100px",
            },
          },
        },
        {
          breakpoint: 992,
          options: {
            chart: {
              height: "100px",
              width: "180px",
            },
          },
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              height: "100px",
              width: "180px",
            },
          },
        },
        {
          breakpoint: 630,
          options: {
            chart: {
              height: "100px",
              width: "200px",
            },
          },
        },
        {
          breakpoint: 480,
          options: {
            chart: {
              height: "100px",
              width: "200px",
            },
          },
        },
      ],
    },
  });
  useEffect(() => {
    setChartData((prevState) => ({
      ...prevState,
      series: [{ name: "Funding", data }],
    }));
  }, [data]);

  return (
    <Center w={"full"} justifyContent={"start"} width="200px" height="120px">
      {typeof window !== "undefined" ? (
        <ReactApexChart
          key={key}
          padding={{ left: 0, right: 0 }}
          type="area"
          width={"200px"}
          height="120px"
          // @ts-ignore
          options={chartData.options}
          series={chartData.series}
        />
      ) : null}
    </Center>
  );
};

export default LineChart;
