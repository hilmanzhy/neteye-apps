
'use client';

import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, BarChart, Bar } from 'recharts';

interface PerformanceChartsProps {
  filter: string;
}

export default function PerformanceCharts({ filter }: PerformanceChartsProps) {
  const [selectedChart, setSelectedChart] = useState<'ping' | 'speed' | 'uptime'>('ping');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');

  const pingData = [
    { time: '00:00', ping: 15, target: 20 },
    { time: '04:00', ping: 12, target: 20 },
    { time: '08:00', ping: 25, target: 20 },
    { time: '12:00', ping: 30, target: 20 },
    { time: '16:00', ping: 22, target: 20 },
    { time: '20:00', ping: 18, target: 20 },
    { time: '24:00', ping: 16, target: 20 }
  ];

  const speedData = [
    { time: '00:00', download: 85, upload: 45 },
    { time: '04:00', download: 92, upload: 48 },
    { time: '08:00', download: 78, upload: 42 },
    { time: '12:00', download: 65, upload: 35 },
    { time: '16:00', download: 88, upload: 46 },
    { time: '20:00', download: 95, upload: 52 },
    { time: '24:00', download: 90, upload: 49 }
  ];

  const uptimeData = [
    { region: 'Jakarta', uptime: 99.8 },
    { region: 'Surabaya', uptime: 98.5 },
    { region: 'Bandung', uptime: 99.2 },
    { region: 'Medan', uptime: 97.8 },
    { region: 'Makassar', uptime: 98.9 },
    { region: 'Bali', uptime: 99.5 }
  ];

  const renderChart = () => {
    switch (selectedChart) {
      case 'ping':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={pingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="ping" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} name="Ping (ms)" />
              <Line type="monotone" dataKey="target" stroke="#6b7280" strokeDasharray="3 3" name="Target" />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'speed':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={speedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="download" stroke="#3b82f6" strokeWidth={2} name="Download (Mbps)" />
              <Line type="monotone" dataKey="upload" stroke="#10b981" strokeWidth={2} name="Upload (Mbps)" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'uptime':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={uptimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis domain={[95, 100]} />
              <Tooltip />
              <Bar dataKey="uptime" fill="#8b5cf6" name="Uptime (%)" />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Performance Analytics</h2>
        <div className="flex gap-2">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as '24h' | '7d' | '30d')}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-white"
          >
            <option value="24h">24 Jam</option>
            <option value="7d">7 Hari</option>
            <option value="30d">30 Hari</option>
          </select>
        </div>
      </div>

      {/* Chart Type Selector */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setSelectedChart('ping')}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
            selectedChart === 'ping'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Rata-rata Ping
        </button>
        <button
          onClick={() => setSelectedChart('speed')}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
            selectedChart === 'speed'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Speed Test
        </button>
        <button
          onClick={() => setSelectedChart('uptime')}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
            selectedChart === 'uptime'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Uptime Regional
        </button>
      </div>

      {/* Chart */}
      <div className="mb-6">
        {renderChart()}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">18.5ms</div>
          <div className="text-sm text-gray-600">Avg Ping</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">85.2 Mbps</div>
          <div className="text-sm text-gray-600">Avg Download</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">45.7 Mbps</div>
          <div className="text-sm text-gray-600">Avg Upload</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">99.2%</div>
          <div className="text-sm text-gray-600">Avg Uptime</div>
        </div>
      </div>
    </div>
  );
}
