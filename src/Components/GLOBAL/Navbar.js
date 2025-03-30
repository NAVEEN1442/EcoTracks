import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import light from "../../assets/Navbar/lights.png";
import tree from "../../assets/Navbar/tree.png";

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tp = [
    { id: 1, path: "/content" },
    { id: 2, path: "/GetCarbon" },
    { id: 3, path: "/Dashboard" }
  ];
  


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sticky top-0 z-50 shadow-md py-4 px-6 flex items-center justify-between" style={{ backgroundColor: "#1D1916" }}>
      {/* Logo Section */}
      <div className="flex items-center">
        <span className="text-white font-extrabold text-3xl">E<span className="text-4xl">co</span>T<span className="text-4xl">rack</span></span>
      </div>

      {/* Navigation Links - Desktop */}
      <div className="hidden md:flex items-center space-x-8">
        {['track', 'scan', 'dashboard'].map((item) => (
          <div 
            key={item}
            onClick={() => { item == "track" ? navigate(`/content`) : item == "scan" ? navigate(`/carbon`) : navigate(`/Dashboard`) } }
            className="text-white font-semibold text-lg cursor-pointer transition duration-300 transform hover:scale-110 hover:text-green-400"
          >
            {item.toUpperCase().replace('-', ' ')}
          </div>
        ))}
      </div>

      {/* Login Button */}
      {/* <div className="hidden md:flex items-center">
        <Link to="/login" className="flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-full transition-transform transform hover:scale-110">
          <button className="font-medium text-lg">LOGIN</button>
        </Link>
      </div> */}

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button 
          onClick={toggleMenu}
          className="text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 right-0 left-0 shadow-md py-4 px-6 z-50" style={{ backgroundColor: "#1D1916" }}>
          {['track', 'scan', 'dashboard'].map((item) => (
            <div 
              key={item}
              onClick={() => {
                navigate(`/${item}`);
                setIsMenuOpen(false);
              }} 
              className="text-white font-semibold text-lg cursor-pointer py-2 transition duration-300 transform hover:scale-110 hover:text-green-400"
            >
              {item.toUpperCase().replace('-', ' ')}
            </div>
          ))}
          <Link 
            to="/login" 
            className="flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-full mt-4 w-max transition-transform transform hover:scale-110"
            onClick={() => setIsMenuOpen(false)}
          >
            <img src={light} alt="Light" className="h-5 mr-2" />
            <button className="font-medium text-lg">LOGIN</button>
            <img src={tree} alt="Tree" className="h-5 ml-2" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;