import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { userActions } from '../../store';
import { LoginRequest } from '../../store/types';
import { history } from '../../utils';
import { loginSchema } from '../../validators';

type FormData = {
    email: string;
    password: string;
};

export function Login() {
    const dispatch = useAppDispatch();
    const { token: isAuthenticated } = useAppSelector((store) => store.user);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({ resolver: yupResolver(loginSchema) });

    function onSubmit({ email, password }: LoginRequest) {
        return dispatch(userActions.login({ email, password }));
    }

    useEffect(() => {
        // redirect to home if already logged in
        if (isAuthenticated) {
            history?.navigate?.('/profile');
        }
    }, [isAuthenticated]);

    return (
        <section className="h-screen">
            <div className="container px-6 py-12 h-full">
                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                    <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full"
                            alt="Phoner"
                        />
                    </div>
                    <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                        <h1 className="text-3xl mb-5">Login</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-6">
                                <input
                                    {...register('email')}
                                    type="email"
                                    name="email"
                                    className="block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Email address"
                                />
                                <div className="invalid-feedback">
                                    {errors.email?.message}
                                </div>
                            </div>

                            <div className="mb-6">
                                <input
                                    {...register('password')}
                                    name="password"
                                    type="password"
                                    className="block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Password"
                                />
                                <div className="invalid-feedback">
                                    {errors.password?.message}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                disabled={isSubmitting}
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
