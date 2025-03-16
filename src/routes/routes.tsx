import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Notifications from "../pages/Notifications";
import Favorites from "../pages/Favorites";
// import Courses from "../pages/Course";
import Material from "../pages/Material";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import UnAuthorized from "../pages/UnAuthorized";
import Welcome from "../pages/Welcome";
import Course from "../pages/Course";
import CertificationsPage from "../pages/Certifications";
import UserCourses from "../pages/UserCourses";
import ForgetPassword from "../pages/ForgetPassword";
import RouterGuard from "../utils/RouterGuard";
import VerifyOTP from "../pages/VerifyOTP";
import ResetPassword from "../pages/ResetPassword";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import Quiz from "../pages/Quiz";

const routes = createBrowserRouter(
    [
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Welcome />,
                },
                {
                    path: "/home",
                    element: <RouterGuard><Home /></RouterGuard>,
                },
                {
                    path: "/notifications",
                    element: <RouterGuard><Notifications /></RouterGuard>,
                },
                {
                    path: "/favorites",
                    element: <RouterGuard><Favorites /></RouterGuard>,
                },
                {
                    path: "/certifications",
                    element: <RouterGuard><CertificationsPage /></RouterGuard>,
                },
                {
                    path: "/my-courses",
                    element: <RouterGuard><UserCourses /></RouterGuard>,
                },
                {
                    path: "/courses/:id",
                    element: <RouterGuard><Course /></RouterGuard>,
                },
                {
                    path: "/quizzes/:id",
                    element: <RouterGuard><Quiz /></RouterGuard>,
                },
                {
                    path: "/materials/:id",
                    element: <RouterGuard><Material /></RouterGuard>,
                },
                {
                    path: "/profile",
                    element: <RouterGuard><Profile /></RouterGuard>,
                },
                {
                    path: "/edit-profile",
                    element: <RouterGuard><EditProfile /></RouterGuard>,
                },
            ]
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/forgot-password",
            element: <ForgetPassword />
        },
        {
            path: "/reset-password/:email",
            element: <ResetPassword />
        },
        {
            path: "/verify-otp/:email",
            element: <VerifyOTP />
        },
        {
            path: "/register",
            element: <Register />
        },
        {
            path: "/unauthorized",
            element: <UnAuthorized />
        },
        {
            path: "*",
            element: <NotFound />
        }
    ]
);

export default routes;