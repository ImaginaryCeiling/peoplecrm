export interface User {
    person_name: string;
    person_email: string;
    person_phone: string;
    person_location: string;
    person_role?: string;
    person_linkedin?: string;
    person_notes?: string;
}

export interface UserList {
    users: User[];
}