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

const routes = createBrowserRouter(
    [
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Welcome />
                },
                {
                    path: "/home",
                    element: <Home />
                },
                {
                    path: "/notifications",
                    element: <Notifications />
                },
                {
                    path: "/favorites",
                    element: <Favorites />
                },
                {
                    path: "/certifications",
                    element: <CertificationsPage />
                },
                {
                    path: "/my-courses",
                    element: <UserCourses />
                },
                {
                    path: "/courses/:id",
                    element: <Course />
                },
                {
                    path: "/materials/:id",
                    element: <Material />
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