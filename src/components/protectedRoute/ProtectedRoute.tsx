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

    return children;
}
