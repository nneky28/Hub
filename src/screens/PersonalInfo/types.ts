export type Data ={
    first_name: string;
    middle_name: string;
    last_name: string;
    gender: string;
    birth_date: string;
    marital_status: string;
    email: string;
    mobileNumber2: string;
    address2: string;
    address: string;
    phone_number: string;
    state: string;
    city: string;
    country: string;
    postal_code: string;
}

export type DataKeys = keyof Data;