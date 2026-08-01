import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Signup from "../pages/signup/signup";
import Dashboard from "../pages/dashboard/dashboard";
import Timesheet from "../pages/timesheet/timesheet";
import ProtectedRoute from "../utils/protectedroute";


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/timesheet"
                element={
                    <ProtectedRoute>
                        <Timesheet />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}