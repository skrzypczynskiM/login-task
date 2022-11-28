import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { userActions } from '../../store';
import { User } from '../../store/types';
import { history } from '../../utils/history';

export function EditProfile() {
    const dispatch = useAppDispatch();
    const { token: isAuthenticated } = useAppSelector((store) => store.user);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    function onSubmit({ email, password }: any) {
        return dispatch(userActions.login({ email, password }));
    }

    useEffect(() => {
        // redirect to home if already logged in
        if (!isAuthenticated) {
            history?.navigate?.('/login');
        }
    }, [isAuthenticated]);

    return (
        <div className="container max-w-screen-lg mx-auto mt-20">
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div className="text-gray-600">
                        <p className="font-medium text-lg">Personal Details</p>
                        <p>You can update your profiel data here.</p>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                            <div className="md:col-span-5">
                                <label htmlFor="fullname">Full Name</label>
                                <input
                                    type="text"
                                    name="fullname"
                                    id="firstname"
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    value=""
                                    placeholder=""
                                />
                            </div>

                            <div className="md:col-span-5">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    value=""
                                    placeholder="email@domain.com"
                                />
                            </div>

                            <div className="md:col-span-5">
                                <label htmlFor="profession">Profession</label>
                                <input
                                    type="text"
                                    name="profession"
                                    id="profession"
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    value=""
                                    placeholder="web developer"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="pizza">Favourite pizza</label>
                                <select
                                    id="pizza"
                                    className="appearance-none block w-full px-3 py-1.5 text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded m-0
    "
                                >
                                    <option value="1">Margherita</option>
                                    <option value="2">Pepperoni</option>
                                    <option value="3">Hawaiian</option>
                                    <option value="3">Buffalo</option>
                                </select>
                            </div>

                            <div className="md:col-span-3">
                                <label className="block">Sex</label>
                                <div className="flex space">
                                    <div className="flex items-center mb-4 mr-6 cursor-pointer">
                                        <input
                                            id="sex-option-male"
                                            type="radio"
                                            name="sex"
                                            value="male"
                                            className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300 cursor-pointer"
                                        />
                                        <label
                                            htmlFor="sex-option-male"
                                            className="text-sm font-medium text-gray-900 ml-2 block"
                                        >
                                            Male
                                        </label>
                                    </div>

                                    <div className="flex items-center mb-4 mr-6 cursor-pointer">
                                        <input
                                            id="sex-option-female"
                                            type="radio"
                                            name="sex"
                                            value="female"
                                            className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300 cursor-pointer"
                                        />
                                        <label
                                            htmlFor="sex-option-female"
                                            className="text-sm font-medium text-gray-900 ml-2 block"
                                        >
                                            Female
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-5">
                                <label className="inline-flex items-center mt-3">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-gray-600"
                                    />
                                    <span className="ml-2 text-gray-700">
                                        Agree for data proccessing
                                    </span>
                                </label>
                            </div>

                            <div className="md:col-span-5 text-right">
                                <div className="inline-flex items-end">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() =>
                                            history.navigate?.('/profile')
                                        }
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
