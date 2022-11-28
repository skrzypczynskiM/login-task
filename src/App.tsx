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
import { Navbar } from './components/navbar';
import { history } from './utils';

function App() {
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/edit-profile" element={<EditProfile />} />

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
