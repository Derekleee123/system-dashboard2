// 文件：client/src/App.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import MemoryChart from "./components/MemoryChart";

interface SystemData {
  cpuLoad: number;
  memory: {
    total: number;
    free: number;
  };
  disk: {
    total: number;
    used: number;
  };
  uptime: number;
}

function App() {
  const [data, setData] = useState<SystemData | null>(null);
  const [loading, setLoading] = useState(true);
  const [memoryHistory, setMemoryHistory] = useState<
    { time: string; used: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<SystemData>(
          "http://localhost:3001/api/system"
        );
        setData(res.data);

        const usedMemory = res.data.memory.total - res.data.memory.free;
        const time = new Date().toLocaleTimeString();

        setMemoryHistory((prev) => {
          const next = [...prev, { time, used: usedMemory / 1e9 }];
          return next.slice(-20);
        });
      } catch (err) {
        console.error("Error fetching system data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) return <CircularProgress sx={{ m: 4 }} />;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        系統監控儀表板
      </Typography>

      <Grid container spacing={2} sx={{ my: 2 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">CPU 核心數</Typography>
            <Typography>{data.cpuLoad}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">記憶體</Typography>
            <Typography variant="body2">
              總量: {(data.memory.total / 1e9).toFixed(2)} GB
            </Typography>
            <Typography variant="body2">
              可用: {(data.memory.free / 1e9).toFixed(2)} GB
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">磁碟</Typography>
            <Typography variant="body2">
              總量: {(data.disk.total / 1e9).toFixed(2)} GB
            </Typography>
            <Typography variant="body2">
              已用: {(data.disk.used / 1e9).toFixed(2)} GB
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">系統運行時間</Typography>
            <Typography variant="body2">
              {(data.uptime / 60).toFixed(1)} 分鐘
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Box sx={{ my: 4 }}>
        <MemoryChart data={memoryHistory} />
      </Box>
    </Container>
  );
}

export default App;
