export interface Person {
    username: String
    name: String;
    description: String;
    contacts: Contacts;
    interests: Array<String>;
    // academicInfo: Array<AcademicInfo>;
    // professionalBackground: Array<ProfessionalBackGround>;
    academicInfo: AcademicInfo;
    professionalBackground: ProfessionalBackGround;
    skills: Array<String>;
}

export interface Contacts {
    linkedin: String;
    email: String;
    phone: String;
}

export interface AcademicInfo {
    institution: String;
    startDate: Date;
    endDate: Date;
    course: String;
}

export interface ProfessionalBackGround {
    company: String;
    role: String;
    startDate: Date;
    endDate?: Date;
    roleDescription: String;
    isCurrentlyJob: boolean | false;
}
