import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
//import { path } from 'path';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Layout showHero><HomePage /></Layout>} />
        <Route element={<ProtectedRoute />}> 
        <Route path="/auth-callback" element={<AuthCallbackPage />}/>
        </Route>
        <Route path="/user-profile" element={<Layout><UserProfilePage /></Layout>} />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;