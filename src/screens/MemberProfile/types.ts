import { useFetchEmployeesData } from "../People/types";

export type MemberProfileParams = {
    member? : useFetchEmployeesData
}

export type LineManager = {
    photo? : string
    last_name? : string
    first_name? : string
    middle_name? : string
    title? : string
}

export type useFetchEmployeeBasicDetailsData = {
    email?: string
    first_name?: string
    hire_date?: string
    id?: number
    job?: {
        title? : string
    }
    last_name?: string
    line_manager?: LineManager
    phone_number1?: string
    photo?: string 
    type?: string
    address? : {
        address1? : string
    }
}

export type useFetchEmployeeBasicInfoProps = {
    data? : useFetchEmployeeBasicDetailsData
    isLoading : boolean
    isFetching : boolean
}