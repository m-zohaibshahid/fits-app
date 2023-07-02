import * as Yup from 'yup'

export const validateForm = async (values: any, validationSchema: Yup.ObjectSchema<any>) => {
    try {
        await validationSchema.validate(values, { abortEarly: false });
        return { isValid: true, errors: {} };
    } catch (error: any) {
        const errors: any = {};
        error.inner.forEach((err: any) => {
            errors[err.path] = err.message;
        });
        return { isValid: false, errors };
    }
};
