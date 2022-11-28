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
import { history } from './utils';
import { ProtectedRoute } from './components/protectedRoute';
import { Layout } from './components/layout';

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
        //     </div>
        // </div>
    );
}

export default App;
