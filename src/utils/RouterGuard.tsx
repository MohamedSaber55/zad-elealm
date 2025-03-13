import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { JSX, ReactNode } from "react";
import { RootState } from "../store/store";

interface RouterGuardProps {
    children: ReactNode;
}

export default function RouterGuard({ children }: RouterGuardProps): JSX.Element {
    const state = useSelector((state: RootState) => state.auth);

    if (!state.token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
