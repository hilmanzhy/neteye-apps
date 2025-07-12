
'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface SLASectionProps {
  filter: string;
}

export default function SLASection({ filter }: SLASectionProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'monthly'>('daily');

  const dailySLA = [
    { name: 'Sen', sla: 99.8, target: 99.5 },
    { name: 'Sel', sla: 98.2, target: 99.5 },
    { name: 'Rab', sla: 99.5, target: 99.5 },
    { name: 'Kam', sla: 99.1, target: 99.5 },
    { name: 'Jum', sla: 97.8, target: 99.5 },
    { name: 'Sab', sla: 99.7, target: 99.5 },
    { name: 'Min', sla: 99.9, target: 99.5 }
  ];

  const monthlySLA = [
    { name: 'Jan', sla: 99.2, target: 99.5 },
    { name: 'Feb', sla: 98.8, target: 99.5 },
    { name: 'Mar', sla: 99.6, target: 99.5 },
    { name: 'Apr', sla: 99.1, target: 99.5 },
    { name: 'Mei', sla: 98.5, target: 99.5 },
    { name: 'Jun', sla: 99.8, target: 99.5 }
  ];

  const ispSLA = [
    { name: 'Telkom', value: 99.5, color: '#3b82f6' },
    { name: 'Indosat', value: 98.2, color: '#ef4444' },
    { name: 'XL', value: 97.8, color: '#f59e0b' },
    { name: 'Biznet', value: 99.1, color: '#10b981' },
    { name: 'First Media', value: 98.9, color: '#8b5cf6' }
  ];

  const bankSLA = [
    { name: 'BCA', sla: 99.8, issues: 2 },
    { name: 'Mandiri', sla: 98.5, issues: 8 },
    { name: 'BRI', sla: 99.2, issues: 4 },
    { name: 'BNI', sla: 97.9, issues: 12 },
    { name: 'CIMB', sla: 99.5, issues: 3 }
  ];

  const getSLAColor = (sla: number) => {
    if (sla >= 99.5) return 'text-green-600';
    if (sla >= 98) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSLABadge = (sla: number) => {
    if (sla >= 99.5) return 'bg-green-100 text-green-800 border-green-200';
    if (sla >= 98) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">SLA Performance</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedPeriod('daily')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              selectedPeriod === 'daily'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Harian
          </button>
          <button
            onClick={() => setSelectedPeriod('monthly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              selectedPeriod === 'monthly'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Bulanan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* SLA Trend Chart */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium mb-4">Tren SLA {selectedPeriod === 'daily' ? 'Mingguan' : 'Bulanan'}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={selectedPeriod === 'daily' ? dailySLA : monthlySLA}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[95, 100]} />
              <Tooltip />
              <Bar dataKey="sla" fill="#3b82f6" name="SLA (%)" />
              <Bar dataKey="target" fill="#10b981" opacity={0.3} name="Target (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ISP SLA Distribution */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium mb-4">SLA per ISP</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={ispSLA}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {ispSLA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bank SLA Table */}
      <div className="mb-6">
        <h3 className="font-medium mb-4">SLA per Bank</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {bankSLA.map((bank) => (
            <div key={bank.name} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="font-medium text-gray-900 mb-2">{bank.name}</div>
              <div className={`text-2xl font-bold mb-2 ${getSLAColor(bank.sla)}`}>
                {bank.sla}%
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {bank.issues} gangguan
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSLABadge(bank.sla)}`}>
                {bank.sla >= 99.5 ? 'Excellent' : bank.sla >= 98 ? 'Good' : 'Poor'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Zones */}
      <div className="border-t pt-6">
        <h3 className="font-medium mb-4 text-red-600">
          <i className="ri-alarm-warning-line mr-2"></i>
          Zona Merah (Di Bawah Threshold)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-red-900">ATM Medan Region</div>
                <div className="text-sm text-red-700">SLA: 97.2% (Target: 99.5%)</div>
              </div>
              <div className="text-red-600">
                <i className="ri-arrow-down-line text-xl"></i>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-red-900">ISP Indosat Jakarta</div>
                <div className="text-sm text-red-700">SLA: 98.2% (Target: 99.5%)</div>
              </div>
              <div className="text-red-600">
                <i className="ri-arrow-down-line text-xl"></i>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-red-900">ATM BNI Surabaya</div>
                <div className="text-sm text-red-700">SLA: 97.9% (Target: 99.5%)</div>
              </div>
              <div className="text-red-600">
                <i className="ri-arrow-down-line text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">99.2%</div>
            <div className="text-sm text-gray-600">SLA Nasional</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">342</div>
            <div className="text-sm text-gray-600">Device Above Target</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">43</div>
            <div className="text-sm text-gray-600">Device Below Target</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">99.5%</div>
            <div className="text-sm text-gray-600">Target SLA</div>
          </div>
        </div>
      </div>
    </div>
  );
}
