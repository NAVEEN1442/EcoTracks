import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addData } from '../slices/dataSlice';
import { useNavigate } from 'react-router-dom';


const CarbonCalculator = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [seen,setSeen] = useState(false);
    const [forward,setForward] = useState();

  // State for form inputs
  const [inputs, setInputs] = useState({
    electricity: 200,
    fuel: 50,
    cng: 0,
    air: 0,
    lpg: 1,
    waste: 30,
    recycling: 20,
    water: 500
  });
  
  // State for calculation results
  const [results, setResults] = useState(null);
  
  // State for theme
  const [darkTheme, setDarkTheme] = useState(false);
  
  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkTheme(true);
    }
  }, []);
  
  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [id]: parseFloat(value) || 0
    }));
  };
  
  // Calculate emissions
  const calculateEmissions = () => {
    // Emission factors for India (kg CO2e per unit)


    const electricityFactor = 0.82; // kg CO2e per kWh
    const petrolFactor = 2.3; // kg CO2e per liter
    const cngFactor = 2.83; // kg CO2e per kg
    const airFactor = 0.115; // kg CO2e per km
    const lpgFactor = 42.5; // kg CO2e per cylinder (14.2kg)
    const wasteFactor = 0.5; // kg CO2e per kg waste
    const waterFactor = 0.000419; // kg CO2e per liter
    
    // Calculate annual emissions
    const electricityEmissions = inputs.electricity * electricityFactor * 12;
    const fuelEmissions = inputs.fuel * petrolFactor * 12;
    const cngEmissions = inputs.cng * cngFactor * 12;
    const airEmissions = inputs.air * airFactor;
    const lpgEmissions = inputs.lpg * lpgFactor * 12;
    const wasteEmissions = inputs.waste * wasteFactor * 12 * (1 - inputs.recycling/100);
    const waterEmissions = inputs.water * waterFactor * 365;
    
    // Calculate total emissions
    const totalEmissions = electricityEmissions + fuelEmissions + cngEmissions + 
                          airEmissions + lpgEmissions + wasteEmissions + waterEmissions;
    
    // Compare to average
    const avgIndianEmissions = 2000; // kg CO2e per person per year (approximate)
    const householdSize = 4; // Assumed average Indian household size
    const percentOfAvg = (totalEmissions / (avgIndianEmissions * householdSize)) * 100;
    
    // Create sources array for breakdown
    const sources = [
      {name: "Electricity", value: electricityEmissions},
      {name: "Transportation (Petrol/Diesel)", value: fuelEmissions},
      {name: "Transportation (CNG)", value: cngEmissions},
      {name: "Air Travel", value: airEmissions},
      {name: "Cooking (LPG)", value: lpgEmissions},
      {name: "Waste", value: wasteEmissions},
      {name: "Water", value: waterEmissions}
    ].sort((a, b) => b.value - a.value);
    
    // Tips based on sources
    const tips = {
      "Electricity": "Consider switching to energy-efficient appliances and LED lighting. Turn off appliances instead of leaving them on standby mode.",
      "Transportation (Petrol/Diesel)": "Try carpooling, using public transport, or switching to an electric vehicle to reduce your transportation emissions.",
      "Transportation (CNG)": "While CNG is cleaner than petrol/diesel, consider using public transport or electric vehicles where possible.",
      "Air Travel": "Air travel has a high carbon footprint. Consider video conferencing or train travel when possible.",
      "Cooking (LPG)": "Use lids while cooking, maintain your stove properly, and consider using pressure cookers to improve efficiency and reduce LPG consumption.",
      "Waste": "Increase your recycling rate, try composting organic waste, and reduce single-use plastic consumption.",
      "Water": "Install water-efficient fixtures, harvest rainwater, and fix leaks promptly to reduce your water-related carbon footprint."
    };

    setForward(totalEmissions);
    
    // Set results
    setResults({
      totalEmissions,
      percentOfAvg,
      sources,
      tip: tips[sources[0].name]
    });

    //dispatch(addData({totalEmissions}));

    //navigate("/ContentData");

    setSeen(true);



    

  };


  
  return (
    <div className={`min-h-screen p-6 ${darkTheme ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        className="fixed top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110"
        style={{
          backgroundColor: darkTheme ? '#66bb6a' : '#2e7d32',
          color: 'white'
        }}
      >
        {darkTheme ? '🌙' : '☀️'}
      </button>
      
      <div className="max-w-3xl mx-auto">
        <h1 className={`text-center text-2xl font-bold mb-6 ${darkTheme ? 'text-green-400' : 'text-green-700'}`}>
          Indian Household Carbon Emissions Calculator
        </h1>
        
        <div className={`rounded-lg shadow-md p-6 ${darkTheme ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Electricity Section */}
          <div className={`mb-6 pb-4 border-b ${darkTheme ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`font-bold mb-3 ${darkTheme ? 'text-green-400' : 'text-green-700'}`}>Electricity</div>
            <div className="flex flex-wrap items-center mb-3">
              <label className="flex-1 min-w-0 mr-4">Monthly electricity consumption (kWh):</label>
              <input
                type="number"
                id="electricity"
                value={inputs.electricity}
                onChange={handleInputChange}
                min="0"
                className={`w-32 p-2 rounded border ${darkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
            </div>
            <div className={`text-sm p-3 rounded ${darkTheme ? 'bg-gray-700' : 'bg-green-50'}`}>
              <strong className={darkTheme ? 'text-green-400' : 'text-green-700'}>Average:</strong> 180-250 kWh per month for urban households.
            </div>
          </div>
          
          {/* Transportation Section */}
          <div className={`mb-6 pb-4 border-b ${darkTheme ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`font-bold mb-3 ${darkTheme ? 'text-green-400' : 'text-green-700'}`}>Transportation</div>
            <div className="flex flex-wrap items-center mb-3">
              <label className="flex-1 min-w-0 mr-4">Monthly petrol/diesel consumption (liters):</label>
              <input
                type="number"
                id="fuel"
                value={inputs.fuel}
                onChange={handleInputChange}
                min="0"
                className={`w-32 p-2 rounded border ${darkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
            </div>
            <div className="flex flex-wrap items-center mb-3">
              <label className="flex-1 min-w-0 mr-4">Monthly CNG consumption (kg):</label>
              <input
                type="number"
                id="cng"
                value={inputs.cng}
                onChange={handleInputChange}
                min="0"
                className={`w-32 p-2 rounded border ${darkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
            </div>
            <div className="flex flex-wrap items-center mb-3">
              <label className="flex-1 min-w-0 mr-4">Annual air travel (km):</label>
              <input
                type="number"
                id="air"
                value={inputs.air}
                onChange={handleInputChange}
                min="0"
                className={`w-32 p-2 rounded border ${darkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
            </div>
            <div className={`text-sm p-3 rounded ${darkTheme ? 'bg-gray-700' : 'bg-green-50'}`}>
              <strong className={darkTheme ? 'text-green-400' : 'text-green-700'}>Average:</strong> 40-60 liters of petrol/diesel per month for a single vehicle household.
            </div>
          </div>
          
          {/* Cooking Fuel Section */}
          <div className={`mb-6 pb-4 border-b ${darkTheme ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`font-bold mb-3 ${darkTheme ? 'text-green-400' : 'text-green-700'}`}>Cooking Fuel</div>
            <div className="flex flex-wrap items-center mb-3">
              <label className="flex-1 min-w-0 mr-4">Monthly LPG consumption (cylinders):</label>
              <input
                type="number"
                id="lpg"
                value={inputs.lpg}
                onChange={handleInputChange}
                min="0"
                step="0.1"
                className={`w-32 p-2 rounded border ${darkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
            </div>
            <div className={`text-sm p-3 rounded ${darkTheme ? 'bg-gray-700' : 'bg-green-50'}`}>
              <strong className={darkTheme ? 'text-green-400' : 'text-green-700'}>Average:</strong> 0.8-1.2 cylinders (14.2 kg) per month for a family of four.
            </div>
          </div>
          
          {/* Waste Section */}
          <div className={`mb-6 pb-4 border-b ${darkTheme ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`font-bold mb-3 ${darkTheme ? 'text-green-400' : 'text-green-700'}`}>Waste</div>
            <div className="flex flex-wrap items-center mb-3">
              <label className="flex-1 min-w-0 mr-4">Monthly household waste (kg):</label>
              <input
                type="number"
                id="waste"
                value={inputs.waste}
                onChange={handleInputChange}
                min="0"
                className={`w-32 p-2 rounded border ${darkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
            </div>
            <div className="flex flex-wrap items-center mb-3">
              <label className="flex-1 min-w-0 mr-4">Percentage of waste recycled (%):</label>
              <input
                type="number"
                id="recycling"
                value={inputs.recycling}
                onChange={handleInputChange}
                min="0"
                max="100"
                className={`w-32 p-2 rounded border ${darkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
            </div>
            <div className={`text-sm p-3 rounded ${darkTheme ? 'bg-gray-700' : 'bg-green-50'}`}>
              <strong className={darkTheme ? 'text-green-400' : 'text-green-700'}>Average:</strong> 25-35 kg of waste per month for a family of four, with urban recycling rates ranging from 15-25%.
            </div>
          </div>
          
          {/* Water Section */}
          <div className={`mb-6 pb-4 border-b ${darkTheme ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`font-bold mb-3 ${darkTheme ? 'text-green-400' : 'text-green-700'}`}>Water</div>
            <div className="flex flex-wrap items-center mb-3">
              <label className="flex-1 min-w-0 mr-4">Daily water consumption (liters):</label>
              <input
                type="number"
                id="water"
                value={inputs.water}
                onChange={handleInputChange}
                min="0"
                className={`w-32 p-2 rounded border ${darkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
            </div>
            <div className={`text-sm p-3 rounded ${darkTheme ? 'bg-gray-700' : 'bg-green-50'}`}>
              <strong className={darkTheme ? 'text-green-400' : 'text-green-700'}>Average:</strong> 400-600 liters per day for a family of four in urban areas.
            </div>
          </div>
          
          {/* Calculate Button */}
          <button
            onClick={calculateEmissions}
            className={`block mx-auto px-6 py-3 rounded font-medium text-white transition-colors ${darkTheme ? 'bg-green-500 hover:bg-green-600' : 'bg-green-700 hover:bg-green-800'}`}
          >
            Calculate Emissions
          </button>
          
          {/* Results Section */}
          {results && (
            <div className={`mt-8 p-6 rounded text-center ${darkTheme ? 'bg-gray-700' : 'bg-green-50'}`}>
              <h2 className="text-xl font-bold mb-2">Your Annual Carbon Footprint</h2>
              <div className={`text-2xl font-bold my-3 ${darkTheme ? 'text-green-400' : 'text-green-700'}`}>
                {Math.round(results.totalEmissions)} kg CO₂e
              </div>
              <div className="mb-6">
                Your household's carbon footprint is approximately {Math.round(results.percentOfAvg)}% of an average Indian household's emissions.
              </div>
              
              <div className="text-left">
                <h3 className="text-lg font-bold mb-3">Emissions Breakdown</h3>
                {results.sources.map((source, index) => (
                  source.value > 0 && (
                    <div key={index} className={`flex justify-between py-2 ${index < results.sources.length - 1 ? 'border-b' : ''} ${darkTheme ? 'border-gray-600' : 'border-green-100'}`}>
                      <span>{source.name}</span>
                      <span>{Math.round(source.value)} kg CO₂e ({(source.value / results.totalEmissions * 100).toFixed(1)}%)</span>
                    </div>
                  )
                ))}
              </div>
              
              <div className={`mt-6 p-4 rounded ${darkTheme ? 'bg-gray-800' : 'bg-blue-50'}`}>
                <strong>Tip:</strong> {results.tip}
              </div>
            </div>

 
          )}
        </div>
      </div>

          {
            seen ? <div onClick={()=>{navigate(`/contentData/${forward}`)}} >Go To " CO2 Equivalents Calculator "</div> : <></>
          }


    </div>
  );
};

export default CarbonCalculator;