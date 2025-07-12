
'use client';

import { useState, useEffect } from 'react';
import MapSection from './MapSection';
import StatsCards from './StatsCards';
import AlertsSection from './AlertsSection';
import PerformanceCharts from './PerformanceCharts';
import DeviceStatusTable from './DeviceStatusTable';
import SLASection from './SLASection';
import AnomalyDetection from './AnomalyDetection';

export default function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [refreshInterval, setRefreshInterval] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time data refresh
      console.log('Refreshing dashboard data...');
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">NetEye Monitoring Dashboard</h1>
            <div className="flex gap-4">
              <select 
                value={selectedFilter} 
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="all">Semua Lokasi</option>
                <option value="atm">ATM</option>
                <option value="isp">ISP</option>
                <option value="jakarta">Jakarta</option>
                <option value="surabaya">Surabaya</option>
                <option value="medan">Medan</option>
              </select>
              <select 
                value={refreshInterval} 
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value={10}>Refresh 10s</option>
                <option value={30}>Refresh 30s</option>
                <option value={60}>Refresh 1m</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Terakhir diperbarui: <span suppressHydrationWarning={true}>{new Date().toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards filter={selectedFilter} />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Interactive Map - Takes 2 columns */}
          <div className="lg:col-span-2">
            <MapSection filter={selectedFilter} />
          </div>
          
          {/* Alerts Section */}
          <div className="lg:col-span-1">
            <AlertsSection />
          </div>
        </div>

        {/* Performance Charts */}
        <PerformanceCharts filter={selectedFilter} />

        {/* SLA Section */}
        <SLASection filter={selectedFilter} />

        {/* Device Status Table */}
        <DeviceStatusTable filter={selectedFilter} />

        {/* Anomaly Detection */}
        <AnomalyDetection />
      </div>
    </div>
  );
}
