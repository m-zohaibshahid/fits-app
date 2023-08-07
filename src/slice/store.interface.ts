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
  personal_info: PersonalInfo
  profession_info: ProfessionInfo
  reviews: any[]
  services: any[]
  session: Session
  stripe: Stripe
}

export interface PersonalInfo {
  _id: string
  name: string
  date_of_birth: string
  country: string
  state: string
  city: string
  gender: string
  user: string
  profileImage: string
  phoneNumber: string
  createdAt: string
}
export interface ProfessionInfo {
  verification_status: string
  _id: string
  experience_year: string
  experience_note: string
  qualification: Qualification[]
  user: string
  createdAt: string
}

export interface Qualification {
  degree: string
  degree_note: string
}

export interface ProfileStatus {
  personal_step_1: boolean
  fitness_level_step_2: boolean
  service_offered_step_3: boolean
}

export interface User {
  role: string
  isVerified: boolean
  amount: number
  emailVerified: boolean
  suspended: boolean
  reset_password: boolean
  trainerVerified: string
  cus_id: string;
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
  card: Card
  customer: Customer
  message: string
}

export interface Card {
  address_city: any
  address_country: any
  address_line1: any
  address_line1_check: any
  address_line2: any
  address_state: any
  address_zip: any
  address_zip_check: any
  brand: string
  country: string
  customer: string
  cvc_check: string
  dynamic_last4: any
  exp_month: number
  exp_year: number
  fingerprint: string
  funding: string
  id: string
  last4: string
  metadata: Metadata
  name: any
  object: string
  tokenization_method: any
  wallet: any
}

export interface Metadata { }

export interface Customer {
  address: any
  balance: number
  created: number
  currency: any
  default_currency: any
  default_source: string
  delinquent: boolean
  description: any
  discount: any
  email: string
  id: string
  invoice_prefix: string
  invoice_settings: InvoiceSettings
  livemode: boolean
  metadata: Metadata2
  name: string
  next_invoice_sequence: number
  object: string
  phone: string
  preferred_locales: any[]
  shipping: any
  tax_exempt: string
  test_clock: any
}

export interface InvoiceSettings {
  custom_fields: any
  default_payment_method: any
  footer: any
  rendering_options: any
}

export interface Metadata2 { }

