import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import decodeToken from './decodeToken';
import { getRoleForAuth } from '../store/slices/roleSlice';
import { Box } from '@mui/material';
import Loading from '../components/Loading';
import { setTokenNull } from '../store/slices/auth';


interface ProtectedRouteProps {
    children: JSX.Element;
    requiredPermissions?: string[];
}

const isTokenValid = (token: string | null) => {
    if (!token) return false;
    if (token.split('.').length !== 3) return false;
    const decoded = decodeToken(token);

    const isTokenInvalid = !decoded;
    const isInactive = decoded?.isActive === false;
    const isTokenExpired = decoded?.exp ? decoded.exp < Math.floor(Date.now() / 1000) : true;
    if (isTokenInvalid || isTokenExpired || isInactive) {
        return false;
    }

    return true;
};


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredPermissions = [] }) => {
    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector((state: RootState) => state.auth);
    const roleState = useSelector((state: RootState) => state.role);
    const token = state.token;
    const roleId = state.user?.role;
    const userPermissions = roleState.role?.permissions;

    useEffect(() => {
        if (roleId && !roleState.role) {
            dispatch(getRoleForAuth({ token, id: roleId as unknown as string }));
        }
    }, [dispatch, roleState.role, token, roleId])

    if (roleState.error === "Token expired") {
        localStorage.removeItem("shopToken")
        localStorage.removeItem("user")
        dispatch(setTokenNull())
        return <Navigate to="/login" />;
    }

    if (!isTokenValid(token) || roleState.error === "Item not found") {
        return <Navigate to="/login" />;
    }
    if (!roleState.role) {
        return <Box height={"80vh"}> <Loading backgroundColor='#ffffff' /></Box>;
    }

    // Check for permissions
    const hasRequiredPermissions = requiredPermissions.every((perm) => userPermissions?.includes(perm));
    if (!hasRequiredPermissions) {
        return <Navigate to="/un-authorized" />;
    }

    return children;
};

export default ProtectedRoute;