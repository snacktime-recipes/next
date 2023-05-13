export interface ProfileModel {
    id: number;
    email: string;
    name: string;
    lastName: string | undefined;
    password: string;
    phone: string | undefined;

    // todo
    // add other fields and relations
};