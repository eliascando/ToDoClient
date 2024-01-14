import { Navigate, Outlet } from "react-router";

export const RouteGuard = ({canActivate, children, redirectTo = '/login'}) => {
    if(!canActivate){
        return <Navigate to={redirectTo} />
    }

    return children;
}