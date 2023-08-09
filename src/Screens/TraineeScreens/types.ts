export interface TrainerData {
    personalData: PersonalData
    professionalData: ProfessionalData
    sessionId: string
    userData: UserData
}

export interface PersonalData {
    __v: number
    _id: string
    city: string
    country: string
    createdAt: string
    date_of_birth: string
    gender: string
    name: string
    phoneNumber: number
    profileImage: string
    state: string
    updatedAt: string
    user: string
}

export interface ProfessionalData {
    __v: number
    _id: string
    createdAt: string
    experience_note: string
    experience_year: number
    qualification: string[]
    updatedAt: string
    user: string
    verification_status: string
}

export interface UserData {
    _id: string
    averageRating: number
    class_time: string
    class_title: string
    createdAt: string
    details: string
    duration: number
    equipment: any[]
    image: string
    no_of_slots: number
    numReviews: number
    price: number
    select_date: string
    session_title: string
    session_type: SessionType
    sports: string
    user: User
}

export interface SessionType {
    _id: string
    no_of_play: string
    recordCategory: string
    type: string
    videoTitle: string
}

export interface User {
    __v: number
    _id: string
    accountVerified: string
    amount: number
    averageRating: number
    cardCreated: boolean
    createdAt: string
    cus_id: string
    email: string
    emailVerified: boolean
    isVerified: boolean
    numReviews: number
    password: string
    personal: string
    profession: string
    reset_password: boolean
    role: string
    services_offered: string
    suspended: boolean
    trainerVerified: string
    updatedAt: string
}

export interface Video {
    __v: number
    _id: string
    averageRating: number
    createdAt: string
    numReviews: number
    price: number
    topic: string
    updatedAt: string
    user: string
    video_category: string
    video_details: string
    video_links: string
    video_thumbnail: string
}