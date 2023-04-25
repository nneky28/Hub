export type TaskPeopleListParams = {
    char : string
}
export type Tab = "Employees" | "Departments"

export type useFetchDepartmentsData = {
    created?: string 
    employee_count?: number
    id?: number
    line_manager?: {
        first_name? : string
        last_name? : string
    }
    name?: string
}

export type useFetchDepartmentsProps = {
    data? : {
        pages? : {
            results : useFetchDepartmentsData[]
        }[]
    }
    isLoading : boolean
    isFetching : boolean
    hasNextPage : boolean
    isFetchingNextPage : boolean
}