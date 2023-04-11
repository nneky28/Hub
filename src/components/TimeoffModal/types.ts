export type TimeOffModalData = {
    start_date : string
   end_date : string
   reason : string
 }
export type TimeoffModalProps = {
    isVisible : boolean
    onHide : () => void
    timeoff_id? : number
    data : TimeOffModalData
    datePickerHandler : (action : string) => void
    onChangeText : (value : string) => void
}
type WorkDays = "Monday"| "Tuesday"| "Wednesday"| "Thursday"| "Friday"| "Saturday"| "Sunday"
export type useFetchAboutMeData = {
    id?: number
    employee_id? : number
    photo? : string,
    title? : string,
    title_display? : string
    first_name?: string
    middle_name?: string
    last_name?:string,
    email? : string
    hire_date? : string
    marital_status?: string
    marital_status_display? : string
    gender : string 
    business_name? : string
    business_logo? : string
    gender_display? : string
    nationality?:string,
    employee_job? : {
        hire_date? :string
        start_date?: string
        work_type?: string,
        employee?:{
            line_manager?:{
                first_name?:string,
                last_name? : string
            }
            region?:{
                id?: number, 
                name?:string
            }
        },
        arrival_time?:string,
        close_time?:string,
        job?:number
        compensation?: {
            amount?:number,num_week_days?:number,type?:number
        },
        work_days?: WorkDays[]
    }
    phone_number1?: string,
    phone_number2?: string,
    birth_date?: string,
    type?: string,
    type_display?: string,
    level?: string,
    line_manager?: {
        id?: number,
        photo?: string,
        employee_id?: string
        first_name?: string
        middle_name?: string
        last_name?: string
    },
    address?: {
        id?: number,
        address1?: string,
        address2?: string,
        country?: string,
        country_display?: string,
        state?: string,
        city?: string,
        postal_code?: string,
        personal_email?: string
    },
    department?: {
        id?: number,
        name?: string,
    },
    region?: {
        id?: number,
        name?: string
    },
    job?: {
        id?: number
        title?: string
    },
    compensation?: {
        id?: number
        amount?: number,
        num_week_days?: number,
        amount_per?: string,
        type?: string,
        work_hours?: string,
        start_date?: string,
        end_date?: string
    },
    bank_account?: string,
    pension?: string,
    user_access_status?: string,
    completed_user_onboarding?: boolean,
    is_active?: boolean,
    terminated_at?: string,
    termination_reason?: string,
    is_pension_applicable?: boolean
}

export type useFetchAboutMeProps = {
    data? : useFetchAboutMeData
    isLoading : boolean
    isFetching : boolean
}