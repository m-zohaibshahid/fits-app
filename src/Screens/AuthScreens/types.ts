export interface SignUpFormValues {
    email: string;
    password: string;
    confirmPassword?: string;
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


export interface PersonalInfoValidateSchemaInterface {
    name: string;
    date_of_birth: Date;
    country: string;
    phoneNumber: string;
    state: string;
    city: string;
    gender: string;
    profileImage?: string;
    confirmPassword?: string;
}
export interface PersonalInfoValidateErrorsIntarface {
    name?: string;
    date_of_birth?: string;
    country?: string;
    phoneNumber?: string;
    state?: string;
    city?: string;
    gender?: string;
    profileImage?: string;
    confirmPassword?: string;
}


export interface PersonalInfoFormValidationResultInterface {
    isValid: boolean;
    errors: PersonalInfoValidateErrorsIntarface;
}