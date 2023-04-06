//REACT QUERY KEY
export const ABOUT_ME = 'about_me';
export const USER = 'user';
export const EMPLOYEE_TIMEOFF = 'employee_timeoff';
export const EMPLOYEE_TIMEOFF_TAKEN = 'employee_timeoff_taken';
export const EMPLOYEE_TIMEOFF_REQS = 'employee_timeoff_reqs';
export const PAYROLL_YEARS = 'payroll_years';
export const ATTENDANCE_CONFIG = 'attendance_config';
export const ATTENDANCE_STATUS = 'attendance_status';
export const LOCATION_TYPE = 'location_type';
export const PAYSLIP_INFO = 'payslip_info';
export const PAYROLL_HISTORY = 'payroll_history';
export const MY_BUSINESS_ASSETS = 'my_business_assests';
export const BENEFITS = 'benefits';
export const WHOS_OUT = 'whos_out';
export const BIRTHDAYS = 'birthdays';
export const JOB_ANNIVERSARY = 'job_anniversary';
export const NEXT_OF_KINS = 'next_of_kins';
export const EMERGENCY = 'emergency';
export const BANKS = 'banks';
export const PENSION_PROVIDERS = 'pension_providers';
export const GET_ONBOARDING = 'get_onboarding';
export const GET_USERS = 'get_users';
export const GET_TEAMS = 'get_teams';
export const GET_DEPARTMENTS = 'get_departments';
export const GET_ALL_TASK = 'get_all_task';
export const GET_ALL_TODOS = 'get_to_dos';
export const GET_DUETODAY = 'get_duetoday';
export const GET_UPCOMING = 'get_upcoming';
export const GET_OVERDUE = 'get_overdue';
export const GET_ALL_SENT = 'get_all_sent';
export const GET_SENT_DUETODAY = 'get_sent_duetoday';
export const GET_SENT_UPCOMING = 'get_sent_upcoming';
export const GET_SENT_OVERDUE = 'get_sent_overdue';
export const GET_PERSONAL_TASKS = 'get_personal_tasks';
export const GET_PERSONAL_DUE = 'get_personal_due';
export const GET_PERSONAL_UPCOMING = 'get_personal_upcoming';
export const GET_PERSONAL_OVERDUE = 'get_personal_overdue';
export const GET_TEAM_TASKS = 'get_team_tasks';
export const GET_TEAM_DUETODAY = 'get_team_duetoday';
export const GET_TEAM_UPCOMING = 'get_team_upcoming';
export const GET_TEAM_OVERDUE = 'get_team_overdue';
export const GET_TASK_STATISTICS = 'get_task_statistics';
export const GET_SENT_STATISTICS = 'get_sent_statistics';
export const GET_EMPLOYEE_STATISTICS = 'get_employee_statistics';
export const GET_TEAM_STATISTICS = 'get_team_statistics';
export const GET_ACTIVITY = 'get_activity';
export const GET_COMMENTS = 'get_comments';

//PAYLOAD TYPES
export type RegisterTokenLoad = {
  user_type: 'business_user' | 'employee';
  registration_id: string;
};

export type RequestTimeoffPayload = {
  id: number;
  timeoff: number;
  start_date: string;
  end_date: string;
  reason: string;
};
export type currentCompanyType = {
  user: {
    business_id: string;
    employee_user_memberships: any;
    id: number;
  };
};
export type EmployeeProfileProps = {
  about_me: {
    id?: number;
  };
};
export type EditPassword = {
  data: {
    old_password: string;
    new_password: string;
    confirm_password: string;
  };
};
export type EditPension = {
  data: {
    id: number;
    account_name: null;
    account_number: string;
    pension_number: string;
    bank: string;
    provider: string;
  };
};
export type CommentProps = {
  comment: string;
  comment_by: number;
  task: number;
  due_date: string;
};
export type OnboardingProps = {
  type: string;
  employee: number;
  has_completed_mobile_navigation: boolean;
  has_completed_mobile_onboarding: boolean;
  id: number;
};
export type TaskStatusProps = {
    id: number,
    status: string,
}
export type TaskProps = {
    data: {
        title?: string,
        description?: string,
        due_date?:string
    },
    created_by?: string,
    assigned_to?: string,
    department?: string,
    status?: "To-do" | "In_progress" | "Completed",
    sub_tasks?:string[]
}
export type EmergencyContactProps = {
  data: {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    gender: string;
    nationality: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    postal_code: string;
    relationship: string;
  };
};
