export type useFetchNotificationData = {
    created_at? : string
    id? : number
    image? : string
    type? : "timeoff-request" | "timeoff-request-approval" | "timeoff-request-dismissal"
    data?: {
        days? : number
        employee? : number
        employee_first_name? : string
        employee_last_name? : string
        end_date?: string
        start_date? : string
        timeoff?: number
        timeoff_policy? : number
        timeoff_policy_title? : string
        timeoff_request? : number
    }

} | {
    created_at? : string
    id? : number
    image? : string
    type? : "birthday"
    data?: {
        date? : string
        employee? : number
        employee_first_name? : string
        employee_last_name? : string
    }

} | {
    created_at? : string
    id? : number
    image? : string
    type? : "work-anniversary"
    data?: {
        years? : number
        employee? : number
        employee_first_name? : string
        employee_last_name? : string
    }

}

export type useFetchNotificationProps = {
    data? : {
        pages? : {
            results? : useFetchNotificationData[]
        }[]
    }
    isLoading : boolean
    isFetching : boolean
    hasNextPage : boolean
}

export type FormattedData = {
    id? : number,
    avatar : string,
    subtitle : string,
    title : string,
    icon : any,
    type : string,
    date :  string,
    placeholder : string
    background : string
}

export type GroupedFormattedData = {
    [index : string] : FormattedData[]
}

export type NotificationData = {
    key : string
    date : string
    data : FormattedData[]
}

export type NotificationItemProps = {
    item : FormattedData, 
    section : NotificationData
    index: number
}