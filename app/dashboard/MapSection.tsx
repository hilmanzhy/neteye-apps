
'use client';

import { useState } from 'react';

interface MapSectionProps {
  filter: string;
}

interface DeviceDetail {
  id: string;
  name: string;
  location: string;
  status: 'stable' | 'degraded' | 'offline';
  type: 'ATM' | 'ISP';
  ping: number;
  uptime: number;
  lastUpdate: string;
  provider: string;
}

export default function MapSection({ filter }: MapSectionProps) {
  const [selectedDevice, setSelectedDevice] = useState<DeviceDetail | null>(null);
  const [showModal, setShowModal] = useState(false);

  const mockDevices: DeviceDetail[] = [
    {
      id: '1',
      name: 'ATM BCA Sudirman',
      location: 'Jakarta Pusat',
      status: 'stable',
      type: 'ATM',
      ping: 12,
      uptime: 99.8,
      lastUpdate: '2 menit lalu',
      provider: 'Telkom'
    },
    {
      id: '2',
      name: 'ISP Node Surabaya',
      location: 'Surabaya',
      status: 'degraded',
      type: 'ISP',
      ping: 45,
      uptime: 95.2,
      lastUpdate: '1 menit lalu',
      provider: 'Indosat'
    },
    {
      id: '3',
      name: 'ATM Mandiri Medan',
      location: 'Medan',
      status: 'offline',
      type: 'ATM',
      ping: 0,
      uptime: 0,
      lastUpdate: '15 menit lalu',
      provider: 'XL'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-green-500';
      case 'degraded': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleDeviceClick = (device: DeviceDetail) => {
    setSelectedDevice(device);
    setShowModal(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Peta Interaktif Nasional</h2>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Stabil (342)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Degradasi (28)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Gangguan (15)</span>
          </div>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden mb-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31906726.837428115!2d93.39289827671885!3d-2.154699020591287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2c4c07d7496404b7%3A0xe37b4de71badf485!2sIndonesia!5e0!3m2!1sen!2sid!4v1650000000000!5m2!1sen!2sid"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        
        {/* Device Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {mockDevices.map((device, index) => (
            <div
              key={device.id}
              className={`absolute w-4 h-4 rounded-full cursor-pointer pointer-events-auto transform -translate-x-2 -translate-y-2 border-2 border-white shadow-lg ${getStatusColor(device.status)}`}
              style={{
                left: `${30 + index * 25}%`,
                top: `${40 + index * 15}%`
              }}
              onClick={() => handleDeviceClick(device)}
            />
          ))}
        </div>
      </div>

      {/* Device List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {mockDevices.map((device) => (
          <div
            key={device.id}
            className="p-3 border border-gray-200 rounded-lg hover:shadow-md cursor-pointer transition-shadow"
            onClick={() => handleDeviceClick(device)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">{device.name}</span>
              <div className={`w-2 h-2 rounded-full ${getStatusColor(device.status)}`}></div>
            </div>
            <div className="text-xs text-gray-600">
              <div>{device.location}</div>
              <div>Ping: {device.ping}ms</div>
            </div>
          </div>
        ))}
      </div>

      {/* Device Detail Modal */}
      {showModal && selectedDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{selectedDevice.name}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  selectedDevice.status === 'stable' ? 'bg-green-100 text-green-800' :
                  selectedDevice.status === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedDevice.status === 'stable' ? 'Stabil' :
                   selectedDevice.status === 'degraded' ? 'Degradasi' : 'Gangguan'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Lokasi:</span>
                <span>{selectedDevice.location}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tipe:</span>
                <span>{selectedDevice.type}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Provider:</span>
                <span>{selectedDevice.provider}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Ping:</span>
                <span>{selectedDevice.ping}ms</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Uptime:</span>
                <span>{selectedDevice.uptime}%</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Terakhir Update:</span>
                <span>{selectedDevice.lastUpdate}</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <h4 className="font-medium mb-3">Histori 24 Jam Terakhir</h4>
              <div className="h-20 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-600">
                Grafik histori akan ditampilkan di sini
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
