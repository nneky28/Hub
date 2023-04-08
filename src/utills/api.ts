import axios from "axios";
import { getData, getStoreAboutMe, getStoredBusiness } from "./Methods";
import { useQuery, useInfiniteQuery } from "react-query"
import Config from "react-native-config";
import {
  ABOUT_ME,
  currentCompanyType,
  EmployeeProfileProps,
  EMPLOYEE_TIMEOFF,
  EMPLOYEE_TIMEOFF_TAKEN,
  PAYROLL_YEARS,
  RegisterTokenLoad,
  RequestTimeoffPayload,
  EMPLOYEE_TIMEOFF_REQS,
  ATTENDANCE_CONFIG,
  ATTENDANCE_STATUS,
  LOCATION_TYPE,
  PAYSLIP_INFO,
  PAYROLL_HISTORY,
  MY_BUSINESS_ASSETS,
  BENEFITS,
  WHOS_OUT,
  BIRTHDAYS,
  JOB_ANNIVERSARY,
  NEXT_OF_KINS,
  EMERGENCY,
  BANKS,
  PENSION_PROVIDERS,
  GET_ONBOARDING,
  GET_USERS,
  GET_TEAMS,
  GET_DEPARTMENTS,
  GET_ALL_TASK,
  GET_ALL_TODOS,
  GET_DUETODAY,
  GET_UPCOMING,
  GET_OVERDUE,
  GET_ALL_SENT,
  GET_SENT_DUETODAY,
  GET_SENT_UPCOMING,
  GET_SENT_OVERDUE,
  GET_PERSONAL_TASKS,
  GET_PERSONAL_DUE,
  GET_PERSONAL_UPCOMING,
  GET_PERSONAL_OVERDUE,
  GET_TEAM_TASKS,
  GET_TEAM_DUETODAY,
  GET_TEAM_UPCOMING,
  GET_TEAM_OVERDUE,
  GET_TASK_STATISTICS,
  GET_SENT_STATISTICS,
  GET_EMPLOYEE_STATISTICS,
  GET_TEAM_STATISTICS,
  GET_ACTIVITY,
  GET_COMMENTS,
  EmergencyContactProps,
  EditPassword,
  OnboardingProps,
  CommentProps,
  TaskStatusProps,
  TaskProps,
  LoginLoad,
  RemoveDeviceTokenLoad,
  NOTIFICATIONS
} from "./payload";

export const endPoint = Config.API_URL;
//export const endPoint = 'https://api.bizedgeapp.com';

export const employees_me = (business_id:string) => `/c/${business_id}/employees/me/`;
export const APIFunction = {
  employees: (business_id:string, page = 1, search = "") => `/c/${business_id}/employees/?page=${page}&search=${search}`,
  team_members: (business_id:string, id:number, page = 1) => `/c/${business_id}/employees/${id}/team_members/?page=${page}`,
  basic_details: (business_id: string, id: number) => `/c/${business_id}/employees/${id}/basic_detail/`,
  
  login: async (fd?:LoginLoad) => {
    return postNoToken(`/accounts/auth/login/`, fd)
  },
  next_of_kins: async (id:number) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/${id}/next-of-kin/`)
  },
  whos_out: async (category : string) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/timeoff_taken/widgets/whos_out/?category=${category}`)
  },
  birthdays: async (status : string) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/dashboard/birthdays/?status=${status}`)
  },
  my_business_assests: async (employee_pk : number) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/${employee_pk}/asset_vehicles/`)
  },
  benefits: async (employee_pk: number) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/${employee_pk}/benefits/`)

  },
  emergency: async (id : number) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/${id}/emergency-contact/`)
  },
  update_emergency: async (fd:EmergencyContactProps, id:number) => {
    let biz = await getStoredBusiness();
    return putAPIs(`/c/${biz?.business_id}/employees/${id}/update-emergency-contact/`, fd)
  },
  update_photo: (business_id: string | number, id: number) => `/c/${business_id}/employees/${id}/update-photo/`,
  
  edit: async (fd:any, id:any) => {
    let biz = await getStoredBusiness();
    return putAPIs(`/c/${biz?.business_id}/employees/${id}/`, fd);
  },
  trainings: (business_id:string, id:number) => `/c/${business_id}/employees/${id}/training/`,
  training_hist: (business_id:string, id:number) => `/c/${business_id}/employees/${id}/training/history/`,
  timeoff: (business_id:string, id:number) => `/c/${business_id}/employees/${id}/timeoff/`,
  timeoff_reqs: (business_id:string, id:number) => `/c/${business_id}/employees/${id}/timeoff_requests/`,
  timeoff_taken: (business_id:string, id:number, status:string) => `/c/${business_id}/employees/${id}/timeoff_taken/?status=${status}`,
  delete_timeoff: async (timeoff_id:number) => {
    const user = await getStoreAboutMe()
    const biz = await getStoredBusiness()
    return deleteAPIs(`/c/${biz?.business_id}/employees/${user?.id}/timeoff_requests/${timeoff_id}/`)
  },

  employee_timeoff: async (id : number) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/${id}/timeoff/`)
  },

  request_timeoff : async (fd : RequestTimeoffPayload) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz?.business_id}/employees/${fd.id}/timeoff_requests/`, fd)
  },
  employee_timeoff_taken: async (id:number, status:string) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/${id}/timeoff_taken/?status=${status}`)
  },
  employee_timeoff_reqs: async (id : number) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/${id}/timeoff_requests/`)
  },
  job_anniversary: async (status:string, page = 1) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/dashboard/job_anniversary/?status=${status}&page=${page}`)
  },
  notifications: async (page = 1) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/notifications/?page=${page}`)
  },
  unseen_count: async () => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/notifications/unseen_count/`)
  },
  change_password: async (fd: EditPassword) => postAPIs(`/accounts/auth/password/change/`, fd),
  
  pension_providers: async () => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/pension_providers/`)
  },
  banks: async () => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/banks/`)
  },
  update_next_of_kin: async (fd:EmergencyContactProps, id:number) => {
    let biz = await getStoredBusiness();
    return putAPIs(`/c/${biz?.business_id}/employees/${id}/update-next-of-kin/`, fd)
  },
  update_pension: async(fd?:any) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz?.business_id}/employees/${fd.id}/update_pension_bank_account/`, fd)
  },
  about_me: async (biz_id = null) => {
    if(biz_id) return await getAPIs(`/c/${biz_id}/employees/me/`);
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/me/`);
  },
  read_notification: async (id:number) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz?.business_id}/employees/notifications/${id}/read/`)
  },
  bank_verification: async (fd?:any) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz?.business_id}/banks/account_number_validation/`, fd)
  },
  seen_all: async () => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz?.business_id}/employees/notifications/seen_all/`)
  },
  remove_photo: async (employee_id:number) => {
    let biz = await getStoredBusiness();
    return putAPIs(`/c/${biz?.business_id}/employees/${employee_id}/delete-photo/`)
  },
  employee_tasks: async (employee_id:number, completed = false) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/employees/${employee_id}/onboarding_tasks/?is_completed=${completed}`)
  },
  toggle_completed: async (employee_id:number, task_id:number, fd:any) => {
    let biz = await getStoredBusiness()
    return putAPIs(`/c/${biz?.business_id}/employees/${employee_id}/onboarding_tasks/${task_id}/toggle_completed/`, fd)
  },
  employee_doc: async (id:number) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/employees/${id}/documents/`)
  },
  report_asset: async (fd:any, id:number) => {
    let biz = await getStoredBusiness()
    return postAPIs(`/c/${biz?.business_id}/asset-management/assets/${id}/issues/report/`, fd)
  },
  user_info: async () => {
    return getAPIs(`/accounts/auth/user/`)
  },
  onboarded: async (employee_id:number) => {
    let biz = await getStoredBusiness()
    return postAPIs(`/c/${biz?.business_id}/employees/${employee_id}/complete_user_onboarding/`)
  },
  attendance_config: async (limit = 1) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/v2/attendance/config/?page_size=${limit}`)
  },
  attendance_status: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/v2/attendance/status/`)
  },
  employee_clock_in: async (fd:any) => {
    let biz = await getStoredBusiness()
    return postAPIs(`/c/${biz?.business_id}/v2/attendance/clock_in/`, fd)
  },
  employee_clock_out: async (fd:any) => {
    let biz = await getStoredBusiness()
    return postAPIs(`/c/${biz?.business_id}/v2/attendance/clock_out/`, fd)
  },
  payslip_info: async (date:string, payroll_id:number) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/employee_payroll_month_history/${date}/payslip/?payroll=${payroll_id}`)
  },
  payroll_history: async (year:number) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/employee_payroll_year_history/?year=${year}`)
  },
  payroll_years: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/employee_payroll_year_history/years/`)
  },
  location_type: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/v2/attendance/location_type/`)
  },
  error_report: async (fd:any) => {
    return postNoToken('/mobile_error_report', fd)
  },
  post_onboarding: async (fd:OnboardingProps) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz?.business_id}/app_onboarding/`, fd)
  },
  update_onboarding: async (fd:OnboardingProps) => {
    let biz = await getStoredBusiness()
    return putAPIs(`/c/${biz?.business_id}/app_onboarding/${fd.id}/`, fd)
  },
  get_onboarding: async (type:string) => {
    let biz = await getStoredBusiness()
    let user = await getStoreAboutMe()
    return getAPIs(`/c/${biz?.business_id}/app_onboarding/?${type}&employee_id=${user?.id}`)
  },
  post_task: async (fd:TaskProps) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz?.business_id}/tasks_app/`, fd)
  },
  post_sub_Task: async (fd:any) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz?.business_id}/sub_tasks_app/`, fd)
  },
  post_comment: async (fd:CommentProps) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz?.business_id}/tasks_app_comments/`, fd)
  },
  update_status: async (fd:TaskStatusProps) => {
    let biz = await getStoredBusiness()
    return putAPIs(`/c/${biz?.business_id}/tasks_app/${fd.id}/`, fd)
  },
  delete_task: async (fd:any) => {
    let biz = await getStoredBusiness()
    return deleteAPIs(`/c/${biz?.business_id}/tasks_app/${fd}/`)
  },
  update_sub_task: async (fd:any) => {
    let biz = await getStoredBusiness()
    return putAPIs(`/c/${biz?.business_id}/sub_tasks_app/${fd.id}/`, fd)
  },
  get_to_dos: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/get_my_or_employees_tasks/?filter=assigned_to_me`)
  },
  get_all_task: async (id:number) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/${id}/`)
  },
  get_duetoday: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/get_my_or_employees_tasks/?filter=assigned_to_me&due_date_status=duetoday`)
  },
  get_upcoming: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/get_my_or_employees_tasks/?filter=assigned_to_me&due_date_status=upcoming`)
  },
  get_overdue: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/get_my_or_employees_tasks/?filter=assigned_to_me&due_date_status=overdue`)
  },

  get_team_statistics: async (id:number) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/get_tasks_statistics/?department_id=${id}`)
  },
  get_team_duetoday: async (id:number) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/department_or_team_tasks/?department_id=${id}&due_date_status=duetoday`)
  },
  get_team_upcoming: async (id:number) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/department_or_team_tasks/?department_id=${id}&due_date_status=upcoming`)
  },
  get_team_overdue: async (id:number) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/department_or_team_tasks/?department_id=${id}&due_date_status=overdue`)
  },

  get_personal_tasks: async (id:number) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/get_my_or_employees_tasks/?filter=assigned_to_me&employee_id=${id}`)
  },

  get_personal_due: async (id:number) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/get_my_or_employees_tasks/?filter=assigned_to_me&employee_id=${id}&due_date_status=duetoday`)
  },
  get_personal_upcoming: async (id:number) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/get_my_or_employees_tasks/?filter=assigned_to_me&employee_id=${id}&due_date_status=upcoming`)
  },
  get_personal_overdue: async (id:number) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/get_my_or_employees_tasks/?filter=assigned_to_me&employee_id=${id}&due_date_status=overdue`)
  },

  get_task_statistics: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/get_tasks_statistics/?filter=assigned_to_me`)
  },
  get_sent_statistics: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/get_tasks_statistics/?filter=created_by_me_and_sent`)
  },

  get_employee_statistics: async (id:number) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/get_tasks_statistics/?filter=assigned_to_me&employee_id=${id}`)
  },

  get_team_tasks: async (id:number) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/department_or_team_tasks/?department_id=${id}`)
  },
  get_all_sent: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/get_my_or_employees_tasks/?filter=created_by_me_and_sent`)
  },
  get_sent_duetoday: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/get_my_or_employees_tasks/?filter=created_by_me_and_sent&due_date_status=duetoday`)
  },
  get_sent_upcoming: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/get_my_or_employees_tasks/?filter=created_by_me_and_sent&due_date_status=upcoming`)
  },
  get_sent_overdue: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/get_my_or_employees_tasks/?filter=created_by_me_and_sent&due_date_status=overdue`)
  },
  get_activity: async (id:number) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app_activity/tasks_activity_order_by_date/?task_id=${id}`)
  },
  get_comments: async (id:number) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app_comments/tasks_comment_order_by_date/?task_id=${id}`)
  },

  departments: async (page:number, search:string) => {
    const {user} = await getData('user') as currentCompanyType
    const business_id = user?.employee_user_memberships?.[0]?.business_id
    return getAPIs(`/c/${business_id}/departments/?page=${page}&search=${search}`)
  },
  get_users: async (page = 1, search = "") => {
  const {user }= await getData("user") as currentCompanyType
    const business_id = user?.employee_user_memberships?.[0]?.business_id
    return getAPIs(`/c/${business_id}/employees/?page=${page}&search=${search}`)
  },
  get_teams: async (page = 1) => {
    const{ user} = await getData('user') as currentCompanyType
    const business_id = user?.employee_user_memberships?.[0]?.business_id
    const {about_me} = await getData("about_me") as EmployeeProfileProps
    const id = about_me?.id
    return getAPIs(`/c/${business_id}/employees/${id}/team_members/?page=${page}`)
  },
  register_device_token : async (fd : RegisterTokenLoad) => {
    let biz = await getStoredBusiness()
    return postAPIs(`/c/${biz?.business_id}/firebase_notifications/`,fd)
  },
  remove_device_token : async (fd : RemoveDeviceTokenLoad) => {
    let biz = await getStoredBusiness()
    return deleteAPIs(`/c/${biz?.business_id}/firebase_notifications/custom_destroy/`,fd)
  },
}

export const useFetchAboutMe = (tab : string) => {
  return useQuery(ABOUT_ME,()=>APIFunction.about_me(),{
    enabled : tab === "main"
  })
}

export const useFetchEmployeeTimeOff = (id:number | string) => {
  return useQuery([EMPLOYEE_TIMEOFF, id], () => APIFunction.employee_timeoff(id as number), {
    enabled: !!id
  })
}

export const useFetchEmployeeTimeOffTaken = (id:number | string, status:string) => {
  return useQuery([EMPLOYEE_TIMEOFF_TAKEN, id, status], () => APIFunction.employee_timeoff_taken(id as number, status), {
    enabled: !!id && !!status
  })
}

export const useFetchEmployeeTimeOffReqs = (id:number | string) => {
  return useQuery([EMPLOYEE_TIMEOFF_REQS, id], () => APIFunction.employee_timeoff_reqs(id as number), {
    enabled: !!id
  })
}

export const useFetchPayrollYears = () => {
  return useQuery(PAYROLL_YEARS, APIFunction.payroll_years)
}

export const useFetchAttendanceConfig = (tab : string) => {
  return useQuery([ATTENDANCE_CONFIG], () => APIFunction.attendance_config(),{
    enabled : tab === "main"
  })
}
export const useFetchAttendanceStatus = (tab : string) => {
  return useQuery(ATTENDANCE_STATUS, APIFunction.attendance_status,{
    enabled : tab === "main"
  })
}
export const useFetchLocationType = () => {
  return useQuery(LOCATION_TYPE, APIFunction.location_type)
}

export const useFetchPayslipInfo = (date:string, id:number) => {
  return useQuery([PAYSLIP_INFO, date, id], () => APIFunction.payslip_info(date, id), {
    enabled: date !== null && date !== undefined && id !== null && id !== undefined
  })
}

export const useFetchPayrollHistory = (year:number) => {
  return useQuery([PAYROLL_HISTORY, year], () => APIFunction.payroll_history(year), {
    enabled: !!year 
  })
}

export const useFetchAssets = (employee_pk?:number) => {
  return useQuery([MY_BUSINESS_ASSETS, employee_pk], () => APIFunction.my_business_assests(employee_pk as number), {
    enabled: !!employee_pk 
  })
}

export const useFetchBenefits = (employee_pk?:number) => {
  return useQuery([BENEFITS, employee_pk], () => APIFunction.benefits(employee_pk as number), {
    enabled: !!employee_pk 
  })
}

export const useFetchWhosOut = (category = "timeoff") => {
  return useQuery([WHOS_OUT, category], () => APIFunction.whos_out(category), {
    enabled: !!category
  })
}


export const useFetchBirthdays = (status:string) => {
  return useQuery([BIRTHDAYS, status], () => APIFunction.birthdays(status), {
    enabled: status !== null && status !== undefined && status !== ""
  })
}

export const useFetchAnniversary = (status:string, page = 1) => {
  return useQuery([JOB_ANNIVERSARY, status, page], () => APIFunction.job_anniversary(status, page), {
    enabled: status !== null && status !== undefined && status !== ""
  })
}



export const useFetchKin = (employee_id:number) => {
  return useQuery([NEXT_OF_KINS, employee_id], () => APIFunction.next_of_kins(employee_id), {
    enabled: !! employee_id
  })
}

export const useFetchEmergency = (employee_id:number) => {
  return useQuery([EMERGENCY, employee_id], () => APIFunction.emergency(employee_id), {
    enabled: !!employee_id 
  })
}

export const useFetchBanking = () => {
  return useQuery(BANKS, APIFunction.banks)
}

export const useFetchProviders = () => {
  return useQuery(PENSION_PROVIDERS, APIFunction.pension_providers)
}

export const useFetchOnboarding = (type:string) => {
  return useQuery([GET_ONBOARDING], () => APIFunction.get_onboarding(type), {
    enabled: !!type
  }

  )
}
export const useFetchEmployees = (page:number, search:string) => {
  return useInfiniteQuery([GET_USERS, page, search], () => APIFunction.get_users(page, search), {
    getNextPageParam: () => {
      // return lastPage.next
    }
  }
  )
}

export const useFetchTeams = (page:number) => {
  return useInfiniteQuery([GET_TEAMS, page], () => APIFunction.get_teams(page), {
    getNextPageParam: () => {
      // return lastPage.next
    }
  }
  )
}

export const useFetchNotifications = (page:number) => {
  return useInfiniteQuery([NOTIFICATIONS, page], () => APIFunction.notifications(page), {
    getNextPageParam: (lastPage : any) => {
      return lastPage?.next
    }
  }
  )
}


export const useFetchDepartments = (page:number, search:string) => {
  return useInfiniteQuery([GET_DEPARTMENTS, page, search], () => APIFunction.departments(page, search), {
    getNextPageParam: () => {
      // return lastPage.next
    }
  })
}
export const useFetchAllTask = (id:number) => {
  return useInfiniteQuery([GET_ALL_TASK, id], () => APIFunction.get_all_task(id), {
    enabled: id !== null && id !== undefined
  })
}

export const useFetchTodos = (tab:string, index:number) => {
  return useInfiniteQuery([GET_ALL_TODOS, tab], () => APIFunction.get_to_dos(), {
    enabled: index === 0 && index !== null && index !== undefined
  })
}

export const useFetchDueToday = (tab:string, index:number) => {
  return useInfiniteQuery([GET_DUETODAY, tab], () => APIFunction.get_duetoday(), {
    enabled: index == 0 && tab === "Due Today" && tab !== null && tab !== undefined
  })
}
export const useFetchUpcoming = (tab:string, index:number) => {
  return useInfiniteQuery([GET_UPCOMING, tab], () => APIFunction.get_upcoming(), {
    enabled: index === 0 && tab === "Upcoming" && tab !== null && tab !== undefined
  })
}
export const useFetchOverDue = (tab:string, index:number) => {
  return useInfiniteQuery([GET_OVERDUE, tab], () => APIFunction.get_overdue(), {
    enabled: index === 0 && tab === "Overdue" && tab !== null && tab !== undefined
  })
}
export const useFetchAllSent = (tab:string, index:number) => {
  return useInfiniteQuery([GET_ALL_SENT, tab], () => APIFunction.get_all_sent(), {
    enabled: index === 1 && index !== null && index !== undefined
  })
}
export const useFetchAllSentDue = (tab:string, index:number) => {
  return useInfiniteQuery([GET_SENT_DUETODAY, tab], () => APIFunction.get_sent_duetoday(), {
    enabled: index === 1 && tab === "Due Today" && tab !== null && tab !== undefined
  })
}
export const useFetchAllSentUpcoming = (tab:string, index:number) => {
  return useInfiniteQuery([GET_SENT_UPCOMING, tab], () => APIFunction.get_sent_upcoming(), {
    enabled: index === 1 && tab === "Upcoming" && tab !== null && tab !== undefined
  })
}
export const useFetchAllSentOverdue = (tab:string, index:number) => {
  return useInfiniteQuery([GET_SENT_OVERDUE, tab], () => APIFunction.get_sent_overdue(), {
    enabled: index === 1 && tab === "Overdue" && tab !== null && tab !== undefined
  })
}
export const useFetchPersonalTask = (tab:string, id:number) => {
  return useInfiniteQuery([GET_PERSONAL_TASKS, id], () => APIFunction.get_personal_tasks(id), {
    enabled: tab === "All" && id !== null && id !== undefined,
  })
}
export const useFetchPersonalDue = (tab:string, id:number) => {
  return useInfiniteQuery([GET_PERSONAL_DUE, id], () => APIFunction.get_personal_due(id), {
    enabled: tab === "Due Today" && id !== null && id !== undefined,
  })
}
export const useFetchPersonalUpcoming = (tab:string, id:number) => {
  return useInfiniteQuery([GET_PERSONAL_UPCOMING, id], () => APIFunction.get_personal_upcoming(id), {
    enabled: tab === "Upcoming" && id !== null && id !== undefined,
  })
}
export const useFetchPersonalOverdue = (tab:string, id:number) => {
  return useInfiniteQuery([GET_PERSONAL_OVERDUE, id], () => APIFunction.get_personal_overdue(id), {
    enabled: tab === "Overdue" && id !== null && id !== undefined,
  })
}
export const useFetchTeamTask = (tab:string, id:number) => {
  return useInfiniteQuery([GET_TEAM_TASKS, id], () => APIFunction.get_team_tasks(id), {
    enabled: tab === "All" && id !== null && id !== undefined
  })
}

export const useFetchTeamDuetoday = (tab:string, id:number) => {
  return useInfiniteQuery([GET_TEAM_DUETODAY, id], () => APIFunction.get_team_duetoday(id), {
    enabled: tab === "Due Today" && id !== null && id !== undefined
  })
}

export const useFetchMyTeamUpcoming = (tab:string, id:number) => {
  return useInfiniteQuery([GET_TEAM_UPCOMING, id], () => APIFunction.get_team_upcoming(id), {
    enabled: tab === "Upcoming" && id !== null && id !== undefined,

  })
}
export const useFetchMyTeamOverdue = (tab:string, id:number) => {
  return useInfiniteQuery([GET_TEAM_OVERDUE, id], () => APIFunction.get_team_overdue(id), {
    enabled: tab === "Overdue" && id !== null && id !== undefined,
  })
}

export const useFetchStatistics = () => {
  return useQuery(GET_TASK_STATISTICS, APIFunction.get_task_statistics)
}
export const useFetchSentStatistics = () => {
  return useQuery(GET_SENT_STATISTICS, APIFunction.get_sent_statistics)
}

export const useFetchPeopleStatics = (id:number) => {
  return useQuery([GET_EMPLOYEE_STATISTICS, id], () => APIFunction.get_employee_statistics(id), {
    enabled: id !== null && id !== undefined
  },

  )
}
export const useFetchTeamStatistics = (id:number) => {
  return useQuery([GET_TEAM_STATISTICS, id], () => APIFunction.get_team_statistics(id), {
    enabled: id !== null && id !== undefined
  },)
}

export const useFetchActivities = (id:number) => {
  return useInfiniteQuery([GET_ACTIVITY, id], () => APIFunction.get_activity(id), {
    getNextPageParam: () => {
      // return lastPage.next
    }
  })
}
export const useFetchComments = (id:number) => {
  return useInfiniteQuery([GET_COMMENTS, id], () => APIFunction.get_comments(id), {
    getNextPageParam: () => {
      // return lastPage.next
    }
  })
}

export const getAPIs = async (path : string) => {
  let _token = await getData("token");
  console.log("getAPIs",_token)
  return new Promise((resolve, reject) => {
    axios
      .get(`${endPoint}${path}`, {
          headers: {
            Authorization: `Bearer ${_token}`,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
          }
        }
      )
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        if (
          error.response && error.response.data &&
          error.response.data.detail && typeof (error.response.data.detail) === "string"
        ) {
          reject({ status: 400, msg: error.response.data.detail });
        } else {
          reject({ status: 500, msg: 'Something went wrong. Please retry.' });
        }
      });
  });
};


export const postAPIs = async (path : string, fd? : any) => {
  let _token = await getData("token");
  return new Promise((resolve, reject) => {
    axios({
      url: `${endPoint}${path}`,
      method: 'post',
      data: fd,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${_token}`,
      },
    })
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        if (
          error.response && error.response.data &&
          error.response.data.detail && typeof (error.response.data.detail) === "string"
        ) {
          reject({ status: 400, msg: error.response.data.detail });
        } else if (
          error?.response?.data &&
          typeof error?.response?.data === "object") {
          reject({ status: 400, msg: Object.values(error?.response?.data).toString() });
        } else {
          reject({ status: 500, msg: 'Something went wrong. Please retry.' });
        }
      });
  });
};

export const deleteAPIs = async (path : string,fd? : any) => {
  let _token = await getData("token");
  return new Promise((resolve, reject) => {
    axios.delete(
      `${endPoint}${path}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${_token}`
        },
        data : fd
      }
    )
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        if (
          error.response && error.response.data &&
          error.response.data.detail && typeof (error.response.data.detail) === "string"
        ) {
          reject({ status: 400, msg: error.response.data.detail });
        } else if (
          error?.response?.data &&
          typeof error?.response?.data === "object") {
          reject({ status: 400, msg: Object.values(error?.response?.data).toString() });
        } else {
          reject({ status: 500, msg: 'Something went wrong. Please retry.' });
        }
      });
  });
};

export const putAPIs = async (path:string, fd?:{[index:string]:any}) => {
  let _token = await getData("token");
  return new Promise((resolve, reject) => {
    axios({
      url: `${endPoint}${path}`,
      method: 'put',
      data: fd,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${_token}`,
      },
    })
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        if (
          error.response && error.response.data && error.response.data.msg &&
          error.response.data.msg.detail && typeof (error.response.data.msg.detail) === "string"
        ) {
          reject({ status: 400, msg: error.response.data.msg.detail });
        } else if (
          error?.response?.data &&
          typeof error?.response?.data === "object") {
          reject({ status: 400, msg: Object.values(error?.response?.data).toString() });
        } else {
          reject({ status: 500, msg: 'Something went wrong. Please retry.' });
        }
      });
  });
};

export const postNoToken = (path:string, fd?:any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${endPoint}${path}`, fd, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        if (typeof (error?.response?.data?.msg?.detail) === "string") {
          reject({ status: 400, msg: error?.response?.data?.msg?.detail });
        } else if (error?.response?.data?.code === "invalid_credentials") {
          reject({ status: 400, msg: "Unable to login with the provided credentials" });
        } else {
          reject({ status: 400, msg: 'Something went wrong. Please try again later' });
        }
      });
  });
};

export const storeFile = async (path:string, fd?:any) => {
  let _token = await getData("token");
  return new Promise((resolve, reject) => {
    axios({
      url: `${endPoint}${path}`,
      method: 'POST',
      data: fd,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${_token}`,
      },
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        if (
          error.response && error.response.data && error.response.data.msg &&
          error.response.data.msg.detail && typeof (error.response.data.msg.detail) === "string"
        ) {
          reject({ status: 400, msg: error.response.data.msg.detail });
        } else if (
          error?.response?.data &&
          typeof error?.response?.data === "object") {
          reject({ status: 400, msg: Object.values(error?.response?.data).toString() });
        } else {
          reject({ status: 500, msg: 'Something went wrong. Please retry.' });
        }
      });
  });
};

export const storeFilePut = async (path:string, fd?:any) => {
  let _token = await getData("token");
  return new Promise((resolve, reject) => {
    axios({
      url: `${endPoint}${path}`,
      method: 'put',
      data: fd,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${_token}`,
      },
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        if (
          error.response && error.response.data && error.response.data.msg &&
          error.response.data.msg.detail && typeof (error.response.data.msg.detail) === "string"
        ) {
          reject({ status: 400, msg: error.response.data.msg.detail });
        } else if (
          error?.response?.data &&
          typeof error?.response?.data === "object") {
          reject({ status: 400, msg: Object.values(error?.response?.data).toString() });
        } else {
          reject({ status: 500, msg: 'Something went wrong. Please retry.' });
        }
      });
  });
};

// const refreshToken = async () => {
//   try {
//     let refresh = await getData("refresh")
//     let res = await axios.post(`${endPoint}/accounts/auth/token/refresh/`,
//       {
//         "refresh": refresh
//       }
//     );
//     await storeData('token_expiry', moment(new Date()).add(60, 'minutes'))
//     await storeData("token", res.data.access)
//   } catch (err) {
//   }
// }


// ~/Desktop/myedge-mobile/.git/MERGE_MSG