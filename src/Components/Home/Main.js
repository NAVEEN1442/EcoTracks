import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EcoTrack() {
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <div className={`${theme === 'light' ? 'bg-stone-50 text-stone-800' : 'bg-stone-900 text-stone-100'} min-h-screen transition-colors duration-300`}>
      {/* Background gradient - soft beige/cream instead of blues/greens */}
      <div className={`fixed inset-0 bg-gradient-to-r from-amber-50 via-stone-100 to-orange-50 ${theme === 'light' ? 'opacity-20' : 'opacity-10'} -z-10`}></div>
      
      {/* Theme toggle button - increased top margin */}
      <button 
        onClick={toggleTheme}
        className={`fixed top-20 right-5 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
          theme === 'light' 
            ? 'bg-white/20 hover:bg-white/30' 
            : 'bg-black/20 hover:bg-black/30'
        } backdrop-blur-sm`}
      >
        {theme === 'light' ? '🌞' : '🌙'}
      </button>

      {/* Hero Section */}
      <section className={`container mx-auto px-5 py-16 text-center ${
        theme === 'light' 
          ? 'bg-white/70' 
          : 'bg-stone-800/70'
        } backdrop-blur-md rounded-xl mb-5 max-w-6xl shadow-lg`}>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Track Your <span className={`${theme === 'light' ? 'text-amber-600' : 'text-amber-400'}`}>Carbon Footprint</span>
          </h1>
          <p className={`text-lg mb-8 ${theme === 'light' ? 'text-stone-600' : 'text-stone-300'} max-w-2xl mx-auto`}>
            Use AI-powered tracking to monitor and reduce your environmental impact with every purchase you make.
          </p>
          <button onClick={()=>{navigate("/content")}} className={`px-7 py-3 rounded-full font-semibold ${
            theme === 'light'
              ? 'bg-gradient-to-r from-amber-500 to-orange-400 text-white shadow-md shadow-amber-200/50 hover:shadow-lg hover:shadow-amber-300/50'
              : 'bg-gradient-to-r from-amber-400 to-orange-300 text-stone-800 shadow-md shadow-amber-900/20 hover:shadow-lg hover:shadow-amber-800/30'
          } transition-all duration-300 hover:-translate-y-0.5`}>
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-5 py-20">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 inline-block relative ${theme === 'light' ? 'text-stone-800' : 'text-stone-100'}`}>
            Key Features
            {/* Removed the red line span that was here */}
          </h2>
          <p className={`mt-4 ${theme === 'light' ? 'text-stone-600' : 'text-stone-300'} max-w-2xl mx-auto`}>
            EcoTrack makes it simple to understand and reduce the environmental impact of your everyday purchases.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {/* Feature Card 1 */}
          <div className={`p-8 rounded-xl ${
            theme === 'light' 
              ? 'bg-white/90 border border-stone-200' 
              : 'bg-stone-800/80 border border-stone-700'
          } backdrop-blur-sm shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
            <div className={`text-4xl mb-5 ${theme === 'light' ? 'text-amber-500' : 'text-amber-400'}`}>📷</div>
            <h3 className="text-xl font-semibold mb-4">Scan & Track</h3>
            <p className={`${theme === 'light' ? 'text-stone-600' : 'text-stone-300'}`}>
              Simply scan receipts or product barcodes to automatically track the carbon footprint of your purchases.
            </p>
          </div>
          
          {/* Feature Card 2 */}
          <div className={`p-8 rounded-xl ${
            theme === 'light' 
              ? 'bg-white/90 border border-stone-200' 
              : 'bg-stone-800/80 border border-stone-700'
          } backdrop-blur-sm shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
            <div className={`text-4xl mb-5 ${theme === 'light' ? 'text-amber-500' : 'text-amber-400'}`}>📊</div>
            <h3 className="text-xl font-semibold mb-4">Carbon Analysis</h3>
            <p className={`${theme === 'light' ? 'text-stone-600' : 'text-stone-300'}`}>
              Get detailed insights into the environmental impact of products using our advanced CO2 calculation engine.
            </p>
          </div>
          
          {/* Feature Card 3 */}
          <div className={`p-8 rounded-xl ${
            theme === 'light' 
              ? 'bg-white/90 border border-stone-200' 
              : 'bg-stone-800/80 border border-stone-700'
          } backdrop-blur-sm shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
            <div className={`text-4xl mb-5 ${theme === 'light' ? 'text-amber-500' : 'text-amber-400'}`}>💡</div>
            <h3 className="text-xl font-semibold mb-4">Eco Alternatives</h3>
            <p className={`${theme === 'light' ? 'text-stone-600' : 'text-stone-300'}`}>
              Discover more sustainable product alternatives that reduce your environmental impact.
            </p>
          </div>
          
          {/* Feature Card 4 */}
          <div className={`p-8 rounded-xl ${
            theme === 'light' 
              ? 'bg-white/90 border border-stone-200' 
              : 'bg-stone-800/80 border border-stone-700'
          } backdrop-blur-sm shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
            <div className={`text-4xl mb-5 ${theme === 'light' ? 'text-amber-500' : 'text-amber-400'}`}>🌱</div>
            <h3 className="text-xl font-semibold mb-4">Progress Tracking</h3>
            <p className={`${theme === 'light' ? 'text-stone-600' : 'text-stone-300'}`}>
              Monitor your monthly carbon savings and see the positive difference you're making over time.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`py-20 ${
        theme === 'light' 
          ? 'bg-stone-100/70' 
          : 'bg-stone-800/70'
      } backdrop-blur-sm`}>
        <div className="container mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 inline-block relative ${theme === 'light' ? 'text-stone-800' : 'text-stone-100'}`}>
              How EcoTrack Works
              {/* Removed the red line span that was here */}
            </h2>
            <p className={`mt-4 ${theme === 'light' ? 'text-stone-600' : 'text-stone-300'} max-w-2xl mx-auto`}>
              Our AI-powered app makes tracking your carbon footprint simple and actionable
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-10 mt-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className={`w-12 h-12 rounded-full ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-400 text-white shadow-md shadow-amber-200/50'
                  : 'bg-gradient-to-r from-amber-400 to-orange-300 text-stone-800 shadow-md shadow-amber-900/20'
              } flex items-center justify-center text-xl font-bold mb-5`}>1</div>
              <h3 className="text-lg font-semibold mb-3">Scan Receipt or Barcode</h3>
              <p className={`${theme === 'light' ? 'text-stone-600' : 'text-stone-300'}`}>
                Use your phone to scan receipts or product barcodes while shopping.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className={`w-12 h-12 rounded-full ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-400 text-white shadow-md shadow-amber-200/50'
                  : 'bg-gradient-to-r from-amber-400 to-orange-300 text-stone-800 shadow-md shadow-amber-900/20'
              } flex items-center justify-center text-xl font-bold mb-5`}>2</div>
              <h3 className="text-lg font-semibold mb-3">AI Analysis</h3>
              <p className={`${theme === 'light' ? 'text-stone-600' : 'text-stone-300'}`}>
                Our AI extracts purchase data and calculates the carbon footprint using the Open CO2 API.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className={`w-12 h-12 rounded-full ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-400 text-white shadow-md shadow-amber-200/50'
                  : 'bg-gradient-to-r from-amber-400 to-orange-300 text-stone-800 shadow-md shadow-amber-900/20'
              } flex items-center justify-center text-xl font-bold mb-5`}>3</div>
              <h3 className="text-lg font-semibold mb-3">Get Recommendations</h3>
              <p className={`${theme === 'light' ? 'text-stone-600' : 'text-stone-300'}`}>
                Receive personalized suggestions for more sustainable alternatives.
              </p>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className={`w-12 h-12 rounded-full ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-400 text-white shadow-md shadow-amber-200/50'
                  : 'bg-gradient-to-r from-amber-400 to-orange-300 text-stone-800 shadow-md shadow-amber-900/20'
              } flex items-center justify-center text-xl font-bold mb-5`}>4</div>
              <h3 className="text-lg font-semibold mb-3">Track Progress</h3>
              <p className={`${theme === 'light' ? 'text-stone-600' : 'text-stone-300'}`}>
                Watch your carbon savings grow over time and celebrate your positive impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-5 py-20">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 inline-block relative ${theme === 'light' ? 'text-stone-800' : 'text-stone-100'}`}>
            Making a Difference Together
            {/* Removed the red line span that was here */}
          </h2>
          <p className={`mt-4 ${theme === 'light' ? 'text-stone-600' : 'text-stone-300'} max-w-2xl mx-auto`}>
            Join thousands of environmentally conscious consumers reducing their carbon footprint
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {/* Stat Card 1 */}
          <div className={`p-8 rounded-xl ${
            theme === 'light' 
              ? 'bg-white/90 border border-stone-200' 
              : 'bg-stone-800/80 border border-stone-700'
          } backdrop-blur-sm shadow-md`}>
            <div className={`text-4xl font-bold mb-3 ${theme === 'light' ? 'text-amber-500' : 'text-amber-400'}`}>25%</div>
            <div className={`${theme === 'light' ? 'text-stone-600' : 'text-stone-300'}`}>
              Average reduction in carbon footprint among our users
            </div>
          </div>
          
          {/* Stat Card 2 */}
          <div className={`p-8 rounded-xl ${
            theme === 'light' 
              ? 'bg-white/90 border border-stone-200' 
              : 'bg-stone-800/80 border border-stone-700'
          } backdrop-blur-sm shadow-md`}>
            <div className={`text-4xl font-bold mb-3 ${theme === 'light' ? 'text-amber-500' : 'text-amber-400'}`}>10K+</div>
            <div className={`${theme === 'light' ? 'text-stone-600' : 'text-stone-300'}`}>
              Products in our sustainable alternatives database
            </div>
          </div>
          
          {/* Stat Card 3 */}
          <div className={`p-8 rounded-xl ${
            theme === 'light' 
              ? 'bg-white/90 border border-stone-200' 
              : 'bg-stone-800/80 border border-stone-700'
          } backdrop-blur-sm shadow-md`}>
            <div className={`text-4xl font-bold mb-3 ${theme === 'light' ? 'text-amber-500' : 'text-amber-400'}`}>5M+</div>
            <div className={`${theme === 'light' ? 'text-stone-600' : 'text-stone-300'}`}>
              Kg of CO2 emissions saved by our community
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`container mx-auto px-5 py-20 text-center ${
        theme === 'light' 
          ? 'bg-white/70' 
          : 'bg-stone-800/70'
        } backdrop-blur-md rounded-xl mb-20 max-w-6xl shadow-lg`}>
        <h2 className={`text-3xl md:text-4xl font-bold mb-5 ${theme === 'light' ? 'text-stone-800' : 'text-stone-100'}`}>
          Ready to Reduce Your Carbon Footprint?
        </h2>
        <p className={`${theme === 'light' ? 'text-stone-600' : 'text-stone-300'} mb-8 max-w-2xl mx-auto`}>
          Join thousands of eco-conscious consumers making a positive impact on the planet with every purchase.
        </p>
        <button className={`px-7 py-3 rounded-full font-semibold ${
          theme === 'light'
            ? 'bg-gradient-to-r from-amber-500 to-orange-400 text-white shadow-md shadow-amber-200/50 hover:shadow-lg hover:shadow-amber-300/50'
            : 'bg-gradient-to-r from-amber-400 to-orange-300 text-stone-800 shadow-md shadow-amber-900/20 hover:shadow-lg hover:shadow-amber-800/30'
        } transition-all duration-300 hover:-translate-y-0.5`}>
          Download EcoTrack
        </button>
      </section>

      {/* Footer */}
      <footer className={`${
        theme === 'light'
          ? 'bg-gradient-to-r from-amber-100/90 via-orange-50/90 to-amber-50/90'
          : 'bg-gradient-to-r from-stone-800/70 via-stone-800/70 to-stone-800/70'
      } backdrop-blur-md text-${theme === 'light' ? 'stone-800' : 'white'} py-10`}>
        <div className="container mx-auto px-5">
          <div className="flex flex-wrap justify-between gap-10">
            {/* Column 1 */}
            <div className="flex-1 min-w-[200px]">
              <div className="text-2xl font-bold mb-5">EcoTrack</div>
              <p className={`mb-5 ${theme === 'light' ? 'text-stone-600' : 'text-stone-300'}`}>
                Making sustainable shopping choices easy and accessible for everyone.
              </p>
              
            </div>
            
            {/* Column 2 */}
            <div className="flex-1 min-w-[200px]">
              <h3 className="text-lg font-semibold mb-5">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className={`${theme === 'light' ? 'text-stone-600 hover:text-stone-800' : 'text-stone-300 hover:text-white'} transition-colors`}>Features</a></li>
                <li><a href="#" className={`${theme === 'light' ? 'text-stone-600 hover:text-stone-800' : 'text-stone-300 hover:text-white'} transition-colors`}>Pricing</a></li>
                <li><a href="#" className={`${theme === 'light' ? 'text-stone-600 hover:text-stone-800' : 'text-stone-300 hover:text-white'} transition-colors`}>Download</a></li>
                <li><a href="#" className={`${theme === 'light' ? 'text-stone-600 hover:text-stone-800' : 'text-stone-300 hover:text-white'} transition-colors`}>Updates</a></li>
              </ul>
            </div>
            
            {/* Column 3 */}
            <div className="flex-1 min-w-[200px]">
              <h3 className="text-lg font-semibold mb-5">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className={`${theme === 'light' ? 'text-stone-600 hover:text-stone-800' : 'text-stone-300 hover:text-white'} transition-colors`}>About Us</a></li>
                <li><a href="#" className={`${theme === 'light' ? 'text-stone-600 hover:text-stone-800' : 'text-stone-300 hover:text-white'} transition-colors`}>Sustainability</a></li>
                <li><a href="#" className={`${theme === 'light' ? 'text-stone-600 hover:text-stone-800' : 'text-stone-300 hover:text-white'} transition-colors`}>Careers</a></li>
                <li><a href="#" className={`${theme === 'light' ? 'text-stone-600 hover:text-stone-800' : 'text-stone-300 hover:text-white'} transition-colors`}>Press</a></li>
              </ul>
            </div>
            
            {/* Column 4 */}
            <div className="flex-1 min-w-[200px]">
              <h3 className="text-lg font-semibold mb-5">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className={`${theme === 'light' ? 'text-stone-600 hover:text-stone-800' : 'text-stone-300 hover:text-white'} transition-colors`}>Help Center</a></li>
                <li><a href="#" className={`${theme === 'light' ? 'text-stone-600 hover:text-stone-800' : 'text-stone-300 hover:text-white'} transition-colors`}>Contact Us</a></li>
                <li><a href="#" className={`${theme === 'light' ? 'text-stone-600 hover:text-stone-800' : 'text-stone-300 hover:text-white'} transition-colors`}>Privacy Policy</a></li>
                <li><a href="#" className={`${theme === 'light' ? 'text-stone-600 hover:text-stone-800' : 'text-stone-300 hover:text-white'} transition-colors`}>Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-10 pt-5 border-t border-stone-200 dark:border-stone-700">
            <p>&copy; 2025 EcoTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default EcoTrack;