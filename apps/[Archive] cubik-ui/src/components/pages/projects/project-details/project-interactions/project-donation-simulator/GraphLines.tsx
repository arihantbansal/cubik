import { Tooltip } from "@chakra-ui/react";
import * as d3 from "d3";
import React from "react";
import FlipNumbers from "react-flip-numbers";

interface GraphLineProps {
  width: number;
  height: number;
  data: { donation: number; additionalMatch: number }[];
  availableMatch: number;
  maximumDonationValue: number;
  donationAmount: number;
}

export const GraphLine: React.FC<GraphLineProps> = ({
  width,
  height,
  data,
  availableMatch,
  maximumDonationValue,
  donationAmount,
}) => {
  const margin = {
    top: 10,
    left: 10,
    bottom: -1,
    right: 10,
  };

  const exponent = 2;
  const xScale = d3
    .scaleLinear()
    .domain([0, Math.pow(maximumDonationValue, exponent)])
    .range([0, width - margin.left - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain(
      (d3.extent(data, (d) => d.additionalMatch) as [number, number]) || [0, 1] // Change here
    )
    .range([height - margin.bottom, margin.top]);

  const line = d3
    .line<{ donation: number; additionalMatch: number }>()
    .x((d) => xScale(Math.pow(d.donation, exponent)))
    .y((d) => yScale(d.additionalMatch));

  const dPath = line(data) as string | undefined;

  const markerX = xScale(Math.round(Math.pow(donationAmount, exponent)));
  const markerY = yScale(
    data.find((d) => Math.abs(d.donation - donationAmount) < 0.1)
      ?.additionalMatch ?? 0
  ); // Get the additionalMatch value at the marker point

  const markerData = data.find(
    (d) => Math.abs(d.donation - donationAmount) < 0.1
  );
  const markerAdditionalMatch: number = markerData?.additionalMatch ?? 0;
  const markerInputValue: number = markerData?.donation ?? 0;

  return (
    <>
      <line
        x1={markerX}
        x2={markerX}
        y1={markerY}
        y2={height}
        stroke="#636666"
        strokeDasharray="2"
        strokeWidth="0.2"
      />
      <path d={dPath} fill="none" stroke="#2775CA" strokeWidth="1.2" />
      <Tooltip
        isOpen={true}
        background={"transparent"}
        label={
          <FlipNumbers
            height={16}
            width={12}
            color="white"
            // numberStyles={{
            //   fontWeight: 'bold',
            //   fontSize: '22px',
            // }}
            play
            perspective={300}
            numbers={"$" + markerAdditionalMatch.toFixed(1)}
          />
        }
        color="#fff"
        fontWeight={"700"}
        fontSize="16px"
        placement="right"
      >
        <svg
          x={markerX - 4}
          y={markerY - 4}
          width="8"
          height="8"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_789_9405)">
            <path
              d="M5 10C7.77085 10 10 7.77085 10 5C10 2.22915 7.77085 0 5 0C2.22915 0 0 2.22915 0 5C0 7.77085 2.22915 10 5 10Z"
              fill="#2775CA"
            />
            <path
              d="M6.37515 5.79102C6.37515 5.06187 5.93765 4.81187 5.06265 4.70772C4.43765 4.62437 4.31265 4.45772 4.31265 4.16602C4.31265 3.87432 4.521 3.68687 4.93765 3.68687C5.31265 3.68687 5.521 3.81187 5.62515 4.12437C5.646 4.18687 5.7085 4.22852 5.771 4.22852H6.1043C6.18765 4.22852 6.25015 4.16602 6.25015 4.08272V4.06187C6.1668 3.60352 5.7918 3.24937 5.31265 3.20772V2.70772C5.31265 2.62437 5.25015 2.56187 5.146 2.54102H4.8335C4.75015 2.54102 4.68765 2.60352 4.6668 2.70772V3.18687C4.0418 3.27022 3.646 3.68687 3.646 4.20772C3.646 4.89522 4.06265 5.16602 4.93765 5.27022C5.521 5.37437 5.7085 5.49937 5.7085 5.83272C5.7085 6.16607 5.4168 6.39522 5.021 6.39522C4.4793 6.39522 4.2918 6.16602 4.2293 5.85352C4.2085 5.77022 4.146 5.72852 4.0835 5.72852H3.7293C3.646 5.72852 3.5835 5.79102 3.5835 5.87437V5.89522C3.6668 6.41602 4.00015 6.79102 4.68765 6.89522V7.39522C4.68765 7.47852 4.75015 7.54102 4.8543 7.56187H5.1668C5.25015 7.56187 5.31265 7.49937 5.3335 7.39522V6.89522C5.9585 6.79102 6.37515 6.35352 6.37515 5.79102Z"
              fill="white"
            />
            <path
              d="M3.93742 7.97978C2.31242 7.39648 1.47907 5.58398 2.08327 3.97978C2.39577 3.10478 3.08327 2.43813 3.93742 2.12563C4.02077 2.08398 4.06242 2.02148 4.06242 1.91728V1.62563C4.06242 1.54228 4.02077 1.47978 3.93742 1.45898C3.91657 1.45898 3.87492 1.45898 3.85407 1.47978C1.87492 2.10478 0.791568 4.20898 1.41657 6.18813C1.79157 7.35478 2.68742 8.25063 3.85407 8.62563C3.93742 8.66728 4.02077 8.62563 4.04157 8.54228C4.06242 8.52148 4.06242 8.50063 4.06242 8.45898V8.16728C4.06242 8.10478 3.99992 8.02148 3.93742 7.97978ZM6.14577 1.47978C6.06242 1.43813 5.97907 1.47978 5.95827 1.56313C5.93742 1.58398 5.93742 1.60478 5.93742 1.64648V1.93813C5.93742 2.02148 5.99992 2.10478 6.06242 2.14648C7.68742 2.72978 8.52077 4.54228 7.91657 6.14648C7.60407 7.02148 6.91657 7.68813 6.06242 8.00063C5.97907 8.04228 5.93742 8.10478 5.93742 8.20898V8.50063C5.93742 8.58398 5.97907 8.64648 6.06242 8.66728C6.08327 8.66728 6.12492 8.66728 6.14577 8.64648C8.12492 8.02148 9.20827 5.91728 8.58327 3.93813C8.20827 2.75063 7.29157 1.85478 6.14577 1.47978Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_789_9405">
              <rect width="10" height="10" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Tooltip>
    </>
  );
};
