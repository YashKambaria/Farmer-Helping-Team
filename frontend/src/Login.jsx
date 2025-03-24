import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { motion } from "framer-motion";

export default function Login({ darkMode }) {
    const { accessReason } = useContext(AuthContext);
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("farmer");
    const [error, setError] = useState("");

    // Dark mode classes - matched with Signup.jsx
    const bgClass = darkMode 
        ? "bg-gray-900 text-white"
        : "bg-white text-gray-800";
        
    const cardBgClass = darkMode 
        ? "bg-gray-800 shadow-xl" 
        : "bg-white shadow-xl";
        
    const labelClass = darkMode 
        ? "text-gray-300" 
        : "text-gray-700";
        
    const inputBgClass = darkMode 
        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-green-500 focus:border-green-500" 
        : "bg-white border-gray-300 text-gray-900 focus:ring-green-500 focus:border-green-500";
        
    const iconClass = darkMode 
        ? "text-gray-400" 
        : "text-gray-500";
        
    const headerBgClass = darkMode 
        ? "bg-green-700" 
        : "bg-green-600";
    
    const headingClass = darkMode
        ? "text-white"
        : "text-gray-800";

    let alertBox = "";
    useEffect(() => {
        if (accessReason == "!login") {
            alertBox = (
                <div className="fixed top-5 left-1/2 transform -translate-x-1/2 w-fit max-w-lg bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] flex items-center justify-between animate-fade-in">
                    <span className="font-semibold">You need to login first!</span>
                    <button 
                        className="ml-4 bg-red-800 px-2 py-1 rounded-md hover:bg-red-700 transition"
                        onClick={() => setError("")}
                    >
                        ✖
                    </button>
                </div>
            );
        }
    }, [accessReason]);

    const handleLogin = async () => {
        setError("");

        // Basic validation
        if (!name || !password) {
            setError("Username and password are required!");
            return;
        }

        try {
            const response = await axios.post(
                userType === 'farmer' ? "http://localhost:8080/public/login" : "http://localhost:8080/public/blogin",
                userType === 'farmer' ? { name, password } : { bankName: name, bankCredentials: password },
                {
                    headers: { "Content-Type": "application/json" },
                    responseType: "text",
                }
            );

            // console.log("The response: " + JSON.stringify(response));
            const token = response.data;

            if (response.status == 200) {
                setIsLoggedIn(true);
                localStorage.setItem("isLoggedIn", "true"); 
                localStorage.setItem("token", token);
                localStorage.setItem("userType", userType);
                // console.log(localStorage.getItem("userType"));
                alert("Login successful");
                navigate("/");
            } else {
                alert("Login failed");
            }
        } catch (err) {
            setError(err.response?.data || "Login failed. Try again.");
        }
    };

    return (
        <>
            {alertBox}
            <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-green-50 to-green-100"} py-12 px-4 sm:px-6 lg:px-8`}>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`max-w-md w-full rounded-xl overflow-hidden ${cardBgClass} `}
                >
                    <div className={` py-4 px-6 ${userType === "farmer"
                                        ? `${darkMode ? 'bg-green-700' : 'bg-green-600'} text-white`
                                        : `${darkMode ? 'bg-blue-700' : 'bg-blue-600'} text-white`
                                }`}>
                        <h1 className="text-2xl font-bold text-white text-center">
                            {userType === "farmer" ? "Farmer Login" : "Bank/NBFC Login"}
                        </h1>
                    </div>
                    
                    <div className="p-6">
                        {/* User Type Selection */}
                        <div className="mb-6">
                            <label className={`block ${labelClass} font-medium mb-2`}>You are a:</label>
                            <div className="flex gap-4">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="farmer"
                                        checked={userType === "farmer"}
                                        onChange={() => setUserType("farmer")}
                                        className="mr-2 accent-green-600"
                                    />
                                    <span className="text-black">Farmer</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="bank"
                                        checked={userType === "bank"}
                                        onChange={() => setUserType("bank")}
                                        className="mr-2 accent-blue-600"
                                    />
                                    <span className="text-black">Bank/NBFCs</span>
                                </label>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="relative">
                                <label className={`text-sm font-medium mb-1 block ${labelClass}`}>
                                    {userType === "farmer" ? "Username" : "Bank Name"}
                                </label>
                                <div className="flex items-center">
                                    <span className={`absolute left-3 ${iconClass}`}>
                                        <i className={`fas ${userType === "farmer" ? "fa-user" : "fa-university"}`}></i>
                                    </span>
                                    <input 
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className={`pl-10 pr-3 py-2 w-full border rounded-lg ${inputBgClass}`}
                                        placeholder={userType === "farmer" ? "Enter your username" : "Enter bank name"}
                                    />
                                </div>
                            </div>
                            
                            <div className="relative">
                                <label className={`text-sm font-medium mb-1 block ${labelClass}`}>
                                    {userType === "farmer" ? "Password" : "Bank Credentials"}
                                </label>
                                <div className="flex items-center">
                                    <span className={`absolute left-3 ${iconClass}`}>
                                        <i className={`fas ${userType === "farmer" ? "fa-lock" : "fa-id-card"}`}></i>
                                    </span>
                                    <input 
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`pl-10 pr-3 py-2 w-full border rounded-lg ${inputBgClass}`}
                                        placeholder={userType === "farmer" ? "Enter your password" : "Enter bank credentials"}
                                    />
                                </div>
                            </div>
                            
                            {/* Error display */}
                            {error && (
                                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                                    <p>{error}</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="mt-8">
                            <motion.button
                                onClick={handleLogin}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full py-2 rounded-lg shadow transition-colors ${
                                    userType === "farmer"
                                        ? `${darkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} text-white`
                                        : `${darkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`
                                }`}
                            >
                                Login
                            </motion.button>
                        </div>
                        
                        {/* Signup navigation */}
                        <div className="mt-6 text-center">
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                                Don't have an account?
                            </p>
                            <motion.button
                                onClick={() => navigate('/signup')}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className={`px-4 py-2 rounded-lg border ${
                                    darkMode 
                                        ? 'border-gray-700 text-gray-300 hover:bg-gray-800' 
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                                } transition-colors w-full`}
                            >
                                Create New Account
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
