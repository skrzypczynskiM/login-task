import {
    Routes,
    Route,
    Navigate,
    useNavigate,
    useLocation,
} from 'react-router-dom';
import { Login } from './pages/login';
import { Profile } from './pages/profile';
import { EditProfile } from './pages/edit-profile';
import { ProtectedRoute } from './components/protectedRoute';
import { Layout } from './components/layout';
import { history, setupMockupData } from './utils';

// save "registered" users in local storage
setupMockupData();

function App() {
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Login />} />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-profile"
                    element={
                        <ProtectedRoute>
                            <EditProfile />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/" />} />
            </Route>
        </Routes>
    );
}

export default App;
