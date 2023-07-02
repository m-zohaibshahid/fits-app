export interface SignUpFormValues {
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}

export interface SignUpFormValidationErrors {
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export interface SignUpFormValidationResult {
    isValid: boolean;
    errors: SignUpFormValidationErrors;
}
