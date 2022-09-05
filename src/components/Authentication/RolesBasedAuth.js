import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.username
                ? <Navigate to="/OpenSea/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/OpenSea/SignIn" state={{ from: location }} replace />
    );
}

export default RequireAuth;