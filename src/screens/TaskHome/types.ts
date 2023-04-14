import { ViewStyle } from "react-native";

export type AddButtonProps = {
    onPress : () => void
    style? : ViewStyle
}

export type RenderItemProps = {
    item : string
}
export type useFetchStatisticsProps = {
    data?: useFetchStatisticsData
    isLoading : boolean
    isFetching : boolean
}

export type useFetchStatisticsData = {
    completed_count?: number
    duetoday_count?: number
    inprogress_count?: number
    no_date_count?: number
    overdue_count?: number
    todo_count?: number
    upcoming_count?: number
}

export type TaskTabType = 'All' | 'Due Today' | 'Upcoming' | 'Overdue' | 'No Date'

export type useFetchTodosData = {
    assigned_to? : {
        email?: string
        first_name?: string
        id?: number
        last_name?: string
        photo?: string
    }
    created_by? : {
        email?: string
        first_name?: string
        id?: number
        last_name?: string
        photo? : string
    }
    department? : {
        name? : string
        id? : number
    }
    id? : number
    status?: string
    description? : string
    due_date? : string
    sub_tasks_tasksapp? : []
    title? : string
    is_menu? : boolean
}

export type useFetchTodosProps = {
    data? : {
        pages? : {
            results? : useFetchTodosData[]
        }[]
    }
    isLoading : boolean
    isFetching : boolean
    hasNextPage : boolean
}
export type ActionTitleType = 'Completed' | "In Progress" | "To-Do"
export type ProgressCardType = {
    selected: ActionTitleType,
    image: string,
    selected_image: string,
    count: string,
    borderWidth: number,
    borderColor: string,
}