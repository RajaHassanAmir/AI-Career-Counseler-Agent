import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "../components/navbar";

import ChatPage from "../pages/user/chatpage";

import LandingPage from "../pages/publics/LandingPage";

import Auth from "../pages/auth";

import UserDashboard from "../pages/user/userdashboard";

import ClientDashboard from "../pages/client/ClientDashboard";

import AdminDashboard from "../pages/admin/AdminDashboard";

import Applications from "../pages/client/Applications";

import ProtectedRoute from "./ProtectedRoute";

function AppRouter() {

  return (

    <BrowserRouter>

      {/* NAVBAR INSIDE ROUTER */}
      <Navbar />

      <Routes>

        {/* PUBLIC */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* AUTH */}
        <Route
          path="/auth"
          element={<Auth />}
        />

        {/* REDIRECTS */}
        <Route
          path="/login"
          element={<Navigate to="/auth" />}
        />

        <Route
          path="/register"
          element={<Navigate to="/auth" />}
        />

        {/* USER */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/chat"
          element={
            <ProtectedRoute role="user">
              <ChatPage />
            </ProtectedRoute>
          }
        />

        {/* CLIENT */}
        <Route
          path="/client/dashboard"
          element={
            <ProtectedRoute role="client">
              <ClientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/client/applications"
          element={
            <ProtectedRoute role="client">
              <Applications />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={<Navigate to="/auth" />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRouter;
