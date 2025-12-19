/* eslint-disable react/react-in-jsx-scope */
import { Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Login from "./pages/Login/Login.tsx";
import SignUp from "./pages/SignUp/SignUp.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { useInit } from "./store/auth.store.ts";
import Accounts from "./pages/Accounts/Accounts.tsx";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Lazy load heavy components
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard.tsx"));
const Expenses = lazy(() => import("./pages/Expenses/Expenses.tsx"));

const App = () => {
  const init = useInit();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
};

export default App;
