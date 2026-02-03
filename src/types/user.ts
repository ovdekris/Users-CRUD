export interface Address {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
        lat: string,
        lng: string
    };
}

export interface Company {
    name: string,
    catchPhrase: string,
    bs: string
}

export interface User {
    id: number,
    name: string,
    username: string,
    email: string,
    address: Address
    phone: string,
    website: string,
    company: Company
}

//For form
export type UserFormData = Omit<User, 'id'>;

export type UserUpdateData = Partial<User>;

export const defaultUserFormData: UserFormData = {
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: { lat: "0", lng: "0" },
    },
    company: {
        name: "",
        catchPhrase: "",
        bs: "",
    },
};