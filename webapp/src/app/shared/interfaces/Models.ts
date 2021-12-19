export interface User {
    username: string
    name: string;
    description: string;
    contacts: Contacts;
    interests: Array<string>;
    academicInfo: Array<AcademicInfo>;
    professionalBackground: Array<ProfessionalBackGround>;
    skills: Array<string>;
}

export interface Contacts {
    linkedin: string;
    email: string;
    phone: string;
}

export interface AcademicInfo {
    institution: string;
    startDate: Date;
    endDate: Date;
    course: string;
}

export interface ProfessionalBackGround {
    company: string;
    role: string;
    startDate: Date;
    endDate?: Date;
    roleDescription: string;
    isCurrentlyJob: boolean | false;
}
