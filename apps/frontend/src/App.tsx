import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080").then((response) => {
      setMessage(response.data);
    });
  }, []);

  return (
    <div className="flex h-screen items-center justify-center text-center">
      <h1 className="text-3xl font-bold">{message}</h1>
    </div>
  );
}

export default App;
