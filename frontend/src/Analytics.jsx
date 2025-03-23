import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

export default function Analytics({ darkMode }) {
  // Chart references
  const cropDistributionRef = useRef(null);
  const soilMetricsRef = useRef(null);
  const climateDataRef = useRef(null);
  const performanceRef = useRef(null);

  // Add state for loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Default farmer data
  const [farmerData, setFarmerData] = useState({
    name: "Rajesh Patel",
    avatar: "/api/placeholder/150/150",
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
  });

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem("token");
        
        if (!token) {
          setError("Authentication token not found. Please login again.");
          setLoading(false);
          return;
        }
        
        const response = await axios.get("http://localhost:8080/user/getUser", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Get user data from response
        const userData = response.data;
        
        // Only update the farmerData if we have user data
        if (userData) {
          setFarmerData(prevData => ({
            ...prevData,
            name: userData.name || prevData.name,
            country: userData.country || prevData.country,
            region: userData.region || prevData.region,
            landSize: userData.landSize || prevData.landSize,
            soilType: userData.soilType || prevData.soilType,
            pastYield: userData.pastYield || prevData.pastYield,
            cropTypes: userData.cropTypes ? userData.cropTypes.split(",").map(crop => crop.trim()) : prevData.cropTypes,
            annualIncome: userData.annualIncome || prevData.annualIncome,
            year: userData.year || prevData.year
          }));
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load farmer data. Using default data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Assumed crop distribution (since we don't have exact percentages)
  const cropDistribution = [45, 35, 20]; // Wheat, Cotton, Chickpeas in percentages

  // For performance metrics chart - simulated data for comparison
  const regionalAvg = {
    yield: 1500,
    income: 450000,
    landQuality: 7.2
  };

  useEffect(() => {
    // Don't initialize charts until loading is complete
    if (loading) return;
    
    // Theme colors based on dark mode
    const textColor = darkMode ? '#ffffff' : '#333333';
    const gridColor = darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    
    // Set global chart options for dark mode
    Chart.defaults.color = textColor;
    Chart.defaults.borderColor = gridColor;

    // 1. Crop Distribution Chart
    const cropChart = new Chart(cropDistributionRef.current, {
      type: 'doughnut',
      data: {
        labels: farmerData.cropTypes,
        datasets: [{
          data: cropDistribution,
          backgroundColor: [
            '#4CAF50', // Green for Wheat
            '#FFC107', // Amber for Cotton
            '#2196F3'  // Blue for Chickpeas
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Crop Distribution'
          }
        }
      }
    });

    // 2. Soil Metrics Chart
    const soilChart = new Chart(soilMetricsRef.current, {
      type: 'radar',
      data: {
        labels: ['Soil pH', 'Nitrogen Level', 'Organic Matter', 'Land Quality'],
        datasets: [{
          label: 'Current Farm',
          data: [farmerData.soilPH, 6.4, 8.0, farmerData.landQualityScore],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        }, {
          label: 'Optimal Range',
          data: [7, 7, 7.5, 9],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        }]
      },
      options: {
        scales: {
          r: {
            beginAtZero: true,
            max: 10,
            ticks: {
              stepSize: 2
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Soil Quality Metrics'
          }
        }
      }
    });

    // 3. Climate Data Chart
    const climateChart = new Chart(climateDataRef.current, {
      type: 'bar',
      data: {
        labels: ['Rainfall (mm)', 'Avg Temperature (°C)'],
        datasets: [{
          label: farmerData.year.toString(),
          data: [farmerData.pastRainfall, farmerData.avgTemperature],
          backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 159, 64, 0.5)'],
          borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 159, 64, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Climate Data'
          }
        }
      }
    });

    // 4. Performance Metrics Chart
    const performanceChart = new Chart(performanceRef.current, {
      type: 'bar',
      data: {
        labels: ['Yield (kg/ha)', 'Annual Income (₹/10000)', 'Land Quality Score'],
        datasets: [{
          label: 'Your Farm',
          data: [farmerData.pastYield, farmerData.annualIncome/10000, farmerData.landQualityScore],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }, {
          label: 'Regional Average',
          data: [regionalAvg.yield, regionalAvg.income/10000, regionalAvg.landQuality],
          backgroundColor: 'rgba(153, 102, 255, 0.5)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Performance Comparison'
          }
        }
      }
    });

    // Cleanup function
    return () => {
      cropChart.destroy();
      soilChart.destroy();
      climateChart.destroy();
      performanceChart.destroy();
    };
  }, [darkMode, farmerData, loading]);

  if (loading) {
    return (
      <div className={`min-h-screen flex justify-center items-center ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className={`min-h-screen w-300 ml-10 mt-16 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
        {/* Farmer Profile Header */}
        <div className={`px-4 py-6 mb-6 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0">
                <img
                  src={`/farmer.jpg`}
                  alt={farmerData.name}
                  className="rounded-full h-24 w-24 object-cover border-2 border-gray-300"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl font-bold">{farmerData.name}</h2>
                <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-1`}>
                  {farmerData.region}, {farmerData.country} • {farmerData.landSize} hectares
                </p>
                <p>Soil Type: {farmerData.soilType}</p>
              </div>
              <div className="w-full md:w-72">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Credit Score</span>
                  <span className="font-semibold">{farmerData.creditScore}/850</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className={`h-2.5 rounded-full ${
                      farmerData.creditScore > 700 ? "bg-green-600" : 
                      farmerData.creditScore > 600 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${(farmerData.creditScore / 850) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className={`rounded-lg shadow-md p-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Annual Income</h3>
              <p className="text-2xl font-bold mt-1">₹{farmerData.annualIncome.toLocaleString()}</p>
              <p className="text-green-500 text-sm mt-2">+15% from last year</p>
            </div>
            <div className={`rounded-lg shadow-md p-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Land Quality</h3>
              <p className="text-2xl font-bold mt-1">{farmerData.landQualityScore}/10</p>
              <p className="text-blue-500 text-sm mt-2">Above regional average</p>
            </div>
            <div className={`rounded-lg shadow-md p-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Past Yield</h3>
              <p className="text-2xl font-bold mt-1">{farmerData.pastYield} kg/ha</p>
              <p className="text-green-500 text-sm mt-2">+23% from expected</p>
            </div>
            <div className={`rounded-lg shadow-md p-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Soil pH</h3>
              <p className="text-2xl font-bold mt-1">{farmerData.soilPH}</p>
              <p className="text-yellow-500 text-sm mt-2">Slightly acidic (ideal: 7.0)</p>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className={`rounded-lg shadow-md p-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <canvas ref={cropDistributionRef}></canvas>
            </div>
            <div className={`rounded-lg shadow-md p-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <canvas ref={soilMetricsRef}></canvas>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className={`rounded-lg shadow-md p-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <canvas ref={climateDataRef}></canvas>
            </div>
            <div className={`rounded-lg shadow-md p-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <canvas ref={performanceRef}></canvas>
            </div>
          </div>

          {/* Farm Recommendations */}
          <div className={`rounded-lg shadow-md mb-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className={`px-4 py-3 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
              <h3 className="text-lg font-medium">Recommendations</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Soil Improvement</h4>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    Add lime to increase soil pH by 0.2 points for optimal crop growth.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Crop Rotation</h4>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    Consider adding pulses next season to naturally improve nitrogen levels.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Water Management</h4>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    Install drip irrigation to improve water efficiency by up to 30%.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Forecast (Additional Section) */}
          <div className={`rounded-lg shadow-md mb-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className={`px-4 py-3 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
              <h3 className="text-lg font-medium">7-Day Weather Forecast</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-7 gap-2">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {new Date(Date.now() + i * 86400000).toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <img 
                      src={`/icons/weather/${i === 0 ? 'sunny' : i === 1 ? 'cloudy' : i === 2 ? 'rainy' : 'partly-cloudy'}.svg`} 
                      alt="Weather" 
                      className="w-8 h-8 my-2"
                    />
                    <span className="font-medium">{Math.round(25 + Math.sin(i) * 4)}°C</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}