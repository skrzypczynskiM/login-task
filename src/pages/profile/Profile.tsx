import { NavLink } from 'react-router-dom';

export function Profile() {
    return (
        <div className="max-w-xs md:min-w-[350px] mt-20">
            <div className="bg-white shadow-xl rounded-lg py-3">
                <div className="photo-wrapper p-2">
                    <img
                        className="w-32 h-32 rounded-full mx-auto"
                        src="https://images.pexels.com/photos/4588001/pexels-photo-4588001.jpeg"
                        alt="John Doe"
                    />
                </div>
                <div className="p-2">
                    <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                        John Doe
                    </h3>
                    <div className="text-center text-gray-400 text-xs font-semibold">
                        <p>Web Developer</p>
                    </div>
                    <table className="text-xs my-3 ">
                        <tbody>
                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">
                                    Email
                                </td>
                                <td className="px-2 py-2">john@exmaple.com</td>
                            </tr>

                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">
                                    Sex
                                </td>
                                <td className="px-2 py-2">Male</td>
                            </tr>

                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">
                                    Favourite pizza
                                </td>
                                <td className="px-2 py-2">Margherita</td>
                            </tr>

                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">
                                    Data processing
                                </td>
                                <td className="px-2 py-2">agreed</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="text-center my-3">
                        <NavLink
                            to="/edit-profile"
                            className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                        >
                            Edit Profile
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
