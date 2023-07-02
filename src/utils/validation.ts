import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'Password must be Strong'
        )
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
});

export const validateForm = async (values: any) => {
    try {
        await validationSchema.validate(values, { abortEarly: false });
        return { isValid: true, errors: {} };
    } catch (error: any) {
        const errors: any = {};
        error.inner.forEach((err: any) => {
            errors[err.path] = err.message as any;
        });
        return { isValid: false, errors };
    }
};
