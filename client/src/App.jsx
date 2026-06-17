import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumeDetails from "./pages/ResumeDetails";
import UploadResume from "./pages/UploadResume";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import CareerCoachPage from "./pages/CareerCoachPage";
function App() {
    return (
    <Routes>

        <Route
            path="/"
            element={<Home />}
        />

        <Route
            path="/register"
            element={<Register />}
        />

        <Route
            path="/login"
            element={<Login />}
        />

        <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            }
            />
            <Route
    path="/profile"
    element={
        <ProtectedRoute>
            <Profile />
        </ProtectedRoute>
    }
/>
        <Route
            path="/resume/:id"
            element={
                <ProtectedRoute>
                    <ResumeDetails />
                </ProtectedRoute>
            }
        />

        <Route
            path="/upload"
            element={
                <ProtectedRoute>
                    <UploadResume />
                </ProtectedRoute>
            }
            />
            <Route
    path="/resume/:id/coach"
    element={
        <ProtectedRoute>
            <CareerCoachPage />
        </ProtectedRoute>
    }
/>

    </Routes>
);
}

export default App;