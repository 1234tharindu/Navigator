import "./App.css";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Billing from "./pages/Billing";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./Calendar.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getUserDataFromToken } from "./utils/userValidation";

function App() {
  const userData = getUserDataFromToken().result;
  const [user, setUser] = useState(userData);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <Routes>
            <Route
              element={
                user ? (
                  <Layout user={user} setUser={setUser} />
                ) : (
                  <Navigate to="/Login" />
                )
              }
            >
              <Route path="/*" element={<Navigate to="/Home" />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Billing" element={<Billing />} />
            </Route>
            <Route
              element={
                user ? (
                  <Navigate to="/Home" />
                ) : (
                  <Layout auth setUser={setUser} />
                )
              }
            >
              <Route path="/Login" element={<Login />} />
            </Route>
          </Routes>
        </Router>
      </LocalizationProvider>
    </div>
  );
}

export default App;
