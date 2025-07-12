
'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              NetEye Monitoring System
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Sistem monitoring real-time untuk ATM dan ISP di seluruh Indonesia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="ri-pulse-line text-white text-xl"></i>
              </div>
              <h3 className="font-semibold text-green-900 mb-2">Real-time Monitoring</h3>
              <p className="text-sm text-green-700">Pemantauan status device secara real-time</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="ri-map-pin-line text-white text-xl"></i>
              </div>
              <h3 className="font-semibold text-blue-900 mb-2">Interactive Map</h3>
              <p className="text-sm text-blue-700">Peta interaktif lokasi NetEye</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="ri-line-chart-line text-white text-xl"></i>
              </div>
              <h3 className="font-semibold text-purple-900 mb-2">Analytics</h3>
              <p className="text-sm text-purple-700">Analisis performa dan SLA</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="ri-brain-line text-white text-xl"></i>
              </div>
              <h3 className="font-semibold text-orange-900 mb-2">AI Detection</h3>
              <p className="text-sm text-orange-700">Deteksi anomali dengan AI</p>
            </div>
          </div>

          <div className="space-y-4">
            <Link 
              href="/dashboard" 
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <i className="ri-dashboard-line mr-3 text-xl"></i>
              Buka Dashboard Monitoring
            </Link>
            
            <div className="text-sm text-gray-500 mt-4">
              Monitoring 385+ device ATM dan ISP di seluruh Indonesia
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white/80 backdrop-blur rounded-lg p-6 border border-white/20">
            <div className="text-2xl font-bold text-blue-600 mb-2">99.2%</div>
            <div className="text-sm text-gray-600">Average SLA Uptime</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur rounded-lg p-6 border border-white/20">
            <div className="text-2xl font-bold text-green-600 mb-2">342</div>
            <div className="text-sm text-gray-600">Healthy Devices</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur rounded-lg p-6 border border-white/20">
            <div className="text-2xl font-bold text-orange-600 mb-2">18.5ms</div>
            <div className="text-sm text-gray-600">Average Ping</div>
          </div>
        </div>
      </div>
    </div>
  );
}
