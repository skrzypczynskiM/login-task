import { useAppSelector } from '../../hooks';
import { Navbar } from '../navbar';
import { Outlet } from 'react-router-dom';

export function Layout() {
    const { token: isAuthenticated } = useAppSelector((store) => store.user);

    return (
        <div className="min-h-screen bg-gray-100">
            {!!isAuthenticated && <Navbar />}

            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <Outlet />
            </div>
        </div>
    );
}
