export type useFetchPayrollYearsProps = {
    data? : number[],
    isLoading : boolean
    isFetching : boolean
}
export type useFetchPayrollHistoryData = {
    pay_date? : string
    payschedule? : number
    payschedule_created_at? : string
    payschedule_is_last? : boolean
    period_end_date?: string
    period_start_date?: string
    sum_total_allowances?: number
    sum_total_deductions?: number
    total_gross_salary?: number
    total_net_salary?: number
    total_paye?: number
    id?: 355
}
export type useFetchPayrollHistoryProps = {
    data? : {
        data? : useFetchPayrollHistoryData[],
        year? : number 
    }
    isLoading : boolean
    isFetching : boolean
}