import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import api from "./services/api";
import { useAuth } from "./context/AuthContext";
import AuthPage from "./components/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user, logout } = useAuth();
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
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
        
        <button
          onClick={logout}
          className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <Routes>
      <Route 
        path="/auth" 
        element={!user ? <AuthPage /> : <Navigate to="/" />} 
      />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App;
