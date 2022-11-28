import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { userActions } from '../../store';
import { history } from '../../utils/history';
import { PizzaType, Pizza, Sex, User } from '../../shared/types';
import { editProfileSchema } from '../../validators';
import { Button } from '../../components/button';

type FormData = {
    id: string;
    fullname: string;
    password: string;
    email: string;
    profession: string;
    favouritePizza: PizzaType;
    sex: Sex;
    consent: boolean;
};

export function EditProfile() {
    const { token: isAuthenticated, userInfo } = useAppSelector(
        (store) => store.user
    );
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: yupResolver(editProfileSchema),
        defaultValues: {
            ...userInfo,
        },
    });

    function onSubmit(userInfo: User) {
        return dispatch(userActions.editProfile(userInfo));
    }

    useEffect(() => {
        // redirect to login page if not logged in
        if (!isAuthenticated) {
            history?.navigate?.('/login');
        }
    }, [isAuthenticated]);

    return (
        <div className="container max-w-screen-lg mx-auto mt-20">
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div className="text-gray-600 mb-7">
                        <p className="font-medium text-lg">Personal Details</p>
                        <p>You can update your profile data here.</p>
                    </div>

                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                <div className="md:col-span-5">
                                    <label htmlFor="fullname">Full Name</label>
                                    <input
                                        {...register('fullname')}
                                        type="text"
                                        name="fullname"
                                        id="fullname"
                                        className={`${
                                            errors?.fullname
                                                ? 'border-red-600'
                                                : 'border-gray-300 focus:border-blue-600'
                                        } block my-2 w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none`}
                                        placeholder="Full Name"
                                    />

                                    <div className="text-red-600 h-3">
                                        {errors.fullname?.message}
                                    </div>
                                </div>
                                <div className="md:col-span-5">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        {...register('email')}
                                        type="email"
                                        name="email"
                                        id="email"
                                        className={`${
                                            errors?.email
                                                ? 'border-red-600'
                                                : 'border-gray-300 focus:border-blue-600'
                                        } block my-2 w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none`}
                                        placeholder="email@domain.com"
                                    />

                                    <div className="text-red-600 h-3">
                                        {errors.email?.message}
                                    </div>
                                </div>
                                <div className="md:col-span-5">
                                    <label htmlFor="profession">
                                        Profession
                                    </label>
                                    <input
                                        {...register('profession')}
                                        type="text"
                                        name="profession"
                                        id="profession"
                                        className={`${
                                            errors?.profession
                                                ? 'border-red-600'
                                                : 'border-gray-300 focus:border-blue-600'
                                        } block my-2 w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none`}
                                        placeholder="Web developer"
                                    />

                                    <div className="text-red-600 h-4">
                                        {errors.profession?.message}
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="favouritePizza">
                                        Favourite pizza
                                    </label>
                                    <select
                                        {...register('favouritePizza')}
                                        id="favouritePizza"
                                        className={`${
                                            errors?.fullname
                                                ? 'border-red-600'
                                                : 'border-gray-300 focus:border-blue-600'
                                        } block my-2 w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none`}
                                    >
                                        <option value={Pizza.Margherita}>
                                            Margherita
                                        </option>
                                        <option value={Pizza.Pepperoni}>
                                            Pepperoni
                                        </option>
                                        <option value={Pizza.Hawaiian}>
                                            Hawaiian
                                        </option>
                                        <option value={Pizza.Buffalo}>
                                            Buffalo
                                        </option>
                                    </select>

                                    <div className="text-red-600 h-4">
                                        {errors.favouritePizza?.message}
                                    </div>
                                </div>
                                <div className="md:col-span-3 md:ml-10">
                                    <label className="block  mt-2 mb-2">
                                        Sex
                                    </label>
                                    <div className="flex space">
                                        <div className="flex items-center mb-4 mr-6 cursor-pointer">
                                            <input
                                                {...register('sex')}
                                                id="sex-option-male"
                                                type="radio"
                                                name="sex"
                                                value={Sex.Male}
                                                className="h-3 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300 cursor-pointer"
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
                                                {...register('sex')}
                                                id="sex-option-female"
                                                type="radio"
                                                name="sex"
                                                value={Sex.Female}
                                                className="h-3 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300 cursor-pointer"
                                            />
                                            <label
                                                htmlFor="sex-option-female"
                                                className="text-sm font-medium text-gray-900 ml-2 block"
                                            >
                                                Female
                                            </label>
                                        </div>
                                    </div>
                                    <div className="text-red-600 h-3">
                                        {errors.sex?.message}
                                    </div>
                                </div>
                                <div className="md:col-span-5">
                                    <label className="inline-flex items-center mt-3">
                                        <input
                                            {...register('consent')}
                                            id="consent"
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5 text-gray-600"
                                        />
                                        <label
                                            className="ml-2 text-gray-700"
                                            htmlFor="consent"
                                        >
                                            Agree for data proccessing
                                        </label>
                                    </label>

                                    <div className="text-red-600 h-3">
                                        {errors.consent?.message}
                                    </div>
                                </div>

                                <div className="md:col-span-5 text-right">
                                    <div className="inline-flex items-end">
                                        <Button
                                            type="submit"
                                            loading={isSubmitting}
                                            className="w-32"
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
