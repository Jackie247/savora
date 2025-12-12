/* eslint-disable react/react-in-jsx-scope */
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Expenses from "./pages/Expenses/Expenses.tsx";
import { useEffect } from "react";
import Login from "./pages/Login/Login.tsx";
import SignUp from "./pages/SignUp/SignUp.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import useAuthStore from "./store/auth.store.ts";

const App = () => {
  const { setSession, unsubscribe } = useAuthStore();

  useEffect(() => {
    setSession();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <Routes>
      {/* Public auth routes */}
      <Route path="/log-in" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      {/* <Route path="/logout" element={<LogoutRoute />} /> */}

      {/* Protected routes */}
      <Route
        path="/"
        element={
          //   <ProtectedRoute>
          <Dashboard />
          //   </ProtectedRoute>
        }
      />
      <Route
        path="/expenses"
        element={
          <ProtectedRoute>
            <Expenses />
          </ProtectedRoute>
        }
      />
      {/* <Route path="/" element={<Options />} /> */}
      {/* <Route path="/" element={<Help />} /> */}
    </Routes>
  );
};

export default App;
