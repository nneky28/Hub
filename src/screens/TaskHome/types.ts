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