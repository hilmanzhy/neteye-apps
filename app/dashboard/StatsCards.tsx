
'use client';

import { useState, useEffect } from 'react';

interface StatsCardsProps {
  filter: string;
}

export default function StatsCards({ filter }: StatsCardsProps) {
  const [stats, setStats] = useState({
    totalDevices: 385,
    healthyDevices: 342,
    problemDevices: 43,
    avgPing: 18.5,
    avgDownload: 85.2,
    avgUpload: 45.7,
    slaUptime: 99.2
  });

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        avgPing: prev.avgPing + (Math.random() - 0.5) * 2,
        avgDownload: prev.avgDownload + (Math.random() - 0.5) * 5,
        avgUpload: prev.avgUpload + (Math.random() - 0.5) * 3,
        problemDevices: prev.problemDevices + Math.floor(Math.random() * 3 - 1)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      title: 'Total Device',
      value: stats.totalDevices.toLocaleString(),
      icon: 'ri-device-line',
      color: 'bg-blue-500',
      trend: '+2.5%',
      trendUp: true
    },
    {
      title: 'Device Sehat',
      value: stats.healthyDevices.toLocaleString(),
      icon: 'ri-check-line',
      color: 'bg-green-500',
      trend: '+1.2%',
      trendUp: true
    },
    {
      title: 'Device Bermasalah',
      value: stats.problemDevices.toLocaleString(),
      icon: 'ri-error-warning-line',
      color: 'bg-red-500',
      trend: '-0.8%',
      trendUp: false
    },
    {
      title: 'Rata-rata Ping',
      value: `${stats.avgPing.toFixed(1)}ms`,
      icon: 'ri-pulse-line',
      color: 'bg-orange-500',
      trend: '-2.1%',
      trendUp: false
    },
    {
      title: 'Download Speed',
      value: `${stats.avgDownload.toFixed(1)} Mbps`,
      icon: 'ri-download-line',
      color: 'bg-purple-500',
      trend: '+5.3%',
      trendUp: true
    },
    {
      title: 'Upload Speed',
      value: `${stats.avgUpload.toFixed(1)} Mbps`,
      icon: 'ri-upload-line',
      color: 'bg-indigo-500',
      trend: '+3.7%',
      trendUp: true
    },
    {
      title: 'SLA Uptime',
      value: `${stats.slaUptime.toFixed(1)}%`,
      icon: 'ri-shield-check-line',
      color: 'bg-teal-500',
      trend: '+0.1%',
      trendUp: true
    },
    {
      title: 'Gangguan Hari Ini',
      value: '12',
      icon: 'ri-alert-line',
      color: 'bg-yellow-500',
      trend: '-25%',
      trendUp: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
              <i className={`${card.icon} text-white text-xl`}></i>
            </div>
            <div className={`text-sm font-medium px-2 py-1 rounded ${
              card.trendUp ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
            }`}>
              {card.trend}
            </div>
          </div>
          
          <div className="mb-2">
            <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
          </div>
          
          <div className="text-sm text-gray-600">
            {card.title}
          </div>
        </div>
      ))}
    </div>
  );
}
