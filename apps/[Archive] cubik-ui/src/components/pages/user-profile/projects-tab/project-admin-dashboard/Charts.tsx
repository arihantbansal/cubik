/* eslint-disable no-unused-vars */
import { Center } from "@chakra-ui/layout";
import { Contribution, UserModel } from "@cubik/database";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { getProjectContributorsType } from "~/types/contribution";
import { formateDateInMonths } from "~/utils/formatDates";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export enum curveEnum {
  SMOOTH = "smooth",
  STRAIGHT = "straight",
  STEPLINE = "stepline",
}

export enum xaxisType {
  CATEGORY = "category",
  DATETIME = "datetime",
  NUMERIC = "numeric",
}

type propsType = {
  lastSixMonths: {
    xp: number;
    monthYear: string;
  }[];
  graphColor: string[];
};

type ChartDataType = {
  series: {
    name: string;
    data: number[][];
  }[];
  options: any; // replace 'any' with your options type
};

export interface IData {
  createdAt: string;
  currentTotal: number;
}

interface IChartSeries {
  name: string;
  data: [number, number][];
}

interface IChartData {
  series: IChartSeries[];
  options: any; // replace any with the appropriate type for your chart options
}

interface IContributorsAndVisitorsChartSeries {
  name: string;
  data: any;
}

interface IChartContributorsAndVisitorsData {
  series: IContributorsAndVisitorsChartSeries[];
  options: any; // replace 'any' with your options type
}

interface IFundingChartProps {
  data: IData[];
}

type ContributionWithUser = Contribution & {
  user: UserModel;
};

const generateDateRange = (start: Date, end: Date): Date[] => {
  let currentDate = new Date(start); // Create a new Date object
  const dates = [];

  while (currentDate <= end) {
    dates.push(new Date(currentDate)); // Push a new Date object to the array
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1)); // Create a new Date object for the next day
  }
  return dates;
};

const generateLast15Days = () => {
  const dates = Array.from({ length: 16 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.getTime();
  });
  return dates.reverse();
};

const findDonationOnDate = (data: getProjectContributorsType[], date: Date) => {
  const donation = data.find((item) => {});
  return donation ? donation.usdTotal : 0;
};

export const FundingChart = ({
  data,
  startDate,
  endDate,
}: {
  data: getProjectContributorsType[];
  startDate: Date;
  endDate: Date;
}) => {
  const [chartData, setChartData] = React.useState<IChartData>({
    series: [{ name: "", data: [] }],
    options: {
      grid: { show: true, borderColor: "#1D1F1E80" },
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
          strokeColor: "#1CEB68",
          radius: 4,
        },
      },
      stroke: {
        colors: ["#1CEB68"],
        curve: curveEnum.SMOOTH,
        width: 2,
      },
      fill: {
        colors: ["#1CEB68"],
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#141414"],
          shadeIntensity: 2,
          opacityFrom: 0,
          opacityTo: 0.5,
          stops: [0, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        show: false,
        max: new Date(endDate).getTime(), // Set this to the future date till which you want the graph to extend
        axisTicks: {
          show: true,
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
      //        borderColor: '#1CEB6800', // Set the color of the line.
      //      },
      //    ],
      //    points: [
      //      {
      //        x: new Date(endDate).getTime(), // This sets the x position to today's date.
      //        y: findDonationOnDate(data, endDate), // This sets the y position (value) for today's date.
      //        marker: {
      //          size: 6,
      //          fillColor: '#000',
      //          strokeColor: '#1CEB68',
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
              width: "420px",
              height: "100%",
            },
          },
        },
        {
          breakpoint: 992,
          options: {
            chart: {
              height: "100%",
              width: "620px",
            },
          },
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              height: "100%",
              width: "560px",
            },
          },
        },
        {
          breakpoint: 630,
          options: {
            chart: {
              height: "80%",
              width: "400px",
            },
          },
        },
        {
          breakpoint: 480,
          options: {
            chart: {
              height: "80%",
              width: "300px",
            },
          },
        },
      ],
    },
  });

  const distributeData = () => {
    const contributionsByDate: { [key: string]: number } = data.reduce(
      (acc: { [key: string]: number }, curr) => {
        const date = new Date(curr.createdAt);
        date.setUTCHours(0, 0, 0, 0); // set the time to start of the day (midnight)
        const formattedDate = date.getTime(); // get the time in milliseconds without the milliseconds part
        if (acc[formattedDate]) {
          acc[formattedDate] += curr.usdTotal;
        } else {
          acc[formattedDate] = curr.usdTotal;
        }
        return acc;
      },
      {}
    );

    const sortedData: { date: number; total: number }[] = Object.entries(
      contributionsByDate
    ).map(([date, total]) => ({
      date: Number(date),
      total: Number(total),
    }));

    sortedData.sort((a, b) => a.date - b.date);
    const dateRange = generateDateRange(startDate, endDate).map(
      (date) => new Date(date.toISOString().split("T")[0])
    );
    const dataMap = new Map();
    sortedData.forEach((item) => {
      const date = new Date(item.date);
      date.setUTCHours(0, 0, 0, 0); // set the time to start of the day (midnight)
      dataMap.set(
        new Date(date.toISOString().split("T")[0]).getTime(),
        item.total
      ); // use the time in milliseconds as the key
    });

    const finalData: [number, number][] = dateRange.map((date) => {
      const time = date.getTime();
      const total = dataMap.get(time) || 0;
      return [time, parseFloat(total.toFixed(2))];
    });

    setChartData((prevState: IChartData) => ({
      ...prevState,
      series: [{ name: "Donations", data: finalData }],
    }));
  };

  useEffect(() => {
    if (data) {
      distributeData();
    }
  }, [data]);

  return (
    <Center w={"full"} justifyContent={"start"}>
      {typeof window !== "undefined" ? (
        <ReactApexChart
          padding={{ left: 0, right: 0 }}
          type="area"
          width={"520px"}
          height="150rem"
          options={chartData.options}
          series={chartData.series}
        />
      ) : null}
    </Center>
  );
};

export const VisitorsChart = ({
  data,
  startDate,
  endDate,
}: {
  data: getProjectContributorsType[];
  startDate: Date;
  endDate: Date;
}) => {
  const [chartData, setChartData] =
    React.useState<IChartContributorsAndVisitorsData>({
      series: [
        {
          name: "Contributors",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          name: "Viewers",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
      options: {
        grid: {
          show: true,
          borderColor: "#1D1F1E80",
        },
        chart: {
          height: 100,
          width: 510,
          stacked: true,
          sparkline: {
            enabled: true,
          },
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
                  <span style="color: black; fontWeight: 600;"><strong>${data}</strong></span>
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
            strokeColor: "#1CEB68",
            radius: 4,
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 2.5,
            columnWidth: "90%",
            endingShape: "rounded",
            borderRadiusApplication: "around",
            borderRadiusWhenStacked: "first",
          },
        },
        xaxis: {
          show: true,
          max: new Date().getTime(), // Set this to the future date till which you want the graph to extend
          axisTicks: {
            show: true,
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
          categories: generateLast15Days(),
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
          labels: {
            show: false,
            offsetX: -10,
          },
        },
        colors: ["#1CEB68", "#D6FFE5"],
        responsive: [
          {
            breakpoint: 1200,
            options: {
              chart: {
                width: "410px",
                height: "100%",
              },
            },
          },
          {
            breakpoint: 992,
            options: {
              chart: {
                height: "100%",
                width: "620px",
              },
            },
          },
          {
            breakpoint: 768,
            options: {
              chart: {
                height: "100%",
                width: "560px",
              },
            },
          },
          {
            breakpoint: 630,
            options: {
              chart: {
                height: "80%",
                width: "400px",
              },
            },
          },
          {
            breakpoint: 480,
            options: {
              chart: {
                height: "80%",
                width: "300px",
              },
            },
          },
        ],
      },
    });

  const distributeData = () => {
    const noOfContributorsByDate: { [key: string]: Set<string> } =
      data?.reduce((acc: { [key: string]: Set<string> }, curr) => {
        const date = new Date(curr.createdAt);
        date.setUTCHours(0, 0, 0, 0); // set the time to start of the day (midnight)
        const formattedDate = new Date(
          date.toISOString().split("T")[0]
        ).getTime(); // get the time in milliseconds without the milliseconds part
        if (acc[formattedDate]) {
          acc[formattedDate].add(curr.user.id); // Add unique contributor
        } else {
          acc[formattedDate] = new Set([curr.user.id]); // Start new set of unique contributors
        }
        return acc;
      }, {}) || {};

    const sortedData: { date: number; total: number }[] = Object.entries(
      noOfContributorsByDate
    ).map(([date, totalSet]) => ({
      date: Number(date),
      total: totalSet.size, // Use the size of the set for the total number of contributors
    }));

    sortedData.sort((a, b) => a.date - b.date);

    const dateRange = generateDateRange(startDate, endDate).map(
      (date) => new Date(date.toISOString().split("T")[0])
    );

    const dataMap = new Map();
    sortedData.forEach((item) => {
      const date = new Date(item.date);
      date.setUTCHours(0, 0, 0, 0); // set the time to start of the day (midnight)
      dataMap.set(
        new Date(date.toISOString().split("T")[0]).getTime(),
        item.total
      ); // use the time in milliseconds as the key
    });

    const finalData: [number, number][] = dateRange.map((date) => {
      const time = date.getTime();
      const total = dataMap.get(time) || 0;
      return [time, parseFloat(total.toFixed(2))];
    });

    setChartData((prevState: IChartContributorsAndVisitorsData) => ({
      ...prevState,
      series: [
        {
          name: "Contributors",
          data: finalData.map((data) => data[1]),
        },
        {
          name: "Viewers",
          //  data: Array.from({ length: 15 }, () => Math.floor(Math.random() * 6)), // todo: remove this and add real data
          data: Array.from({ length: 15 }, () => 0), // todo: remove this and add real data
        },
      ],
    }));
  };

  useEffect(() => {
    if (data) {
      distributeData();
    }
  }, [data]);

  return (
    <Center w={"full"} justifyContent={"start"}>
      {typeof window !== "undefined" ? (
        <ReactApexChart
          padding={{ left: 0, right: 0 }}
          type="bar"
          width={"520px"}
          height="150rem"
          options={chartData.options}
          series={chartData.series}
        />
      ) : null}
    </Center>
  );
};
