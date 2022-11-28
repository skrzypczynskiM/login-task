import { Navigate } from 'react-router-dom';
import { history } from '../../utils';
import { useAppSelector } from '../../hooks';

type Props = { children: JSX.Element };

export function ProtectedRoute({ children }: Props) {
    const { token: isAuthenticated } = useAppSelector((store) => store.user);

    if (!isAuthenticated) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" state={{ from: history.location }} />;
    }

    // authorized so return child components
    return children;
}

// import React from "react";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { useAppSelector } from "../../state/hooks";

// const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
//   const {user} = <Your-State-Provider>// Redux/Context or even in-memory user
//   const location = useLocation();
//   return !user.isAuthenticated ? (
//     <Navigate to={"/login"} state={{ from: location }} replace />
//   ) : (
//     children
//   );
// };

// export default ProtectedRoute;
