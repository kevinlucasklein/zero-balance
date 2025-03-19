import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import api from "./services/api";
import { useAuth } from "./context";
import AuthPage from "./components/AuthPage";
import ProfilePage from "./components/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";

function App() {
  const { user } = useAuth();
  const [apiMessage, setApiMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [apiLoading, setApiLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setApiLoading(true);
        console.log("Making API request to backend...");
        const response = await api.get("/");
        console.log("API response:", response.data);
        setApiMessage(response.data.message || JSON.stringify(response.data));
        setApiError("");
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setApiError("Failed to connect to the API. Please check your connection.");
        setApiMessage("");
      } finally {
        setApiLoading(false);
      }
    };

    fetchData();
  }, []);

  // Home component that shows when user is logged in
  const Home = () => (
    <div className="min-h-screen bg-gray-100 pt-16 pb-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h1>
          <p className="mb-4">You are now logged in to Zero Balance.</p>
          
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <h2 className="text-lg font-semibold mb-2">API Status</h2>
            {apiLoading ? (
              <p>Loading API status...</p>
            ) : apiError ? (
              <p className="text-red-500">{apiError}</p>
            ) : (
              <p>{apiMessage}</p>
            )}
          </div>
          
          <div className="mt-6 flex flex-col space-y-4">
            <button
              onClick={() => window.location.href = '/profile'}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {user && <Navbar />}
      <div className={user ? 'pt-16' : ''}>
        <Routes>
          <Route 
            path="/auth" 
            element={!user ? <AuthPage /> : <Navigate to="/" />} 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/" 
            element={
              user ? (
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              ) : (
                <LandingPage />
              )
            } 
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
