import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Typography } from "@mui/material";

interface MemoryPoint {
  time: string;
  used: number;
}

const MemoryChart = ({ data }: { data: MemoryPoint[] }) => {
  if (!data || data.length === 0) {
    return <Typography>尚無資料</Typography>;
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        記憶體使用量 (GB)
      </Typography>
      <LineChart
        xAxis={[{ scaleType: "point", data: data.map((d) => d.time) }]}
        series={[{ data: data.map((d) => d.used), label: "Used Memory" }]}
        width={800}
        height={300}
      />
    </>
  );
};

export default MemoryChart;
