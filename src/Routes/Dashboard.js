import React, { useState } from 'react';
import { Sun, Moon, ArrowUp, ArrowDown, ShoppingBag } from 'lucide-react';

const EcoTrackDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  // Sample data for the dashboard
  const userData = {
    totalEmissions: 1250,
    emissionsSaved: 320,
    previousMonthEmissions: 1450,
    purchases: [
      { id: 1, name: "Bamboo Toothbrush", date: "Mar 25, 2025", emissionsSaved: 15 },
      { id: 2, name: "Reusable Water Bottle", date: "Mar 20, 2025", emissionsSaved: 85 },
      { id: 3, name: "Solar Charger", date: "Mar 15, 2025", emissionsSaved: 120 },
      { id: 4, name: "Organic Cotton Tote", date: "Mar 10, 2025", emissionsSaved: 45 },
      { id: 5, name: "LED Light Bulbs (Pack)", date: "Mar 5, 2025", emissionsSaved: 55 }
    ],
    monthlyData: [
      { month: 'Jan', emissions: 1500 },
      { month: 'Feb', emissions: 1450 },
      { month: 'Mar', emissions: 1250 }
    ]
  };
  
  // Calculate emissions change percentage
  const emissionsChange = ((userData.previousMonthEmissions - userData.totalEmissions) / userData.previousMonthEmissions * 100).toFixed(1);
  
  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header with theme toggle */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">EcoTrack Dashboard</h1>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-blue-100 text-blue-800'}`}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-lg font-semibold mb-2">Current Emissions</h2>
            <div className="flex items-center">
              <p className="text-3xl font-bold">{userData.totalEmissions} kg</p>
              <span className={`ml-2 flex items-center ${parseInt(emissionsChange) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {parseInt(emissionsChange) > 0 ? <ArrowDown size={20} /> : <ArrowUp size={20} />}
                {Math.abs(emissionsChange)}%
              </span>
            </div>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>vs. last month</p>
          </div>
          
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-lg font-semibold mb-2">Emissions Saved</h2>
            <p className="text-3xl font-bold">{userData.emissionsSaved} kg</p>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>through eco-friendly purchases</p>
          </div>
          
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-lg font-semibold mb-2">Recent Purchases</h2>
            <p className="text-3xl font-bold">{userData.purchases.length}</p>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>in the last 30 days</p>
          </div>
        </div>
        
        {/* Emissions Chart */}
        <div className={`p-6 rounded-lg shadow-md mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Monthly Emissions</h2>
          <div className="h-64 flex items-end justify-around">
            {userData.monthlyData.map((data, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-16 ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} rounded-t-md`} 
                  style={{ height: `${(data.emissions / 2000) * 200}px` }}
                ></div>
                <p className="mt-2">{data.month}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{data.emissions} kg</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Purchases Table */}
        <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Recent Eco-Friendly Purchases</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className="text-left py-3">Product</th>
                  <th className="text-left py-3">Date</th>
                  <th className="text-right py-3">Emissions Saved</th>
                </tr>
              </thead>
              <tbody>
                {userData.purchases.map(purchase => (
                  <tr key={purchase.id} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-3 flex items-center">
                      <ShoppingBag className="mr-2" size={16} />
                      {purchase.name}
                    </td>
                    <td className="py-3">{purchase.date}</td>
                    <td className="py-3 text-right text-green-500">{purchase.emissionsSaved} kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoTrackDashboard;