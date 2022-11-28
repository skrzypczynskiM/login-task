import * as Yup from 'yup';
import { Pizza, Sex } from '../shared/types';

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Must be correct email')
        .required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const editProfileBase = Yup.object().shape({
    fullname: Yup.string()
        .required('Enter your full name')
        .min(3, 'Must be minimum 3 characters')
        .max(255, 'Must be maximum 255 characters'),
    password: Yup.string().required('Password is required'),
    profession: Yup.string()
        .required('Profession is required')
        .min(3, 'Must be minimum 3 characters')
        .max(255, 'Must be maximum 255 characters'),
    favouritePizza: Yup.mixed()
        .required('Pizza is so required!')
        .oneOf([
            Pizza.Margherita,
            Pizza.Pepperoni,
            Pizza.Buffalo,
            Pizza.Hawaiian,
        ]),
    sex: Yup.mixed()
        .required('Please choose your sex')
        .oneOf([Sex.Male, Sex.Female]),
    consent: Yup.boolean(),
});

export const editProfileSchema = editProfileBase.concat(loginSchema);
