import { ActionTitleType, useFetchTodosData } from "../../screens/TaskHome/types";

export type  TodoContentProps = {
    item: useFetchTodosData;
    index: number;
    title: ActionTitleType;
    id?: number;
}

export type MenuListItem = "View task" | "Mark task as completed" | "Mark task as not started" | "Edit task" | "Delete task" | "Undo completed" | "Mark task as started"
export type DUE_STATUS = "OVER_DUE" | "DUE_TODAY" | "UPCOMING" | "NO_DATE" | ""