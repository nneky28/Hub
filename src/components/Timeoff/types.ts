import { useFetchEmployeeTimeOffData, useFetchEmployeeTimeOffReqsData, useFetchEmployeeTimeOffTakenData } from "../../screens/Dashboard/types";

export type RenderItemVerticalParams = {
    status : "balance"
    item : useFetchEmployeeTimeOffData
} | {
    status : "request"
    item : useFetchEmployeeTimeOffReqsData
} | {
    status : "fewDays" | "active"
    item : useFetchEmployeeTimeOffTakenData
}

export type TimeoffVerticalProps = {
    data : "balance"
    load : useFetchEmployeeTimeOffData[] ,
    onItemPress? : (param : RenderItemVerticalParams) => void
    header_1 : string
    header_2 : string
} | {
    data : "request"
    load : useFetchEmployeeTimeOffReqsData[],
    onItemPress? : (param : RenderItemVerticalParams) => void
    header_1 : string
    header_2 : string
} | {
    data : "fewDays" | "active"
    load : useFetchEmployeeTimeOffTakenData[],
    onItemPress? : (param : RenderItemVerticalParams) => void
    header_1 : string
    header_2 : string
}

export type RenderItemVerticalProps = {
    status : "balance"
    fData : useFetchEmployeeTimeOffData,
    onItemPress? : (param : RenderItemVerticalParams) => void
} | {
    status : "request"
    fData : useFetchEmployeeTimeOffReqsData,
    onItemPress? : (param : RenderItemVerticalParams) => void
} | {
    status : "fewDays" | "active"
    fData : useFetchEmployeeTimeOffTakenData,
    onItemPress? : (param : RenderItemVerticalParams) => void
}

export type RenderItemHorizontalProps = RenderItemVerticalProps
export type TimeOffHorizontalProps = {
    data : "balance"
    load : useFetchEmployeeTimeOffData[] ,
    onItemPress? : (param : RenderItemVerticalParams) => void
} | {
    data : "request"
    load : useFetchEmployeeTimeOffReqsData[],
    onItemPress? : (param : RenderItemVerticalParams) => void
} | {
    data : "fewDays" | "active"
    load : useFetchEmployeeTimeOffTakenData[],
    onItemPress? : (param : RenderItemVerticalParams) => void
}