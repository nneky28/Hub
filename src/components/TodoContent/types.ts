import { ActionTitleType, useFetchTodosData } from "../../screens/TaskHome/types";

export type  TodoContentProps = {
    item: useFetchTodosData;
    index: number;
    title: ActionTitleType;
    id?: number;
}