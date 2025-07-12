
'use client';

import { useState } from 'react';

interface DeviceStatusTableProps {
  filter: string;
}

interface Device {
  id: string;
  name: string;
  type: 'ATM' | 'ISP';
  location: string;
  provider: string;
  status: 'stable' | 'degraded' | 'offline';
  ping: number;
  uptime: number;
  lastSeen: string;
  issues: string[];
}

export default function DeviceStatusTable({ filter }: DeviceStatusTableProps) {
  const [sortBy, setSortBy] = useState<keyof Device>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const mockDevices: Device[] = [
    {
      id: '1',
      name: 'ATM BCA Sudirman 01',
      type: 'ATM',
      location: 'Jakarta Pusat',
      provider: 'Telkom',
      status: 'stable',
      ping: 12,
      uptime: 99.8,
      lastSeen: '2 menit lalu',
      issues: []
    },
    {
      id: '2',
      name: 'ISP Node Surabaya Hub',
      type: 'ISP',
      location: 'Surabaya',
      provider: 'Indosat',
      status: 'degraded',
      ping: 45,
      uptime: 95.2,
      lastSeen: '1 menit lalu',
      issues: ['High Ping', 'Intermittent Connection']
    },
    {
      id: '3',
      name: 'ATM Mandiri Medan Plaza',
      type: 'ATM',
      location: 'Medan',
      provider: 'XL',
      status: 'offline',
      ping: 0,
      uptime: 0,
      lastSeen: '15 menit lalu',
      issues: ['Connection Lost', 'No Response']
    },
    {
      id: '4',
      name: 'ATM BRI Bandung 12',
      type: 'ATM',
      location: 'Bandung',
      provider: 'Telkom',
      status: 'stable',
      ping: 18,
      uptime: 98.5,
      lastSeen: '30 detik lalu',
      issues: []
    },
    {
      id: '5',
      name: 'ISP Backbone Yogya',
      type: 'ISP',
      location: 'Yogyakarta',
      provider: 'Biznet',
      status: 'degraded',
      ping: 35,
      uptime: 96.8,
      lastSeen: '5 menit lalu',
      issues: ['High Jitter']
    }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      stable: 'bg-green-100 text-green-800 border-green-200',
      degraded: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      offline: 'bg-red-100 text-red-800 border-red-200'
    };
    const labels = {
      stable: 'Stabil',
      degraded: 'Degradasi',
      offline: 'Offline'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const handleSort = (field: keyof Device) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedDevices = [...mockDevices].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const totalPages = Math.ceil(sortedDevices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDevices = sortedDevices.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Status Device Detail</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm whitespace-nowrap">
            Export Data
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm whitespace-nowrap">
            Refresh
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Device Name
                  <i className="ri-arrow-up-down-line"></i>
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('type')}
              >
                <div className="flex items-center gap-1">
                  Type
                  <i className="ri-arrow-up-down-line"></i>
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('location')}
              >
                <div className="flex items-center gap-1">
                  Location
                  <i className="ri-arrow-up-down-line"></i>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Provider
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-1">
                  Status
                  <i className="ri-arrow-up-down-line"></i>
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('ping')}
              >
                <div className="flex items-center gap-1">
                  Ping
                  <i className="ri-arrow-up-down-line"></i>
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('uptime')}
              >
                <div className="flex items-center gap-1">
                  Uptime
                  <i className="ri-arrow-up-down-line"></i>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Seen
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Issues
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedDevices.map((device) => (
              <tr key={device.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm font-medium text-gray-900">
                  {device.name}
                </td>
                <td className="px-4 py-4 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    device.type === 'ATM' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {device.type}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {device.location}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {device.provider}
                </td>
                <td className="px-4 py-4 text-sm">
                  {getStatusBadge(device.status)}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {device.ping > 0 ? `${device.ping}ms` : '-'}
                </td>
                <td className="px-4 py-4 text-sm">
                  <span className={`font-medium ${
                    device.uptime >= 99 ? 'text-green-600' :
                    device.uptime >= 95 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {device.uptime > 0 ? `${device.uptime}%` : '-'}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {device.lastSeen}
                </td>
                <td className="px-4 py-4 text-sm">
                  {device.issues.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {device.issues.map((issue, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs"
                        >
                          {issue}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-green-600 text-xs">No Issues</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-700">
          Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, sortedDevices.length)} dari {sortedDevices.length} device
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <i className="ri-arrow-left-line"></i>
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
