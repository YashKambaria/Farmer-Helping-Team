import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import General from "./General";
import History from "./History";
import Details from "./Details";
import Analytics from "./Analytics";

export default function Profile({ darkMode }) {
  const [userInfoType, setUserInfoType] = useState('profile');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/user/getUser", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div
      className={`flex min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <div className="w-64 hidden md:block">
        <Sidebar darkMode={darkMode} userInfoType={userInfoType} setUserInfoType={setUserInfoType} />
      </div>

      {userInfoType === 'general' ? (
        <General darkMode={darkMode} userData={userData} />
      ) : userInfoType === 'history' ? (
        // Pass the history array if available, or an empty array otherwise
        <History darkMode={darkMode} historyData={userData ? userData.history : []} />
      ) : userInfoType === 'details' ? (
        <>
            <Details darkMode={darkMode} userData={userData} />
        </>
      ) : (
        <>
          <Analytics darkMode={darkMode}/>
        </>
      )}
    </div>
  );
}
