import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Must be correct email')
        .required('Email is required'),
    password: Yup.string().required('Password is required'),
});

export const editProfileSchema = Yup.object().shape({
    fullname: Yup.string()
        .required('Enter your full name')
        .min(3, 'Must be minimum 3 characters')
        .max(255, 'Must be maximum 255 characters'),
    password: Yup.string().required('Password is required'),
    profession: Yup.string()
        .required('Password is required')
        .min(3, 'Must be minimum 3 characters')
        .max(255, 'Must be maximum 255 characters'),
    favouritePizza: Yup.mixed()
        .required('Pizza is so required!')
        .oneOf(['Margherita', 'Pepperoni', 'Hawaiian', 'Buffalo']),
    consent: Yup.boolean()
        .required('Consent is required')
        .oneOf([true], 'You have to agree to data processing'),
});
