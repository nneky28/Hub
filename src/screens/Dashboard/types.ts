export type useFetchWhosOutData = {
    employee? : {
        first_name? : string
        last_name? : string
        job?: {
            title? : string
        }
    }
    photo? : string
    title? : string
}

export type useFetchWhosOutProps = {
    data? : {
        count? : number
        results? : useFetchWhosOutData[]
    }
    isLoading : boolean
    isFetching : boolean
}

export type useFetchBirthdaysData = {
    first_name? : string
    job? : {
        title? : string
        id? : string
    }
    birth_date? : string
    photo?: string
}
export type useFetchBirthdaysProps = {
    data? : {
        results?: useFetchBirthdaysData[]
    }
    isLoading : boolean
    isFetching : boolean
}

export type useFetchAssetsData = {
    image? : string
    name? : string
    brand? : string
}
export type useFetchAssetsProps = {
    data? : {
        count? : number
        results? : useFetchAssetsData[]
    }
    isLoading : boolean
    isFetching : boolean
}

export type useFetchBenefitsData = {
    category? : string
    description? : string
    employee_cost_accrued_amount? : number
    employee_cost_accrued_percent? : number
    employer_cost_accrued_amount? : number
    employer_cost_accrued_percent? : number
    id? : number
    is_cost_accrued_amount?: boolean
    is_cost_accrued_percent? : boolean
    is_default? : boolean
    num_dependents? : number
    plan? : string
    provider?: string
    statutory_number?: string
    website?: string
}   
export type useFetchBenefitsProps = {
    data? : {
        count? : number
        results? : useFetchBenefitsData[]
    }
    isLoading : boolean
    isFetching : boolean
}

export type useFetchEmployeeTimeOffData = {
    category? : string
    created_at? : string
    description?: string
    employee?: number
    id?: number
    initial_days? : number
    is_paid?: boolean
    max_days_allowed? : number
    title?: string
    total_days_taken?: number
    updated_at?: string
    year?: number
}

export type useFetchEmployeeTimeOffProps = {
    data? : {
        count? : number
        results? : useFetchEmployeeTimeOffData[]
    }
    isLoading : boolean
    isFetching : boolean
}
export type useFetchEmployeeTimeOffTakenData = {
    days_requested? : number
    days_taken? : number
    employee? : number
    end_date? : string
    id? : number
    reason? : string
    start_date? : string
    approved_by? : {
        email?: string
        first_name? : string
        last_name? : string
    }
    timeoff? : useFetchEmployeeTimeOffData
}
export type useFetchEmployeeTimeOffTakenProps = {
    data? : {
        count? : number
        results? : useFetchEmployeeTimeOffTakenData[]
    }
    isLoading : boolean
    isFetching : boolean
}

export type useFetchEmployeeTimeOffReqsData = {
    created_at? : string
    days_requested?: number
    employee?: number
    end_date?: string
    id?: number
    reason?: string
    start_date?: string
    status?: string
    timeoff? : useFetchEmployeeTimeOffData
}

export type useFetchEmployeeTimeOffReqsProps = {
    data? : {
        count? : number
        results? : useFetchEmployeeTimeOffReqsData[]
    }
    isLoading : boolean
    isFetching : boolean
}

export type useFetchAnniversaryData = {
    first_name? : string
    num_years_spent? : number
    photo? : string
    hire_date? : string
    job? : {
        title? : string
    }
}

export type useFetchAnniversaryProps = {
    data? : {
        results? : useFetchAnniversaryData[]
    }
    isLoading : boolean
    isFetching : boolean
}