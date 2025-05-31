import React, { useState } from 'react';

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState('single');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('single')}
            className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'single' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Single Forecast
          </button>
          <button
            onClick={() => setActiveTab('batch')}
            className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'batch' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Batch Processing
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'analytics' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Market Analytics
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'single' && <SingleForecast />}
        {activeTab === 'batch' && <BatchProcessing />}
        {activeTab === 'analytics' && <MarketAnalytics />}
      </div>

      <Footer />
    </div>
  );
}

// Header Component
function Header() {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <span className="text-white text-2xl">🛡️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Jiraya</h1>
              <p className="text-sm text-gray-600">Blockchain-Anchored Shipping Cost Forecasting Engine</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">23%</p>
              <p className="text-xs text-gray-600">Accuracy Boost</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">$0.15</p>
              <p className="text-xs text-gray-600">Per API Call</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">5.2x</p>
              <p className="text-xs text-gray-600">ROI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Single Forecast Component
function SingleForecast() {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    weight: '',
    value: '',
    hsCode: '',
    shippingMode: 'ocean'
  });
  
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blockchainEvents, setBlockchainEvents] = useState([]);

  const calculateForecast = () => {
    if (!formData.origin || !formData.destination || !formData.weight || !formData.value) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const result = mockCalculateForecast(formData);
      const events = mockGenerateBlockchainEvents(formData.origin, formData.destination);
      
      setForecast(result);
      setBlockchainEvents(events);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <ShipmentForm 
          formData={formData}
          setFormData={setFormData}
          onCalculate={calculateForecast}
          loading={loading}
        />
      </div>
      
      <div className="lg:col-span-2 space-y-6">
        {blockchainEvents.length > 0 && (
          <BlockchainEvents events={blockchainEvents} forecast={forecast} />
        )}
        
        {forecast && (
          <ForecastResults forecast={forecast} />
        )}
      </div>
    </div>
  );
}

// Shipment Form Component
function ShipmentForm({ formData, setFormData, onCalculate, loading }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-xl">📦</span>
        <h2 className="text-xl font-semibold text-gray-900">Shipment Details</h2>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Origin</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.origin}
              onChange={(e) => setFormData({...formData, origin: e.target.value})}
            >
              <option value="">Select...</option>
              <option value="CN">China</option>
              <option value="DE">Germany</option>
              <option value="US">United States</option>
              <option value="JP">Japan</option>
              <option value="KR">South Korea</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.destination}
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
            >
              <option value="">Select...</option>
              <option value="US">United States</option>
              <option value="EU">European Union</option>
              <option value="CA">Canada</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Mode</label>
          <select 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.shippingMode}
            onChange={(e) => setFormData({...formData, shippingMode: e.target.value})}
          >
            <option value="ocean">Ocean Freight</option>
            <option value="air">Air Freight</option>
            <option value="express">Express Delivery</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
            <input 
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="1000"
              value={formData.weight}
              onChange={(e) => setFormData({...formData, weight: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Value (USD)</label>
            <input 
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="50000"
              value={formData.value}
              onChange={(e) => setFormData({...formData, value: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">HS Code</label>
          <input 
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="8542.39"
            value={formData.hsCode}
            onChange={(e) => setFormData({...formData, hsCode: e.target.value})}
          />
        </div>

        <button 
          onClick={onCalculate}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Calculating...</span>
            </>
          ) : (
            <>
              <span className="text-lg">🧮</span>
              <span>Calculate Forecast</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Blockchain Events Component
function BlockchainEvents({ events, forecast }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-lg">🛡️</span>
        <h3 className="text-lg font-semibold text-gray-900">Blockchain Verification Status</h3>
        <div className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
          {forecast?.verification.verified}/{forecast?.verification.total} Verified
        </div>
      </div>
      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-lg">
                {event.verified ? '✅' : '⏰'}
              </span>
              <div>
                <p className="font-medium text-gray-900">{event.event}</p>
                <p className="text-sm text-gray-500">{event.timestamp}</p>
                {event.hash !== 'pending' && (
                  <p className="text-xs text-blue-600 font-mono">{event.hash}</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                event.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {event.verified ? 'Verified' : 'Pending'}
              </div>
              <p className="text-xs text-gray-500 mt-1">{event.confidence}% confidence</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Forecast Results Component
function ForecastResults({ forecast }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getConfidenceColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 80) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-lg">📈</span>
          <h3 className="text-lg font-semibold text-gray-900">Enhanced Cost Forecast</h3>
        </div>
        <div className={`px-4 py-2 rounded-full text-sm font-medium border ${getConfidenceColor(forecast.confidence)}`}>
          {forecast.confidence}% Confidence
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg">💰</span>
            <h4 className="font-semibold text-gray-900">Total Landed Cost</h4>
          </div>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(forecast.total)}</p>
          <p className="text-sm text-gray-600 mt-1">
            Range: {formatCurrency(forecast.range.low)} - {formatCurrency(forecast.range.high)}
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg">🛡️</span>
            <h4 className="font-semibold text-gray-900">Accuracy Advantage</h4>
          </div>
          <p className="text-lg font-bold text-green-600">{forecast.accuracy}</p>
          <p className="text-sm text-gray-600 mt-1">
            Potential savings: {formatCurrency(forecast.savings)}
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg">⚡</span>
            <h4 className="font-semibold text-gray-900">Verification Rate</h4>
          </div>
          <p className="text-2xl font-bold text-purple-600">{forecast.verification.percentage}%</p>
          <p className="text-sm text-gray-600 mt-1">
            {forecast.verification.verified} of {forecast.verification.total} events verified
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-gray-900 mb-4">Detailed Cost Breakdown</h4>
        <div className="space-y-3">
          {Object.entries(forecast.breakdown).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-700 capitalize">
                {key === 'risk' ? 'Risk Buffer' : key} Costs
              </span>
              <span className="font-medium">{formatCurrency(value)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg">ℹ️</span>
          <h5 className="font-medium text-gray-900">Key Assumptions</h5>
        </div>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Tariff rates based on current trade agreements</li>
          <li>• Blockchain verification reduces uncertainty by 15-25%</li>
          <li>• Risk buffer adjusted for verified shipping events</li>
          <li>• Exchange rates as of {new Date().toLocaleDateString()}</li>
        </ul>
      </div>
    </div>
  );
}

// Batch Processing Component
function BatchProcessing() {
  const [csvData, setCsvData] = useState('');
  const [batchResults, setBatchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const processBatchCSV = () => {
    if (!csvData.trim()) {
      alert('Please enter CSV data');
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      // Mock processing
      const mockResults = [
        { id: 1, origin: 'CN', destination: 'US', total: 6800, confidence: 95, savings: 1560 },
        { id: 2, origin: 'DE', destination: 'US', total: 4200, confidence: 92, savings: 960 },
        { id: 3, origin: 'JP', destination: 'US', total: 5400, confidence: 89, savings: 1240 }
      ];
      setBatchResults(mockResults);
      setLoading(false);
    }, 3000);
  };

  const exportResults = () => {
    const csv = [
      'Origin,Destination,Total Cost,Confidence,Savings',
      ...batchResults.map(r => `${r.origin},${r.destination},${r.total},${r.confidence}%,${r.savings}`)
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jiraya_forecasts.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <span className="text-lg">📤</span>
          <h2 className="text-xl font-semibold text-gray-900">Batch CSV Processing</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CSV Data (Format: Origin,Destination,Weight,Value,Mode)
            </label>
            <textarea
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="CN,US,1000,50000,ocean
DE,US,500,25000,air
JP,US,2000,75000,ocean"
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={processBatchCSV}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span className="text-lg">🧮</span>
                  <span>Process Batch</span>
                </>
              )}
            </button>
            
            {batchResults.length > 0 && (
              <button
                onClick={exportResults}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <span className="text-lg">📥</span>
                <span>Export Results</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {batchResults.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Batch Processing Results</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Route</th>
                  <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Total Cost</th>
                  <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Confidence</th>
                  <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Savings</th>
                </tr>
              </thead>
              <tbody>
                {batchResults.map((result) => (
                  <tr key={result.id} className="border-b border-gray-100">
                    <td className="py-3 px-3 text-sm">{result.origin} → {result.destination}</td>
                    <td className="py-3 px-3 text-sm font-medium">${result.total.toLocaleString()}</td>
                    <td className="py-3 px-3 text-sm">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-50 text-green-600">
                        {result.confidence}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-sm text-green-600 font-medium">${result.savings.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// Market Analytics Component
function MarketAnalytics() {
  const [roiInput, setRoiInput] = useState(500000);
  const [roiResults, setRoiResults] = useState(null);

  const calculateROI = () => {
    const accuracyImprovement = 0.23; // 23%
    const jirayaAnnualCost = 25000 * 12; // Enterprise plan
    
    const annualSavings = roiInput * accuracyImprovement;
    const netSavings = annualSavings - jirayaAnnualCost;
    const roi = (netSavings / jirayaAnnualCost) * 100;
    const paybackMonths = jirayaAnnualCost / (annualSavings / 12);

    setRoiResults({
      annualSavings: Math.round(annualSavings),
      netSavings: Math.round(netSavings),
      roi: Math.round(roi),
      paybackMonths: Math.round(paybackMonths * 10) / 10
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <span className="text-lg">📊</span>
          <h2 className="text-xl font-semibold text-gray-900">Market Analytics & ROI Calculator</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Market Size</h3>
            <p className="text-2xl font-bold text-blue-600">$16.2B</p>
            <p className="text-sm text-gray-600">Global logistics software market</p>
            <p className="text-xs text-gray-500 mt-1">Growing at 9.4% CAGR</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Customer CAC</h3>
            <p className="text-2xl font-bold text-green-600">$6,200</p>
            <p className="text-sm text-gray-600">B2B SaaS average</p>
            <p className="text-xs text-gray-500 mt-1">Logistics software benchmark</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">LTV:CAC Ratio</h3>
            <p className="text-2xl font-bold text-purple-600">50:1</p>
            <p className="text-sm text-gray-600">Projected by Year 3</p>
            <p className="text-xs text-gray-500 mt-1">Exceptional performance</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold text-gray-900 mb-4">ROI Calculator</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-4 mb-4">
              <label className="text-sm font-medium text-gray-700">Annual Logistics Costs:</label>
              <input
                type="number"
                value={roiInput}
                onChange={(e) => setRoiInput(parseFloat(e.target.value) || 0)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={calculateROI}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Calculate ROI
              </button>
            </div>
            
            {roiResults && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">${roiResults.annualSavings.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Annual Savings</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600">${roiResults.netSavings.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Net Savings</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-purple-600">{roiResults.roi}%</p>
                  <p className="text-xs text-gray-600">ROI</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-orange-600">{roiResults.paybackMonths}</p>
                  <p className="text-xs text-gray-600">Payback (months)</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg text-white">
          <h3 className="font-semibold mb-2">Competitive Advantage</h3>
          <p className="text-sm mb-4">
            Jiraya delivers 23% accuracy improvement through blockchain verification, 
            compared to traditional ERP-based forecasting systems.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">77%</p>
              <p className="text-xs">Traditional Accuracy</p>
            </div>
            <div>
              <p className="text-2xl font-bold">95%</p>
              <p className="text-xs">Jiraya Accuracy</p>
            </div>
            <div>
              <p className="text-2xl font-bold">5.2x</p>
              <p className="text-xs">Average ROI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <div className="mt-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl text-white p-8 mx-4">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Supply Chain?</h2>
        <p className="text-lg mb-6">
          Join 500+ companies using blockchain-verified shipping data for accurate cost forecasting
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h3 className="font-semibold mb-2">API Pricing</h3>
            <p className="text-2xl font-bold">$0.15</p>
            <p className="text-sm opacity-80">per forecast</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h3 className="font-semibold mb-2">Enterprise Plans</h3>
            <p className="text-2xl font-bold">$25K+</p>
            <p className="text-sm opacity-80">per month</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h3 className="font-semibold mb-2">Average Payback</h3>
            <p className="text-2xl font-bold">5.2</p>
            <p className="text-sm opacity-80">months</p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/20 text-sm opacity-80">
          <p>&copy; 2025 Jiraya. Blockchain-Anchored Shipping Cost Forecasting Engine.</p>
          <p className="mt-2">Built for the No-Pitch Competition • Designed to Scale</p>
        </div>
      </div>
    </div>
  );
}

// Mock calculation functions
function mockCalculateForecast(data) {
  const weight = parseFloat(data.weight);
  const value = parseFloat(data.value);
  
  // Mock calculations
  const freightCost = weight * 2.8;
  const dutyAmount = value * 0.075;
  const vatAmount = 0;
  const processingFees = 150;
  const brokerFees = Math.max(85, value * 0.008);
  const insuranceCost = value * 0.002;
  const riskBuffer = (freightCost + dutyAmount + processingFees + brokerFees + insuranceCost) * 0.08;
  
  const totalCost = freightCost + dutyAmount + vatAmount + processingFees + brokerFees + insuranceCost + riskBuffer;
  const confidenceScore = 95;
  const savings = Math.round(totalCost * 0.23);
  
  return {
    breakdown: {
      freight: Math.round(freightCost),
      duty: Math.round(dutyAmount),
      vat: Math.round(vatAmount),
      processing: processingFees,
      broker: Math.round(brokerFees),
      insurance: Math.round(insuranceCost),
      risk: Math.round(riskBuffer)
    },
    total: Math.round(totalCost),
    confidence: confidenceScore,
    range: {
      low: Math.round(totalCost * 0.92),
      high: Math.round(totalCost * 1.08)
    },
    accuracy: "23.0% better than traditional forecasting",
    savings: savings,
    verification: {
      verified: 4,
      total: 6,
      percentage: 67
    }
  };
}

function mockGenerateBlockchainEvents(origin, destination) {
  return [
    { id: 1, event: 'Factory Pickup Confirmed', verified: true, confidence: 98, timestamp: '2025-05-27 09:15', hash: '0x4a7b...' },
    { id: 2, event: 'Export Documentation', verified: true, confidence: 96, timestamp: '2025-05-27 14:30', hash: '0x8c9d...' },
    { id: 3, event: 'Container Loading', verified: true, confidence: 99, timestamp: '2025-05-28 08:45', hash: '0x2f1e...' },
    { id: 4, event: 'Port Departure', verified: true, confidence: 97, timestamp: '2025-05-28 18:20', hash: '0x7b3a...' },
    { id: 5, event: 'Vessel Transit', verified: false, confidence: 85, timestamp: '2025-06-01 12:00', hash: 'pending' },
    { id: 6, event: 'Customs Pre-clearance', verified: false, confidence: 78, timestamp: '2025-06-14 09:30', hash: 'pending' }
  ];
}

export default App;