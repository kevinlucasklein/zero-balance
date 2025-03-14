import { useState, useEffect } from "react";
import api from "./services/api";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Making API request to backend...");
        const response = await api.get("/");
        console.log("API response:", response.data);
        setMessage(response.data.message || JSON.stringify(response.data));
        setError("");
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to connect to the API. Please check your connection.");
        setMessage("");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center text-center">
      {loading ? (
        <p className="text-xl">Loading...</p>
      ) : error ? (
        <p className="text-xl text-red-500">{error}</p>
      ) : (
        <h1 className="text-3xl font-bold">{message}</h1>
      )}
    </div>
  );
}

export default App;
