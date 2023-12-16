import { Navigate, createBrowserRouter } from 'react-router-dom';

import AuthService from '../api/AuthService';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import UnauthorizedOnlyRoute from './UnauthorizedOnlyRoute';
import Profile from '../pages/Profile';
import DashboardLayout from '../components/DashboardLayout';
import Home from '../pages/Home';
import Channels from '../pages/Channels';

export const router = createBrowserRouter([
    {
        path: '/signup',
        element: (
            <UnauthorizedOnlyRoute isSignedIn={AuthService.isAuthorized()}>
                <SignUp />
            </UnauthorizedOnlyRoute>
        ),
    },
    {
        path: '/login',
        element: (
            <UnauthorizedOnlyRoute isSignedIn={AuthService.isAuthorized()}>
                <Login />
            </UnauthorizedOnlyRoute>
        ),
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: '/dashboard/home',
                element: <Home />,
            },
            {
                path: '/dashboard/profile',
                element: <Profile />,
            },
            {
                path: '/dashboard/channels',
                element: <Channels />,
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to='/dashboard/home' replace />,
    },
]);
