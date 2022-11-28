import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { userActions } from '../../store';

export function Navbar() {
    const dispatch = useAppDispatch();

    return (
        <nav className="w-full py-3 md:px-10 bg-gray-900 text-gray-300 shadow-lg text-[18px] md:text-xl fixed top-0">
            <ul className="flex list-style-none mr-auto">
                <li className="px-5 py-2">
                    <NavLink to="/profile">Profile</NavLink>
                </li>
                <li className="px-5 py-2">
                    <NavLink to="/edit-profile">Edit Profile</NavLink>
                </li>
                <li
                    className="ml-auto px-5 py-2"
                    onClick={() => dispatch(userActions.logout())}
                >
                    Logout
                </li>
            </ul>
        </nav>
    );
}
