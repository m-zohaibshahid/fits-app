/* eslint-disable prettier/prettier */
export interface SelectStatusesDataInterface {
  id: number;
  content: string;
  title: string;
}

export interface UserDetailInfoInterface {
  access_token: string;
  data: Data;
  login: boolean;
  message: string;
  profile_completed: boolean;
  profile_status?: ProfileStatus;
}

export interface Data {
  _id: string;
  accountVerified: string;
  amount: number;
  averageRating: number;
  cardCreated: boolean;
  createdAt: string;
  cus_id: string;
  email: string;
  emailVerified: boolean;
  isVerified: boolean;
  numReviews: number;
  password: string;
  personal: string;
  profession: string;
  reset_password: boolean;
  role: string;
  services_offered: ServicesOffered;
  suspended: boolean;
  trainerVerified: string;
}

export interface ServicesOffered {
  key: string;
  value: string;
}

export interface ProfileStatus {
  personal_step_1: boolean;
  professional_step_2: boolean;
  service_offered_step_3: boolean;
}

export interface MyRequestHeaders {
  'Content-Type': string;
  Authorization?: string;
  // Additional headers...
}
