import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addData } from '../slices/dataSlice';
import { useParams } from 'react-router-dom';

const CO2Calculator = () => {


  const { id } = useParams();

  console.log(id);

  const [co2Amount, setCo2Amount] = useState(id);
  const [results, setResults] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);



  // Calculate CO2 equivalents
  const calculateCO2Equivalents = () => {
    if (isNaN(co2Amount) || co2Amount <= 0) {
      setResults("Please enter a valid number");
      return;
    }
    
    // CO2 equivalents
    const carKm = Math.round(co2Amount / 0.12); // Average petrol car
    const flightKm = Math.round(co2Amount / 0.09); // Average per passenger
    const treeDays = Math.round(co2Amount / 0.022); // kg absorbed per day by mature tree
    const treeYears = (treeDays / 365).toFixed(1);
    const homePowerDays = Math.round(co2Amount / 12); // Average home daily usage
    const smartphoneCharges = Math.round(co2Amount / 0.005); // Charging a smartphone
    const beefKg = (co2Amount / 27).toFixed(1); // kg of beef production
    const recycledPlasticBottles = Math.round(co2Amount / 0.082); // 500ml plastic bottles recycled vs. produced new
    
    let result = `
      ${co2Amount} kg of CO₂ is equivalent to:
      • ${carKm.toLocaleString()} km driven in an average car
      • ${flightKm.toLocaleString()} km flown by a single passenger
      • Carbon absorbed by a tree in ${treeDays.toLocaleString()} days (${treeYears} years)
      • Electricity used by an average home in ${homePowerDays.toLocaleString()} days
      • Charging a smartphone ${smartphoneCharges.toLocaleString()} times
      • The production of ${beefKg} kg of beef
      • The emissions saved by recycling ${recycledPlasticBottles.toLocaleString()} plastic bottles
    `;

    setResults(result);
  };

  // Toggle dark/light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Initialize calculation on component mount and when `co2Amount` changes
  useEffect(() => {
    calculateCO2Equivalents();
  }, [co2Amount]);

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'dark:bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto">
        <div className={`max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg ${isDarkMode ? 'dark:bg-gray-800 dark:border-gray-700' : 'bg-white border border-gray-200'}`}>
          {/* Theme toggle button */}
          <div className="flex justify-end mb-4">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}
            >
              {isDarkMode ? '☀' : '🌙'}
            </button>
          </div>
          
          {/* Header */}
          <div className={`text-center mb-6 pb-4 border-b-2 ${isDarkMode ? 'border-green-500 dark:text-white' : 'border-green-600 text-gray-800'}`}>
            <h2 className="text-2xl font-bold text-green-600">
              CO<sub>2</sub> Equivalents Calculator
            </h2>
            <p className={`mt-2 ${isDarkMode ? 'dark:text-gray-300' : 'text-gray-600'}`}>
              Visualize what your carbon emissions mean in everyday terms
            </p>
          </div>
          
          {/* Input */}
          <div className="mb-4">
            <label 
              htmlFor="co2-amount" 
              className={`block mb-2 font-semibold ${isDarkMode ? 'dark:text-white' : 'text-gray-700'}`}
            >
              CO<sub>2</sub> Amount (kg)
            </label>
            <input
              defaultValue={co2Amount}
              id="co2-amount"
              value={co2Amount}
              onChange={(e) => setCo2Amount(parseFloat(e.target.value))}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'bg-white border-gray-300'}`}
            />
          </div>
          
          {/* Button */}
          <button
            onClick={calculateCO2Equivalents}
            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-colors"
          >
            Calculate Equivalents
          </button>
          
          {/* Results */}
          <div className={`mt-6 p-4 rounded-md whitespace-pre-line ${isDarkMode ? 'bg-green-900/20 dark:text-white' : 'bg-green-50 text-gray-800'}`}>
            {results}
          </div>
          
          {/* Info Box */}
          <div className={`mt-6 p-4 text-sm rounded-md ${isDarkMode ? 'bg-gray-700 dark:text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
            This calculator helps you understand what your CO<sub>2</sub> emissions are equivalent to in terms of everyday activities and environmental impacts.
          </div>
          
          {/* Footer */}
          <div className={`mt-6 pt-4 text-center text-sm border-t ${isDarkMode ? 'border-gray-700 dark:text-gray-400' : 'border-gray-200 text-gray-500'}`}>
            © 2025 CO<sub>2</sub> Equivalents Calculator | For educational purposes
          </div>
        </div>
      </div>
    </div>
  );
};

export default CO2Calculator;
