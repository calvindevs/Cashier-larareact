import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./Dashboard";
import CashierDashboard from "./CashierDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
         <Route element={<ProtectedRoute role="cashier" />}>
          <Route path="/dashboard-kasir" element={<CashierDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
