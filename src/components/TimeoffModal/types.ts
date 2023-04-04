export type TimeOffModalData = {
    start_date : string
   end_date : string
   reason : string
 }
export type TimeoffModalProps = {
    isVisible : boolean
    onHide : () => void
    timeoff_id? : number
    data : TimeOffModalData
    datePickerHandler : (action : string) => void
    onChangeText : (value : string) => void
}

export type useFetchAboutMeData = {
    id?: number
    employee_id? : 11
    photo? : string,
    
    // "title":"","title_display":"","first_name":"Grace","middle_name":"","last_name":"Olaleye","email":"lumlabigni@gufum.com","hire_date":"2022-11-29","marital_status":"","marital_status_display":"","gender":"","gender_display":"","nationality":"","phone_number1":"","phone_number2":"","birth_date":null,"type":"full_time","type_display":"Full time","level":null,"line_manager":{"id":3,"photo":null,"employee_id":"3","first_name":"Christy","middle_name":"","last_name":"Assam"},"address":{"id":1,"address1":"","address2":"","country":"NG","country_display":"Nigeria","state":"","city":"","postal_code":"","personal_email":null},"department":{"id":4,"name":"Communications"},"region":{"id":1,"name":"Remote"},"job":{"id":9,"title":"Social media manager"},"compensation":{"id":13,"amount":210526.32,"num_week_days":5.0,"amount_per":"","type":"full_time","work_hours":null,"start_date":"2023-03-13","end_date":null},"bank_account":null,"pension":null,"user_access_status":null,"completed_user_onboarding":true,"is_active":true,"terminated_at":null,"termination_reason":"","is_pension_applicable":false,"employee_job":{"hire_date":null,"start_date":"2023-03-13","work_type":"office","employee":{"line_manager":{"first_name":"Christy","last_name":"Assam"},"region":{"id":1,"name":"Remote"}},"arrival_time":"08:00:00","close_time":"17:00:00","job":9,"compensation":{"amount":210526.32,"num_week_days":5,"type":"full_time"},"work_days":["Monday","Tuesday","Wednesday","Thursday","Friday"]}
}

export type useFetchAboutMeProps = {
    data? : useFetchAboutMeData
    isLoading : boolean
}