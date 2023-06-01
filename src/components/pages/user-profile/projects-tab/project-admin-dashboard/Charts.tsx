/* eslint-disable no-unused-vars */
import { Center } from '@chakra-ui/react';
import { UserModel, Contribution } from '@prisma/client';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

export enum curveEnum {
  SMOOTH = 'smooth',
  STRAIGHT = 'straight',
  STEPLINE = 'stepline',
}

export enum xaxisType {
  CATEGORY = 'category',
  DATETIME = 'datetime',
  NUMERIC = 'numeric',
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
  let currentDate = start;
  const dates = [];

  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
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

export const FundingChart = ({
  data,
}: {
  data: (Contribution & {
    user: UserModel;
  })[];
}) => {
  const [chartData, setChartData] = React.useState<IChartData>({
    series: [{ name: '', data: [] }],
    options: {
      grid: { show: false },
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
      stroke: {
        colors: ['#1CEB68'],
        curve: curveEnum.SMOOTH,
        width: 2,
      },
      fill: {
        colors: ['#1CEB68'],
        type: 'gradient',
        gradient: {
          shade: 'dark',
          shadeIntensity: 1,
          opacityFrom: 0,
          opacityTo: 0.3,
          stops: [0, 90, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        show: false,
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: true,
        },
        crosshairs: {
          show: true,
        },
        labels: {
          show: false,
          datetimeUTC: true,
          datetimeFormatter: {
            year: 'yyyy',
            month: "MMM 'yy",
            day: 'dd MMM',
            hour: 'HH:mm',
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
      tooltip: {
        enabled: true,
        theme: 'dark',
        custom: function ({ series, seriesIndex, dataPointIndex }: any) {
          return (
            '<div class="arrow_box">' +
            '<span style="background-color: white; color: black; padding: 10px;">' +
            'Donation: ' +
            series[seriesIndex][dataPointIndex] +
            '$' +
            '</span>' +
            '</div>'
          );
        },
        style: {
          fontSize: '12px',
          shadow: '0px',
        },
        x: {
          show: false,
          format: 'dd MMM yyyy',
        },
        y: {
          show: false,
          formatter: function (
            value: any,
            { series, seriesIndex, dataPointIndex, w }: any
          ) {
            return value;
          },
        },
        marker: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 1200,
          options: {
            chart: {
              width: '420px',
              height: '100%',
            },
          },
        },
        {
          breakpoint: 992,
          options: {
            chart: {
              height: '100%',
              width: '620px',
            },
          },
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              height: '100%',
              width: '560px',
            },
          },
        },
        {
          breakpoint: 630,
          options: {
            chart: {
              height: '80%',
              width: '400px',
            },
          },
        },
        {
          breakpoint: 480,
          options: {
            chart: {
              height: '80%',
              width: '300px',
            },
          },
        },
      ],
    },
  });

  const distributeData = () => {
    const contributionsByDate: { [key: string]: number } = data.reduce(
      (acc: { [key: string]: number }, curr: ContributionWithUser) => {
        const date = new Date(curr.createdAt);
        date.setUTCHours(0, 0, 0, 0); // set the time to start of the day (midnight)
        const formattedDate = new Date(
          date.toISOString().split('T')[0]
        ).getTime(); // get the time in milliseconds without the milliseconds part
        if (acc[formattedDate]) {
          acc[formattedDate] += curr.currentTotal;
        } else {
          acc[formattedDate] = curr.currentTotal;
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
    const endDate = new Date();
    endDate.setUTCHours(23, 59, 59, 999); // set the time to end of the day
    const startDate = new Date();
    startDate.setUTCDate(endDate.getUTCDate() - 14);
    const dateRange = generateDateRange(startDate, endDate).map(
      (date) => new Date(date.toISOString().split('T')[0])
    );

    const dataMap = new Map();
    sortedData.forEach((item) => {
      const date = new Date(item.date);
      date.setUTCHours(0, 0, 0, 0); // set the time to start of the day (midnight)
      dataMap.set(
        new Date(date.toISOString().split('T')[0]).getTime(),
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
      series: [{ name: 'Donations', data: finalData }],
    }));
  };

  useEffect(() => {
    if (data) {
      distributeData();
    }
  }, [data]);

  return (
    <Center w={'full'} justifyContent={'start'}>
      {typeof window !== 'undefined' ? (
        <ReactApexChart
          padding={{ left: 0, right: 0 }}
          type="area"
          width={'520px'}
          height="100rem"
          options={chartData.options}
          series={chartData.series}
        />
      ) : null}
    </Center>
  );
};

export const VisitorsChart = ({
  data,
}: {
  data:
    | (Contribution & {
        user: UserModel;
      })[]
    | undefined;
}) => {
  const [chartData, setChartData] =
    React.useState<IChartContributorsAndVisitorsData>({
      series: [
        {
          name: 'Contributors',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          name: 'Viewers',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
      options: {
        grid: { show: false, padding: { left: -5, right: 0 } },
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
          theme: 'dark',
        },
        plotOptions: {
          bar: {
            borderRadius: 2.5,
            columnWidth: '90%',
            endingShape: 'rounded',
          },
        },
        xaxis: {
          show: true,
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: true,
            color: '#78909C',
            height: 1,
            width: '100%',
            offsetX: 0,
            offsetY: 0,
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
              year: 'yyyy',
              month: "MMM 'yy",
              day: 'dd MMM',
              hour: 'HH:mm',
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
        colors: ['#1CEB68', '#D6FFE5'],
        responsive: [
          {
            breakpoint: 1200,
            options: {
              chart: {
                width: '410px',
                height: '100%',
              },
            },
          },
          {
            breakpoint: 992,
            options: {
              chart: {
                height: '100%',
                width: '620px',
              },
            },
          },
          {
            breakpoint: 768,
            options: {
              chart: {
                height: '100%',
                width: '560px',
              },
            },
          },
          {
            breakpoint: 630,
            options: {
              chart: {
                height: '80%',
                width: '400px',
              },
            },
          },
          {
            breakpoint: 480,
            options: {
              chart: {
                height: '80%',
                width: '300px',
              },
            },
          },
        ],
      },
    });

  const distributeData = () => {
    const noOfContributorsByDate: { [key: string]: Set<string> } =
      data?.reduce(
        (acc: { [key: string]: Set<string> }, curr: ContributionWithUser) => {
          const date = new Date(curr.createdAt);
          date.setUTCHours(0, 0, 0, 0); // set the time to start of the day (midnight)
          const formattedDate = new Date(
            date.toISOString().split('T')[0]
          ).getTime(); // get the time in milliseconds without the milliseconds part
          if (acc[formattedDate]) {
            acc[formattedDate].add(curr.user.id); // Add unique contributor
          } else {
            acc[formattedDate] = new Set([curr.user.id]); // Start new set of unique contributors
          }
          return acc;
        },
        {}
      ) || {};

    const sortedData: { date: number; total: number }[] = Object.entries(
      noOfContributorsByDate
    ).map(([date, totalSet]) => ({
      date: Number(date),
      total: totalSet.size, // Use the size of the set for the total number of contributors
    }));

    sortedData.sort((a, b) => a.date - b.date);

    const endDate = new Date();
    endDate.setUTCHours(23, 59, 59, 999); // set the time to end of the day
    const startDate = new Date();
    startDate.setUTCDate(endDate.getUTCDate() - 14);
    const dateRange = generateDateRange(startDate, endDate).map(
      (date) => new Date(date.toISOString().split('T')[0])
    );

    const dataMap = new Map();
    sortedData.forEach((item) => {
      const date = new Date(item.date);
      date.setUTCHours(0, 0, 0, 0); // set the time to start of the day (midnight)
      dataMap.set(
        new Date(date.toISOString().split('T')[0]).getTime(),
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
          name: 'Contributors',
          data: finalData.map((data) => data[1]),
        },
        {
          name: 'Viewers',
          data: Array.from({ length: 15 }, () => Math.floor(Math.random() * 6)), // todo: remove this and add real data
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
    <Center w={'full'} justifyContent={'start'}>
      {typeof window !== 'undefined' ? (
        <ReactApexChart
          padding={{ left: 0, right: 0 }}
          type="bar"
          width={'560px'}
          height="100rem"
          options={chartData.options}
          series={chartData.series}
        />
      ) : null}
    </Center>
  );
};
