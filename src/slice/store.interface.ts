/* eslint-disable @typescript-eslint/no-unused-vars */
interface LoginInterface {
  login: any;
  message: string;
  email: string;
  password: string;
  role?: string;
}
export type { LoginInterface };


export interface UserMeApiResponse {
  statusCode: number
  success: boolean
  message: string
  profile_completed: boolean
  profile_status: ProfileStatus
  user: User
  personal_info: any
  profession_info: any
  reviews: any[]
  services: any[]
  session: Session
  stripe: Stripe
}

export interface ProfileStatus {
  personal_step_1: boolean
  fitness_level_step_2: boolean
  fitness_goal_step_3: boolean
}

export interface User {
  role: string
  isVerified: boolean
  amount: number
  emailVerified: boolean
  suspended: boolean
  reset_password: boolean
  trainerVerified: string
  accountVerified: string
  numReviews: number
  averageRating: number
  cardCreated: boolean
  _id: string
  email: string
  createdAt: string
}

export interface Session {
  userSession: any[]
  sessionReview: any[]
}

export interface Stripe {
  message: string
}
