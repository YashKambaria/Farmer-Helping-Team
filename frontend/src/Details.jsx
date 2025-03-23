import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Details({ darkMode }) {

  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [otp, setOtp] = useState("");
  const [verifyingField, setVerifyingField] = useState(null);


  const navigate = useNavigate();

  const originalUsernameRef = useRef(userInfo.name);



  // Fetch user data from backend with token check
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // Get JWT token
      try {
        const response = await fetch("http://localhost:8080/user/getUser", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401) {
          localStorage.setItem("isLoggedIn","false");
          localStorage.removeItem("token");
          alert("Session expired. Please log in again.");
          navigate("/login");
          return;
        }
        const data = await response.json();
        setUserInfo({
          name: data.name,
          email: data.email,
          phone: data.phoneNo,
        });
        setEmailVerified(data.emailVerified);
        setPhoneVerified(data.phoneVerified);
      } catch (error) {
        localStorage.setItem("isLoggedIn","false");
        localStorage.removeItem("token");
        console.error("Error fetching user data:", error);
        alert("Unable to fetch data. Please log in again.");
        navigate("/login");
      }
    };
    fetchUserData();
  }, []);

  // Ensure loader is visible for at least 4 seconds
  const [minLoadingDone, setMinLoadingDone] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoadingDone(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // --- (Other functions remain unchanged) ---

  const handleUpdateUserInfo = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8080/user/updateDetails", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userInfo.name,
          email: userInfo.email,
          phoneNo: userInfo.phone,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update user information");
      }
      const updatedData = await response.json();
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        name: updatedData.name || prevUserInfo.name,
        email: updatedData.email || prevUserInfo.email,
        phone: updatedData.phoneNo || prevUserInfo.phone,
      }));
      if (
        updatedData.name &&
        updatedData.name !== originalUsernameRef.current
      ) {
        console.log("Username changed, fetching new token...");
        const newTokenResponse = await fetch(
          "http://localhost:8080/public/refresh-token",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: updatedData.name }),
          }
        );
        if (!newTokenResponse.ok) {
          throw new Error("Failed to refresh token after username update");
        }
        const newToken = await newTokenResponse.text();
        console.log("new token", newToken);
        localStorage.setItem("token", newToken);
        originalUsernameRef.current = updatedData.name;
      }
      setIsEditing(false);
      // alert("User information updated successfully!");
    } catch (error) {
      console.error("Error updating user information:", error);
      alert("Failed to update user details. Please try again.");
    }
    window.location.reload(false);
  };

  const handleVerify = async (field) => {
    const token = localStorage.getItem("token");
    let url = "";
    if (field === "email") {
      url = "http://localhost:8080/user/sendOTPEmail";
    } else if (field === "phone") {
      url = "http://localhost:8080/user/sendOTPPhone";
    }
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await response.text();
      if (response.ok) {
        alert(result);
        if (field === "email") {
          setEmailVerified(false);
        } else if (field === "phone") {
          setPhoneVerified(false);
        }
      } else {
        alert(`Error: ${result}`);
      }
    } catch (error) {
      console.error(`Error verifying ${field}:`, error);
      alert("Something went wrong. Please try again.");
    }
    setVerifyingField(field);
  };

  const checkValidation = async () => {
    if (!verifyingField || !otp) {
      alert("Please enter OTP before verifying.");
      return;
    }
    const token = localStorage.getItem("token");
    let url = "";
    let body = { otp };
    if (verifyingField === "email") {
      url = "http://localhost:8080/user/verifyEmail";
    } else if (verifyingField === "phone") {
      url = "http://localhost:8080/user/verifyPhone";
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result = await response.text();
      console.log(JSON.stringify(response));
      if (response.ok) {
        alert(result);
        if (verifyingField === "email") {
          setEmailVerified(true);
        } else if (verifyingField === "phone") {
          setPhoneVerified(true);
        }
        setVerifyingField(null);
        setOtp("");
      } else {
        alert(`Error: ${result}`);
      }
    } catch (error) {
      console.error(`Error verifying ${verifyingField}:`, error);
      alert("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {}, [emailVerified, phoneVerified]);

  // Show the loader card if data is still loading or minimum 4s hasn't elapsed
  if (!minLoadingDone || !userInfo.name) {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md ${
          darkMode ? "bg-gray-900 bg-opacity-60" : "bg-white"
        }`}
      >
        <div className={`card ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
          <div className="loader">
            <p>loading</p>
            <div className="words">
              <span className="word">username</span>
              <span className="word">email</span>
              <span className="word">phone no</span>
              <span className="word">username</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-6">Profile</h1>
        <div className={`p-6 rounded-lg shadow-lg mb-6 ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">User Information</h2>
            <button onClick={() => setIsEditing(!isEditing)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer">
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>
          <div className="space-y-3">
            <p>
              <strong>Username:</strong>
              {isEditing ? (
                <input className="p-2 border rounded-md" value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} />
              ) : (
                " " + userInfo.name
              )}
            </p>
            <p className="flex items-center">
              <strong className="mr-2">Email:</strong>
              {isEditing ? (
                <input className="p-2 border rounded-md" value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
              ) : (
                " " + userInfo.email
              )}
              {emailVerified ? (
                <i className="fa-regular fa-circle-check ml-2 text-green-600"></i>
              ) : (
                <button onClick={() => handleVerify("email")} className="ml-2 px-2 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
                  Verify
                </button>
              )}
            </p>
            <p className="flex items-center">
              <strong className="mr-2">Phone:</strong>
              {isEditing ? (
                <input className="p-2 border rounded-md" value={userInfo.phone} onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} />
              ) : (
                " " + userInfo.phone
              )}
              {phoneVerified ? (
                <i className="fa-regular fa-circle-check ml-2 text-green-600"></i>
              ) : (
                <button onClick={() => handleVerify("phone")} className="ml-2 px-2 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
                  Verify
                </button>
              )}
            </p>
            <p>
              <strong>Password:</strong>
              {isEditing ? (
                <input className="p-2 border rounded-md" type="password" value={userInfo.password} onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })} />
              ) : (
                " ********"
              )}
            </p>
          </div>
          {isEditing && (
            <button onClick={handleUpdateUserInfo} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Update
            </button>
          )}
          {verifyingField && (
            <div className="mt-4">
              <p>Enter OTP sent to your {verifyingField}:</p>
              <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="p-2 border rounded-md w-full mt-2" />
              <div className="flex space-x-2 mt-2">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700" onClick={checkValidation}>
                  Verify
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700" onClick={() => { setVerifyingField(null); setOtp(""); }}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* // </div> */}
    </>
  );
}