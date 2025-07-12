
'use client';

import { useState } from 'react';

export default function AnomalyDetection() {
  const [selectedAnomalyType, setSelectedAnomalyType] = useState<'location' | 'time' | 'pattern'>('location');

  const locationAnomalies = [
    {
      id: '1',
      location: 'ATM Mall Kelapa Gading',
      anomaly: 'Gangguan Berulang',
      frequency: '5x dalam 2 hari',
      severity: 'high',
      description: 'Koneksi terputus setiap jam 14:00-15:00',
      recommendation: 'Periksa stabilitas jaringan provider pada jam tersebut'
    },
    {
      id: '2',
      location: 'ISP Node Surabaya Barat',
      anomaly: 'Ping Spike Pattern',
      frequency: '3x seminggu',
      severity: 'medium',
      description: 'Ping naik drastis 200ms+ setiap Senin pagi',
      recommendation: 'Analisis traffic load pada hari Senin'
    },
    {
      id: '3',
      location: 'ATM Cluster Jakarta Selatan',
      anomaly: 'Mass Disconnect',
      frequency: '1x per bulan',
      severity: 'critical',
      description: '12 ATM terputus bersamaan dalam radius 2km',
      recommendation: 'Periksa infrastruktur backbone regional'
    }
  ];

  const timeAnomalies = [
    {
      time: '02:00 - 04:00',
      pattern: 'Unusual High Traffic',
      affected: '45 devices',
      description: 'Traffic meningkat 300% pada jam dini hari'
    },
    {
      time: '12:00 - 13:00',
      pattern: 'Consistent Jitter Spike',
      affected: '28 devices',
      description: 'Jitter naik signifikan setiap jam makan siang'
    },
    {
      time: 'Setiap Jumat 17:00',
      pattern: 'Weekly Degradation',
      affected: '67 devices',
      description: 'Performance turun konsisten setiap Jumat sore'
    }
  ];

  const patternAnomalies = [
    {
      pattern: 'Cascading Failure',
      description: 'Gangguan di satu node menyebabkan efek domino ke 15 node lain',
      impact: 'High',
      trend: 'Increasing'
    },
    {
      pattern: 'Weather Correlation',
      description: 'Gangguan meningkat 40% saat cuaca hujan lebat',
      impact: 'Medium',
      trend: 'Seasonal'
    },
    {
      pattern: 'Provider Switch Pattern',
      description: 'Device sering berganti provider dalam periode singkat',
      impact: 'Medium',
      trend: 'Stable'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return 'ri-alarm-warning-fill text-red-500';
      case 'high': return 'ri-error-warning-fill text-orange-500';
      case 'medium': return 'ri-information-fill text-yellow-500';
      case 'low': return 'ri-check-fill text-green-500';
      default: return 'ri-information-line text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Anomaly Detection</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-sm whitespace-nowrap">
            <i className="ri-brain-line mr-2"></i>
            AI Analysis
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm whitespace-nowrap">
            Export Report
          </button>
        </div>
      </div>

      {/* Anomaly Type Selector */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setSelectedAnomalyType('location')}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
            selectedAnomalyType === 'location'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Anomali Lokasi
        </button>
        <button
          onClick={() => setSelectedAnomalyType('time')}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
            selectedAnomalyType === 'time'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Anomali Waktu
        </button>
        <button
          onClick={() => setSelectedAnomalyType('pattern')}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
            selectedAnomalyType === 'pattern'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Pola Anomali
        </button>
      </div>

      {/* Anomaly Content */}
      <div className="space-y-4">
        {selectedAnomalyType === 'location' && (
          <div className="space-y-4">
            {locationAnomalies.map((anomaly) => (
              <div key={anomaly.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <i className={getSeverityIcon(anomaly.severity)}></i>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{anomaly.location}</h3>
                      <p className="text-sm text-gray-600">{anomaly.anomaly}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(anomaly.severity)}`}>
                    {anomaly.severity.toUpperCase()}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <span className="text-sm text-gray-600">Frekuensi: </span>
                    <span className="text-sm font-medium">{anomaly.frequency}</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-gray-700">{anomaly.description}</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <div className="flex items-start gap-2">
                    <i className="ri-lightbulb-line text-blue-500 mt-0.5"></i>
                    <div>
                      <div className="text-sm font-medium text-blue-900 mb-1">Rekomendasi:</div>
                      <div className="text-sm text-blue-800">{anomaly.recommendation}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedAnomalyType === 'time' && (
          <div className="space-y-4">
            {timeAnomalies.map((anomaly, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{anomaly.time}</h3>
                    <p className="text-sm text-purple-600 font-medium">{anomaly.pattern}</p>
                  </div>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                    {anomaly.affected}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{anomaly.description}</p>
              </div>
            ))}
          </div>
        )}

        {selectedAnomalyType === 'pattern' && (
          <div className="space-y-4">
            {patternAnomalies.map((anomaly, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{anomaly.pattern}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-gray-600">
                        Impact: <span className={`font-medium ${
                          anomaly.impact === 'High' ? 'text-red-600' :
                          anomaly.impact === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                        }`}>{anomaly.impact}</span>
                      </span>
                      <span className="text-sm text-gray-600">
                        Trend: <span className="font-medium">{anomaly.trend}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{anomaly.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Insights */}
      <div className="mt-8 pt-6 border-t">
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <i className="ri-brain-line text-purple-500"></i>
          AI Insights & Predictions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
            <div className="text-sm font-medium text-purple-900 mb-2">Prediksi Gangguan</div>
            <div className="text-sm text-purple-800">
              Model AI memprediksi kemungkinan gangguan 78% di wilayah Jakarta Barat dalam 24 jam ke depan berdasarkan pola cuaca dan traffic.
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg p-4">
            <div className="text-sm font-medium text-green-900 mb-2">Optimisasi Rekomendasi</div>
            <div className="text-sm text-green-800">
              Sistem merekomendasikan load balancing otomatis pada ISP Node Surabaya untuk mengurangi ping sebesar 25%.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
