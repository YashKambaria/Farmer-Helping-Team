import React, { useEffect, useState } from 'react';
import { 
  // User, 
  MapPin, 
  Calendar, 
  Maximize, 
  Leaf, 
  BarChart2, 
  IndianRupee, 
  Droplets, 
  Thermometer, 
  CreditCard, 
  Cloud, 
  // Home,
  // ChevronRight,
  // ChevronLeft,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

// Dummy farmer data
const farmerData = {
  name: "Rajesh Patel",
  avatar: "",
  year: 2025,
  country: "India",
  region: "Gujarat",
  landSize: 12.5,
  soilType: "Black Cotton Soil",
  pastYield: 1850,
  cropTypes: ["Wheat", "Cotton", "Chickpeas"],
  annualIncome: 580000,
  soilPH: 6.8,
  nitrogenLevel: "Medium (320 kg/ha)",
  organicMatterLevel: "High (3.2%)",
  landQualityScore: 8.4,
  pastRainfall: 850,
  avgTemperature: 28.5,
  creditScore: 750
};

// Helper function to determine soil health status
const getSoilHealthStatus = (ph, nitrogen, organic) => {
  const phStatus = ph >= 6.0 && ph <= 7.5 ? "Optimal" : "Needs Attention";
  const nitrogenStatus = nitrogen.includes("Medium") || nitrogen.includes("High") ? "Good" : "Low";
  const organicStatus = organic.includes("High") ? "Excellent" : (organic.includes("Medium") ? "Good" : "Poor");
  
  return { phStatus, nitrogenStatus, organicStatus };
};

// Helper function to determine yield status
const getYieldStatus = (yield_) => {
  if (yield_ > 1800) return { status: "Excellent", color: "text-green-600" };
  if (yield_ > 1400) return { status: "Good", color: "text-blue-600" };
  if (yield_ > 1000) return { status: "Average", color: "text-yellow-600" };
  return { status: "Below Average", color: "text-red-600" };
};

// Helper function to determine credit status
const getCreditStatus = (score) => {
  if (score >= 750) return { status: "Excellent", color: "bg-green-500" };
  if (score >= 650) return { status: "Good", color: "bg-blue-500" };
  if (score >= 550) return { status: "Fair", color: "bg-yellow-500" };
  return { status: "Poor", color: "bg-red-500" };
};

export default function General({ darkMode }) {
  console.log("Hello world" + darkMode);
  const [activeTab, setActiveTab] = useState('overview');
  const soilHealth = getSoilHealthStatus(farmerData.soilPH, farmerData.nitrogenLevel, farmerData.organicMatterLevel);
  const yieldStatus = getYieldStatus(farmerData.pastYield);
  const creditStatus = getCreditStatus(farmerData.creditScore);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  useEffect(() => {
    console.log(darkMode);
  }, [darkMode])
  return (
    <div className={`"min-h-160 w-full mt-0 flex flex-col justify-end items-end sm:py-12 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
      <div className="relative py-3 sm:max-w-6xl sm:mx-auto w-1000 margin-auto mt-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`relative px-4 py-10 mx-8 md:mx-0 shadow-xl sm:rounded-3xl sm:p-10 ${darkMode ? "bg-gray-900" : "bg-white"}`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row">
              {/* Farmer Info Section */}
              <div className="md:w-1/3 flex flex-col items-center p-4 mr-10">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative mb-4"
                >
                  <img 
                    src={farmerData.avatar} 
                    alt={farmerData.name}
                    className="rounded-full w-32 h-32 object-cover border-4 border-green-500"
                  />
                  <div className={`absolute bottom-0 right-0 bg-green-500 rounded-full p-2 shadow-lg`}>
                    <Award size={20} className={darkMode ? "text-gray-800" : "text-white"} />
                  </div>
                </motion.div>
                
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}
                >
                  {farmerData.name}
                </motion.h1>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`flex items-center mt-2 ${darkMode ? "text-gray-100" : "text-gray-600"}`}
                >
                  <MapPin size={16} className="mr-2 text-green-600" />
                  <span>{farmerData.region}, {farmerData.country}</span>
                </motion.div>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className={`flex items-center mt-2 ${darkMode ? "text-gray-100" : "text-gray-600"}`}
                >
                  <Calendar size={16} className="mr-2 text-green-600" />
                  <span>Active since {farmerData.year}</span>
                </motion.div>
                
                <div className="mt-6 w-full">
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="bg-gray-200 rounded-full h-4 overflow-hidden"
                  >
                    <div 
                      className={`h-full ${creditStatus.color} rounded-full`}
                      style={{ width: `${(farmerData.creditScore / 850) * 100}%` }}
                    ></div>
                  </motion.div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className={darkMode ? "text-gray-100" : "text-gray-600"}>Credit Score</span>
                    <span className="font-medium">{farmerData.creditScore} ({creditStatus.status})</span>
                  </div>
                </div>
                
                <div className="mt-6 w-full">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className={`p-4 rounded-lg border ${
                      darkMode 
                        ? 'bg-teal-900 border-teal-700 text-teal-300' 
                        : 'bg-green-50 border-green-100 text-green-800'
                    }`}
                  >
                    <h3 className="font-medium mb-2 flex items-center">
                      <Leaf size={16} className="mr-2" />
                      Current Crops
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {farmerData.cropTypes.map((crop, index) => (
                        <span 
                          key={index} 
                          className={`px-2 py-1 rounded-full text-sm ${
                            darkMode ? 'bg-teal-800 text-green-300' : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {crop}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Tab Navigation and Content */}
              <div className="md:w-2/3 mt-8 md:mt-0">
                <div className="border-b border-gray-200">
                  <motion.nav 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex space-x-8"
                  >
                    {['overview', 'soil-health', 'yield', 'financial'].map((tab) => (
                     <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === tab
                            ? darkMode
                              ? 'border-green-400 text-green-300'
                              : 'border-green-500 text-green-600'
                            : darkMode
                              ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                      </button>
                    ))}
                  </motion.nav>
                </div>
                
                <div className="py-6">
                  {activeTab === 'overview' && (
                    <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <motion.div 
                      variants={itemVariants} 
                      className={`p-4 rounded-lg border ${
                        darkMode 
                          ? 'bg-blue-900 border-blue-700 text-blue-300' 
                          : 'bg-blue-50 border-blue-100 text-blue-800'
                      }`}
                    >
                      <h3 className="font-medium mb-2 flex items-center">
                        <Maximize size={16} className="mr-2" />
                        Land Details
                      </h3>
                      <p className={`text-sm ${!darkMode ? "text-gray-600" : "text-gray-300"}`}>
                        Size: <span className="font-medium">{farmerData.landSize} acres</span>
                      </p>
                      <p className={`text-sm ${!darkMode ? "text-gray-600" : "text-gray-300"}`}>
                        Soil Type: <span className="font-medium">{farmerData.soilType}</span>
                      </p>
                      <p className={`text-sm ${!darkMode ? "text-gray-600" : "text-gray-300"}`}>
                        Quality Score: <span className="font-medium">{farmerData.landQualityScore}/10</span>
                      </p>
                    </motion.div>
                  
                    <motion.div 
                      variants={itemVariants} 
                      className={`p-4 rounded-lg border ${
                        darkMode 
                          ? 'bg-amber-900 border-amber-700 text-amber-300' 
                          : 'bg-amber-50 border-amber-100 text-amber-800'
                      }`}
                    >
                      <h3 className="font-medium mb-2 flex items-center">
                        <BarChart2 size={16} className="mr-2" />
                        Yield Performance
                      </h3>
                      <p className={`text-sm ${!darkMode ? "text-gray-600" : "text-gray-300"}`}>
                        Last Season: <span className={`font-medium ${yieldStatus.color}`}>{farmerData.pastYield} kg/acre</span>
                      </p>
                      <p className={`text-sm ${!darkMode ? "text-gray-600" : "text-gray-300"}`}>
                        Status: <span className={`font-medium ${yieldStatus.color}`}>{yieldStatus.status}</span>
                      </p>
                    </motion.div>
                  
                    <motion.div 
                      variants={itemVariants} 
                      className={`p-4 rounded-lg border ${
                        darkMode 
                          ? 'bg-purple-900 border-purple-700 text-purple-300' 
                          : 'bg-purple-50 border-purple-100 text-purple-800'
                      }`}
                    >
                      <h3 className="font-medium mb-2 flex items-center">
                        <IndianRupee size={16} className="mr-2" />
                        Financial Overview
                      </h3>
                      <p className={`text-sm ${!darkMode ? "text-gray-600" : "text-gray-300"}`}>
                        Annual Income: <span className="font-medium">₹{farmerData.annualIncome.toLocaleString()}</span>
                      </p>
                      <p className={`text-sm ${!darkMode ? "text-gray-600" : "text-gray-300"}`}>
                        Income per Acre: <span className="font-medium">₹{Math.round(farmerData.annualIncome / farmerData.landSize).toLocaleString()}</span>
                      </p>
                    </motion.div>
                  
                    <motion.div 
                      variants={itemVariants} 
                      className={`p-4 rounded-lg border ${
                        darkMode 
                          ? 'bg-teal-900 border-teal-700 text-teal-300' 
                          : 'bg-teal-50 border-teal-100 text-teal-800'
                      }`}
                    >
                      <h3 className="font-medium mb-2 flex items-center">
                        <Cloud size={16} className="mr-2" />
                        Climate Data
                      </h3>
                      <p className={`text-sm ${!darkMode ? "text-gray-600" : "text-gray-300"}`}>
                        Rainfall: <span className="font-medium">{farmerData.pastRainfall} mm</span>
                      </p>
                      <p className={`text-sm ${!darkMode ? "text-gray-600" : "text-gray-300"}`}>
                        Avg Temperature: <span className="font-medium">{farmerData.avgTemperature}°C</span>
                      </p>
                    </motion.div>
                  </motion.div>
                  
                  )}
                  
                  {activeTab === 'soil-health' && (
                    <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={itemVariants} className="mb-6">
                      <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
                        Soil Health Analysis
                      </h3>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                        Comprehensive analysis of soil parameters that affect crop yield and quality.
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      variants={itemVariants} 
                      className={`rounded-lg border p-4 mb-6 ${
                        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center mb-4">
                        <div className="md:w-1/3">
                          <h4 className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Soil pH Level</h4>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Measures acidity or alkalinity</p>
                        </div>
                        <div className="md:w-2/3 mt-2 md:mt-0">
                          <div className="relative pt-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                                  darkMode ? 'text-green-300 bg-green-700' : 'text-green-600 bg-green-200'
                                }`}>
                                  {farmerData.soilPH} pH
                                </span>
                              </div>
                              <div className="text-right">
                                <span className={`text-xs font-semibold inline-block ${
                                  darkMode ? 'text-green-300' : 'text-green-600'
                                }`}>
                                  {soilHealth.phStatus}
                                </span>
                              </div>
                            </div>
                            <div className={`overflow-hidden h-2 mb-4 text-xs flex rounded mt-2 ${
                              darkMode ? 'bg-green-700' : 'bg-green-200'
                            }`}>
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(farmerData.soilPH / 14) * 100}%` }}
                                transition={{ duration: 1 }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                              ></motion.div>
                            </div>
                            <div className={`flex justify-between text-xs ${
                              darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              <span>Acidic (0)</span>
                              <span>Neutral (7)</span>
                              <span>Alkaline (14)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  
                    <motion.div 
                      variants={itemVariants} 
                      className={`rounded-lg border p-4 mb-6 ${
                        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center mb-4">
                        <div className="md:w-1/3">
                          <h4 className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Nitrogen Level</h4>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Essential for leaf growth</p>
                        </div>
                        <div className="md:w-2/3 mt-2 md:mt-0">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                                darkMode ? 'text-blue-300 bg-blue-700' : 'text-blue-600 bg-blue-200'
                              }`}>
                                {farmerData.nitrogenLevel}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className={`text-xs font-semibold inline-block ${
                                darkMode ? 'text-blue-300' : 'text-blue-600'
                              }`}>
                                {soilHealth.nitrogenStatus}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  
                    <motion.div 
                      variants={itemVariants} 
                      className={`rounded-lg border p-4 ${
                        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center mb-4">
                        <div className="md:w-1/3">
                          <h4 className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Organic Matter</h4>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Improves soil structure</p>
                        </div>
                        <div className="md:w-2/3 mt-2 md:mt-0">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                                darkMode ? 'text-purple-300 bg-purple-700' : 'text-purple-600 bg-purple-200'
                              }`}>
                                {farmerData.organicMatterLevel}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className={`text-xs font-semibold inline-block ${
                                darkMode ? 'text-purple-300' : 'text-purple-600'
                              }`}>
                                {soilHealth.organicStatus}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  )}
                  
                  {activeTab === 'yield' && (
                    <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className={`space-y-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}
                  >
                    <motion.div variants={itemVariants}>
                      <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        Yield Performance
                      </h3>
                      <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Analysis of crop yield and performance metrics.
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      variants={itemVariants}
                      className={`p-6 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                    >
                      <div className="flex items-center mb-4">
                        <BarChart2 size={24} className={`mr-3 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                        <h4 className="text-xl font-medium">Past Season Yield</h4>
                      </div>
                      
                      <div className="flex items-end mt-4">
                        <div className={`text-3xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          {farmerData.pastYield}
                        </div>
                        <div className={`ml-2 pb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>kg per acre</div>
                      </div>
                      
                      <div className={`mt-2 text-sm ${yieldStatus.color}`}>
                        {yieldStatus.status} (compared to regional average)
                      </div>
                      
                      <div className="mt-8">
                        <h5 className="font-medium mb-2">Yield by Crop Type</h5>
                        <div className="space-y-4">
                          {farmerData.cropTypes.map((crop, index) => {
                            const cropYield = farmerData.pastYield * (0.8 + (index * 0.15));
                            const percentage = (cropYield / (farmerData.pastYield * 1.5)) * 100;
                            
                            return (
                              <div key={index}>
                                <div className="flex justify-between mb-1">
                                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {crop}
                                  </span>
                                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {Math.round(cropYield)} kg/acre
                                  </span>
                                </div>
                                <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 1, delay: 0.1 * index }}
                                    className={`h-2 rounded-full ${index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-purple-500'}`}
                                  ></motion.div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <h5 className="font-medium mb-2">Factors Affecting Yield</h5>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <div className={`flex-shrink-0 h-5 w-5 ${darkMode ? 'text-green-400' : 'text-green-500'}`}>
                              <Droplets size={18} className="h-5 w-5" />
                            </div>
                            <p className={`ml-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              <span className="font-medium">Rainfall:</span> {farmerData.pastRainfall} mm (adequate for chosen crops)
                            </p>
                          </li>
                          <li className="flex items-start">
                            <div className={`flex-shrink-0 h-5 w-5 ${darkMode ? 'text-green-400' : 'text-green-500'}`}>
                              <Thermometer size={18} className="h-5 w-5" />
                            </div>
                            <p className={`ml-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              <span className="font-medium">Temperature:</span> {farmerData.avgTemperature}°C (optimal range)
                            </p>
                          </li>
                          <li className="flex items-start">
                            <div className={`flex-shrink-0 h-5 w-5 ${darkMode ? 'text-green-400' : 'text-green-500'}`}>
                              <Leaf size={18} className="h-5 w-5" />
                            </div>
                            <p className={`ml-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              <span className="font-medium">Soil Quality:</span> {farmerData.landQualityScore}/10 (above average)
                            </p>
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  )}
                  
                  {activeTab === 'financial' && (
                    <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className={`space-y-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}
                  >
                    <motion.div variants={itemVariants}>
                      <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        Financial Overview
                      </h3>
                      <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Summary of financial performance and credit status.
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      variants={itemVariants}
                      className={`p-6 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                    >
                      <div className="mb-8">
                        <div className="flex items-center mb-4">
                          <IndianRupee size={24} className={`mr-3 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                          <h4 className="text-xl font-medium">Annual Income</h4>
                        </div>
                        
                        <div className="flex items-end">
                          <div className={`text-3xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            ₹{farmerData.annualIncome.toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Income per Acre</div>
                            <div className="text-lg font-semibold mt-1">
                              ₹{Math.round(farmerData.annualIncome / farmerData.landSize).toLocaleString()}
                            </div>
                          </div>
                          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Income per Crop</div>
                            <div className="text-lg font-semibold mt-1">
                              ₹{Math.round(farmerData.annualIncome / farmerData.cropTypes.length).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`border-t pt-6 mb-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className="flex items-center mb-4">
                          <CreditCard size={24} className={`mr-3 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                          <h4 className="text-xl font-medium">Credit Profile</h4>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex justify-between mb-1 text-sm font-medium">
                            <span>Credit Score: {farmerData.creditScore}</span>
                            <span className={`${
                              creditStatus.status === 'Excellent' ? 'text-green-500' : 
                              creditStatus.status === 'Good' ? 'text-blue-500' : 
                              creditStatus.status === 'Fair' ? 'text-yellow-500' : 'text-red-500'
                            }`}>
                              {creditStatus.status}
                            </span>
                          </div>
                          <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(farmerData.creditScore / 850) * 100}%` }}
                              transition={{ duration: 1 }}
                              className={`h-2 ${creditStatus.color}`}
                            ></motion.div>
                          </div>
                          <div className={`flex justify-between text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <span>Poor</span>
                            <span>Fair</span>
                            <span>Good</span>
                            <span>Excellent</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Loan Eligibility</div>
                            <div className={`text-lg font-semibold mt-1 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                              Up to ₹{(farmerData.creditScore / 100 * 200000).toLocaleString()}
                            </div>
                          </div>
                          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Estimated Interest Rate</div>
                            <div className="text-lg font-semibold mt-1">
                              {farmerData.creditScore >= 750 ? '7.5%' : 
                               farmerData.creditScore >= 650 ? '9.0%' : 
                               farmerData.creditScore >= 550 ? '12.0%' : '15.0%'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}