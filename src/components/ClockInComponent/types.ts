export type useFetchAttendanceConfigData = {
    id? : number
    is_configured? : boolean
    lateness_policy? : number
    start_date? : string
}
export type useFetchAttendanceConfigProps = {
    data? : {
        data? : useFetchAttendanceConfigData
    }
    isLoading : boolean
    isFetching : boolean
}

export type useFetchAttendanceStatusData = {
    is_clocked_in? : boolean
    clocked_out_time? : string
    clocked_in_time? : string
    has_clocked_out? : boolean
    clock_in_time? : string
    location_type? : string
}

export type useFetchAttendanceStatusProps = {
    data? : useFetchAttendanceStatusData
    isLoading : boolean
    isFetching : boolean
}

export type useFetchLocationTypeData = {
    location_type? : "Remote" | "Onsite"
}

export type useFetchLocationTypeProps = {
    data? : useFetchLocationTypeData
    isLoading : boolean
}