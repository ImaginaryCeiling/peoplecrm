export interface User {
    name: string;
    email: string;
    phone: string;
    address: string;
    notes?: string;
}

export interface UserList {
    users: User[];
}

export interface EditableItem {
  id: number;
}