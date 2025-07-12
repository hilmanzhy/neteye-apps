
'use client';

import { useState } from 'react';

export default function AlertsSection() {
  const [alerts] = useState([
    {
      id: '1',
      type: 'critical',
      title: 'ATM BNI Kemang Offline',
      location: 'Jakarta Selatan',
      time: '2 menit lalu',
      description: 'Koneksi terputus total'
    },
    {
      id: '2',
      type: 'warning',
      title: 'ISP Node Bandung Slow',
      location: 'Bandung',
      time: '5 menit lalu',
      description: 'Ping tinggi 150ms'
    },
    {
      id: '3',
      type: 'info',
      title: 'Maintenance Selesai',
      location: 'Surabaya',
      time: '15 menit lalu',
      description: 'ISP Node kembali normal'
    },
    {
      id: '4',
      type: 'critical',
      title: 'Multiple ATM Down',
      location: 'Medan',
      time: '20 menit lalu',
      description: '5 ATM tidak terhubung'
    },
    {
      id: '5',
      type: 'warning',
      title: 'High Jitter Detected',
      location: 'Yogyakarta',
      time: '25 menit lalu',
      description: 'Jitter 45ms pada ISP'
    }
  ]);

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-yellow-500 bg-yellow-50';
      case 'info': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return 'ri-alarm-warning-line text-red-500';
      case 'warning': return 'ri-error-warning-line text-yellow-500';
      case 'info': return 'ri-information-line text-blue-500';
      default: return 'ri-notification-line text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Notifikasi & Alert</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800">
          Lihat Semua
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border-l-4 p-4 rounded-r-lg ${getAlertColor(alert.type)} hover:shadow-md transition-shadow cursor-pointer`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className={getAlertIcon(alert.type)}></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">{alert.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <i className="ri-map-pin-line"></i>
                      {alert.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="ri-time-line"></i>
                      {alert.time}
                    </span>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 ml-2">
                <i className="ri-more-2-line"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3">
            <div className="text-lg font-bold text-red-600">8</div>
            <div className="text-xs text-gray-600">Critical</div>
          </div>
          <div className="p-3">
            <div className="text-lg font-bold text-yellow-600">15</div>
            <div className="text-xs text-gray-600">Warning</div>
          </div>
          <div className="p-3">
            <div className="text-lg font-bold text-blue-600">32</div>
            <div className="text-xs text-gray-600">Info</div>
          </div>
        </div>
      </div>
    </div>
  );
}
