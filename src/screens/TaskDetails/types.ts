import { useFetchTodosData } from "../TaskHome/types"

export type TaskDetailsParams = {
    id? : number
    title? : string
}

export type useFetchTaskByPKData = useFetchTodosData

export type useFetchTaskByPKProps = {
    data? : useFetchTaskByPKData
    isLoading : boolean
    isFetching : boolean
}

export type TaskAccordionType = "LOG_ACCORDION" | "COMMENT_ACCORDION"

export type TaskActivityData = {
    created_at?: string
    description?: string
    id?: number
    logged_by?: {
        first_name? : string
        last_name? : string
        photo? : string
    }
    modified_at?: string
    sub_task?: number
    task?: number
    type?: string
}

export type useFetchActivitiesData = {
    [index : string] : TaskActivityData[]
}

export type useFetchActivitiesProps = {
    data? : {
        pages? : {
            results : useFetchActivitiesData
        }[]
    }
    isLoading : boolean
    isFetching : boolean
}

export type TaskCommentData = {
    created_at?: string
    id?: number
    modified_at?: string
    task?: number
    comment? : string
    comment_by? : {
        email?: string
        first_name?: string
        id?: number
        last_name?: string
        photo? : string
    }
}

export type useFetchCommentsData = {
    [index : string] : TaskCommentData[]
}

export type useFetchCommentsProps = {
    data? : {
        pages? : {
            results : useFetchCommentsData
        }[]
    }
    isLoading : boolean
    isFetching : boolean
}

export type TaskListSection =  {
    key?: string,
    title?: string,
    is_accordion? : boolean
    type? : TaskAccordionType
    data: readonly TaskActivityData[] | readonly TaskCommentData[],
}