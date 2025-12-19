/* eslint-disable react/react-in-jsx-scope */
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Expenses from "./pages/Expenses/Expenses.tsx";
import { useEffect } from "react";
import Login from "./pages/Login/Login.tsx";
import SignUp from "./pages/SignUp/SignUp.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { useInit } from "./store/auth.store.ts";
import Accounts from "./pages/Accounts/Accounts.tsx";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const App = () => {
  const init = useInit();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Routes>
      {/* Public auth routes */}
      <Route path="/log-in" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />

      {/* Protected routes */}
      <Route path="/" element={<Dashboard />} />
      <Route
        path="/expenses"
        element={
          <ProtectedRoute>
            <Expenses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/accounts"
        element={
          <ProtectedRoute>
            <Accounts />
          </ProtectedRoute>
        }
      />
      {/* <Route path="/" element={<Options />} /> */}
      {/* <Route path="/" element={<Help />} /> */}
    </Routes>
  );
};

export default App;
