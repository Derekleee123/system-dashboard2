const express = require('express');
const cors = require('cors');
const os = require('os');
const si = require('systeminformation'); // 新增

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/system', async (req, res) => {
  try {
    const cpus = os.cpus();
    const memory = {
      total: os.totalmem(),
      free: os.freemem(),
    };
    const uptime = os.uptime();

    // 取得磁碟資訊
    const diskData = await si.fsSize();
    const mainDisk = diskData[0] || { size: 0, used: 0 };

    const disk = {
      total: mainDisk.size,
      used: mainDisk.used,
    };

    res.json({
      cpuLoad: cpus.length,
      memory,
      uptime,
      disk,
    });
  } catch (error) {
    console.error('系統資訊取得失敗:', error);
    res.status(500).json({ error: '系統資訊取得失敗' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
