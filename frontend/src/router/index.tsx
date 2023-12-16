import { createBrowserRouter } from 'react-router-dom';

import AuthService from '../api/AuthService';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import UnauthorizedOnlyRoute from './UnauthorizedOnlyRoute';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import ProtectedRoute from './ProtectedRoute';

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
        path: '/home',
        element: <Home />,
    },
    {
        path: '/profile',
        element: <Profile />,
    },
    {
        path: '*',
        element: <Home />,
    },
]);
