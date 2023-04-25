
export type useFetchEmployeesData = {
    id? : number
    department? : {
        id? : number
        name? : string
    }
    duration? : string
    email? : string
    employee_id? : string
    first_name? : string
    job? : {
        id? : number
        title? : string
    }
    last_name? : string
    photo? : string
    status?:string
}

export type useFetchEmployeesProps = {
    data? : {
        pages? : {
            results? : useFetchEmployeesData[]
        }[]
    }
    isLoading : boolean
    isFetching : boolean
    hasNextPage : boolean
    isFetchingNextPage : boolean
}
export type TabType = "All" | "My Team" | "Who's Out" | "Celebrations"

export type useFetchTeamsProps = useFetchEmployeesProps

export type CelebrationItem = {
    title: string
    avatar: string,
    subtitle: string,
    icon: {uri : string},
    date : string
    background? : string
}

export type Celebrations = {
    key: '1'
    date: string
    heading: 'Birthdays',
    data: CelebrationItem[]
} | {
    key: '2',
    date: string
    heading: 'Job Anniversary',
    data: CelebrationItem[]
    
} | {
    key: '2',
    date: string
    heading: 'Job Anniversary',
    data: CelebrationItem[]
    
} | {
    key: '3'
    date: string
    heading: 'Upcoming Birthdays'
    data: CelebrationItem[]
} | {
    key: '4',
    date: string
    heading: 'Upcoming Anniversary',
    data: CelebrationItem[]
    
}

export type WhosOutListItem = {
    title: string,
    avatar: string,
    subtitle: string,
    status: string,
    background: string,
}

export type WhosOutSection = {
    key: '1',
    date: 'Jan 12 - Jul 23',
    heading: 'On Leave',
    data: WhosOutListItem[]
}
