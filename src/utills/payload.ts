//REACT QUERY KEY
export const ABOUT_ME = 'about_me';
export const USER = 'user';
export const EMPLOYEE_TIMEOFF = 'employee_timeoff';
export const BASIC_DETAILS = 'basic_details';
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
export const GET_EMPLOYEES = 'get_employees';
export const GET_MY_TEAM_MEMBERS = 'get_my_team_members';
export const GET_DEPARTMENTS = 'get_departments';
export const GET_TASK_BY_PK = 'get_task_by_pk';
export const GET_TASKS = 'get_tasks';
// export const GET_DUETODAY = 'get_duetoday';
// export const GET_UPCOMING = 'get_upcoming';
// export const GET_OVERDUE = 'get_overdue';
// export const GET_ALL_SENT = 'get_all_sent';
// export const GET_SENT_DUETODAY = 'get_sent_duetoday';
// export const GET_SENT_UPCOMING = 'get_sent_upcoming';
// export const GET_SENT_OVERDUE = 'get_sent_overdue';
// export const GET_PERSONAL_TASKS = 'get_personal_tasks';
// export const GET_PERSONAL_DUE = 'get_personal_due';
// export const GET_PERSONAL_UPCOMING = 'get_personal_upcoming';
// export const GET_PERSONAL_OVERDUE = 'get_personal_overdue';
export const GET_TEAM_TASKS = 'get_team_tasks';
// export const GET_TEAM_DUETODAY = 'get_team_duetoday';
// export const GET_TEAM_UPCOMING = 'get_team_upcoming';
// export const GET_TEAM_OVERDUE = 'get_team_overdue';
export const GET_TASK_STATISTICS = 'get_task_statistics';
export const GET_SENT_STATISTICS = 'get_sent_statistics';
export const GET_EMPLOYEE_STATISTICS = 'get_employee_statistics';
export const GET_TEAM_STATISTICS = 'get_team_statistics';
export const GET_ACTIVITY = 'get_activity';
export const GET_COMMENTS = 'get_comments';
export const NOTIFICATIONS = 'notifications';
export const DOCUMENT = 'document';
export const TRAININGS = 'trainings';
export const TRAININGHISTORY = 'trainings_history';

//ONBOARDING TYPES

export const TASK_ONBOARDING = 'Task';

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
  old_password: string;
  new_password: string;
  confirm_password: string;
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
export type OnboardingLoad = {
  type: string;
  employee: number;
  has_completed_mobile_navigation: boolean;
  has_completed_mobile_onboarding: boolean;
};
export type UpdateOnboardingLoad = {
  type: string;
  employee: number;
  has_completed_mobile_navigation: boolean;
  has_completed_mobile_onboarding: boolean;
  id: number;
};
export type TaskStatusProps = {
  id: number;
  status: string;
};
export type TaskProps = {
  data: {
    title?: string;
    description?: string;
    due_date?: string;
  };
  created_by?: string;
  assigned_to?: string;
  department?: string;
  status?: 'To-do' | 'In_progress' | 'Completed';
  sub_tasks?: string[];
};
export type EmergencyContactProps = {
  
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

  id:number
};

export type EditProfileProps = {
  id: number
  title: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  birth_date: string | null;
  marital_status: string;
  gender: string
  phone_number1: string
  phone_number2: string
  address: {
    address1: string
    address2: string
    country: string
    state: string
    city: string
    postal_code: string
  },

}
  
export type verifyBank = {
   account_number: string,
    bank_code: string 
}


export type LoginLoad = {
  email: string;
  password: string;
};

export type RemoveDeviceTokenLoad = {
  registration_id : string
}

export type TaskDueDateFilter = "duetoday" | "upcoming" | "overdue" | "nodate" | "" 
export type TaskProgressStatus = "To-do" | "In-progress" | "Completed" | ""
export type updatePensionAccountProps = {
  id:number
    bank_account?: {
      bank?: number,
      account_number?: string,
      account_name?: string
    },
    pension?: {
      provider?: number,
      pension_number?: string
    },
    is_pension_applicable?: boolean
  }


export type TaskStatisticFilter = "created_by_me_and_sent" | "assigned_to_me" | ""
