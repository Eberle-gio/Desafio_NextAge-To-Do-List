import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

function App() {
  const [api, setApi] = useState(null);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setApi={setApi} />} />
        <Route path="/" element={<HomePage api={api} />} />
      </Routes>
    </Router>
  );
}

export default App;
