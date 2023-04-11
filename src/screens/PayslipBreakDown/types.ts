import { useFetchPayrollHistoryData } from "../PayslipHistory/types";

export type PayslipBreakDownParams = {
    payroll? : useFetchPayrollHistoryData
}

export type PayslipYearAggregate = {
    sum_total_allowances? : number
    sum_total_deductions? : number
    total_gross_salary? : number
    total_net_salary? : number
    total_paye? : number
    total_contribution? : number
}
export type SalaryBreakdown = {
    id? : number
    is_default? : boolean
    name? : string
    percent? : number
    value? : number
}

type ItemsType = {
    [index : string] : string
}

export type useFetchPayrollMonthHistoryResult = {
    absentee_fine? : number
    bank? : {
        account_name? : string
        account_number? : number
        bank? : string
    }
    bonus? : number
    commission? : number
    compensation? : number
    created_at? : string
    employee? : {
        email? : string
        first_name? : string
        hire_date? : string
        id? : number
        last_name? : string
    }
    gross_salary? : string
    id? : number
    is_auto_absentee_fine? : boolean
    job? : {
        end_date? : string
        id? : number
        start_date? : string
        title? : string
    }
    net_salary? : number
    nhf? : number
    num_days_absent? : number
    num_days_present? : number
    other_allowances? : number
    other_deductions? : number
    paye? : number
    payment_additions? : ItemsType[]
    payment_deductions? : ItemsType[]
    pension? : number
    salary? : number
    salary_breakdown : SalaryBreakdown[]
}

export type useFetchPayslipInfoData = {
    id? : number
    pay_date? : string
    period_end_date? : string
    period_start_date? : string
    pay_month_date? : string
    published? : boolean
    salary_breakdown? : SalaryBreakdown[]
    total_working_days? : number
    data? : useFetchPayrollMonthHistoryResult & {
        total_deductions? : number
        staff_loan? : number
    }
    year_aggregate? : PayslipYearAggregate
}
export type useFetchPayslipInfoProps = {
    data? : useFetchPayslipInfoData
    isLoading : boolean
    isFetching : boolean
}