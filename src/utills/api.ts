import axios from "axios";
import { getData, getStoreAboutMe, getStoredBusiness } from "./Methods";
import { useQuery, useInfiniteQuery } from "react-query"
import Config from "react-native-config";

import {
  ABOUT_ME,
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
  GET_EMPLOYEES,
  GET_MY_TEAM_MEMBERS,
  GET_DEPARTMENTS,
  GET_TASK_BY_PK,
  GET_TASKS,
  GET_TEAM_TASKS,
  GET_TASK_STATISTICS,
  GET_ACTIVITY,
  GET_COMMENTS,
  EmergencyContactProps,
  EditPassword,
  OnboardingLoad,
  CommentProps,
  TaskLoad,
  LoginLoad,
  RemoveDeviceTokenLoad,
  NOTIFICATIONS,
  DOCUMENT,
  BASIC_DETAILS,
  EditProfileProps,
  TaskStatisticFilter,
  TaskDueDateFilter,
  TaskProgressStatus,
  TRAININGHISTORY,
  TRAININGS,
  verifyBank,
  updatePensionAccountProps,
  UpdateOnboardingLoad,
  TaskUpdateLoad,
} from "./payload";

export const endPoint = Config.API_URL;
//export const endPoint = 'https://api.bizedgeapp.com';

export const employees_me = (business_id: string) => `/c/${business_id}/employees/me/`;

export const APIFunction = {
  employees: (business_id:string, page = 1, search = "") => `/c/${business_id}/employees/?page=${page}&search=${search}`,
  employee_team_members: async (id:number, page = 1) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/${id}/team_members/?page=${page}`)
  },  
  login: async (fd?:LoginLoad) => {
    return postNoToken(`/accounts/auth/login/`, fd)
  },
  next_of_kins: async (id:number) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/${id}/next-of-kin/`)
  },
  basic_details: async (id: number) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/${id}/basic_detail/`)
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
  update_emergency: async (fd:EmergencyContactProps) => {
    let biz = await getStoredBusiness();
    return putAPIs(`/c/${biz?.business_id}/employees/${fd.id}/update-emergency-contact/`, fd)
  },
  // update_photo: (business_id: string | number, id: number) => `/c/${business_id}/employees/${id}/update-photo/`,
  
  update_photo: async (fd : FormData) => {
    let biz = await getStoredBusiness();
    const user = await getStoreAboutMe()
    return storeFilePut(`/c/${biz?.business_id}/employees/${user?.id}/update-photo/`,fd);
  },

  edit: async (fd:EditProfileProps) => {
    let biz = await getStoredBusiness();
    return putAPIs(`/c/${biz?.business_id}/employees/${fd.id}/`, fd);
  },

// ​/employees​/{employee_pk}​/training​/
  get_trainings: async (employee_id: number) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/${employee_id}/training/`);
  },
  // /employees/{employee_pk}/training/history/
  get_training_hist: async ( employee_id: number) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/${employee_id}/training/history/`);
  },

  // trainings: (business_id:string, id:number) => `/c/${business_id}/employees/${id}/training/`,
  // training_hist: (business_id: string, id: number) => `/c/${business_id}/employees/${id}/training/history/`,
  
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
  notifications: async ({pageParam = 1}) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/notifications/?page=${pageParam}`)
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
  update_next_of_kin: async (fd:EmergencyContactProps) => {
    let biz = await getStoredBusiness();
    return putAPIs(`/c/${biz?.business_id}/employees/${fd.id}/update-next-of-kin/`, fd)
  },
  update_pension: async(fd:updatePensionAccountProps) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz?.business_id}/employees/${fd.id}/update_pension_bank_account/`, fd)
  },
  about_me: async (biz_id? : string) => {
    if(biz_id) return await getAPIs(`/c/${biz_id}/employees/me/`);
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/me/`);
  },
  read_notification: async (id:number) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz?.business_id}/employees/notifications/${id}/read/`)
  },
  bank_verification: async (fd:verifyBank) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz?.business_id}/banks/account_number_validation/`, fd)
  },
  seen_all: async () => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz?.business_id}/employees/notifications/seen_all/`)
  },
  remove_photo: async (employee_id?:number) => {
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
  complete_user_onboarding : async () => {
    let biz = await getStoredBusiness()
    let about = await getStoreAboutMe()
    return postAPIs(`/c/${biz?.business_id}/employees/${about?.id}/complete_user_onboarding/`)
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
  post_onboarding: async (fd:OnboardingLoad) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz?.business_id}/app_onboarding/`, fd)
  },
  update_onboarding: async (fd:UpdateOnboardingLoad) => {
    let biz = await getStoredBusiness()
    return putAPIs(`/c/${biz?.business_id}/app_onboarding/${fd.id}/`, fd)
  },
  get_onboarding: async (type:string) => {
    let biz = await getStoredBusiness()
    let user = await getStoreAboutMe()
    return getAPIs(`/c/${biz?.business_id}/app_onboarding/?${type}&employee_id=${user?.id}`)
  },
  post_task: async (fd:TaskLoad) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz?.business_id}/tasks_app/`, fd)
  },
  post_comment: async (fd:CommentProps) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz?.business_id}/tasks_app_comments/`, fd)
  },
  update_task_status: async (fd:TaskUpdateLoad) => {
    let biz = await getStoredBusiness()
    return putAPIs(`/c/${biz?.business_id}/tasks_app/${fd.id}/`, fd)
  },
  delete_task: async (id : number) => {
    let biz = await getStoredBusiness()
    return deleteAPIs(`/c/${biz?.business_id}/tasks_app/${id}/`)
  },
  update_sub_task: async (fd:any) => {
    let biz = await getStoredBusiness()
    return putAPIs(`/c/${biz?.business_id}/sub_tasks_app/${fd.id}/`, fd)
  },

  get_tasks: async (
    filter : TaskStatisticFilter = "",
    due_date_status : TaskDueDateFilter = "",
    status : TaskProgressStatus = "",
    employee_id : number | "" = "",
    page = 1,
    limit = 20
  ) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/get_my_or_employees_tasks/?filter=${filter}&employee_id=${employee_id}&page=${page}&due_date_status=${due_date_status}&status=${status}&page_size=${limit}`)
  },


  get_task_by_pk: async (id:number) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/${id}/`)
  },

  get_task_statistics: async (
    filter : TaskStatisticFilter = "",
    department_id : number | string = "",
    employee_id : number | string = ""
  ) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/get_tasks_statistics/?filter=${filter}&employee_id=${employee_id}&department_id=${department_id}`)
  },

  get_team_tasks: async (
    dept_id:number | "",
    due_date_status : TaskDueDateFilter = "",
    status : TaskProgressStatus = "",
    page = 1,
    limit = 20
  ) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app/department_or_team_tasks/?department_id=${dept_id}&due_date_status=${due_date_status}&status=${status}&page=${page}&page_size=${limit}`)
  },
  
  get_activity: async (id:number,{pageParam = 1,limit = 20}) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app_activity/tasks_activity_order_by_date/?task_id=${id}&page=${pageParam}&page_size=${limit}`)
  },
  get_comments: async (id:number,{pageParam=1,limit = 20}) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/tasks_app_comments/tasks_comment_order_by_date/?task_id=${id}&page=${pageParam}&page_size=${limit}`)
  },

  departments: async ({pageParam = 1, search = "",limit = 20}) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/departments/?page=${pageParam}&search=${search}&page_size=${limit}`)
  },
  get_employees: async ({pageParam = 1, search = "",limit = 20}) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz?.business_id}/employees/?page=${pageParam}&search=${search}&page_size=${limit}`)
  },
  get_my_team_members: async ({pageParam = 1}) => {
    let biz = await getStoredBusiness()
    let user = await getStoreAboutMe()
    return getAPIs(`/c/${biz?.business_id}/employees/${user?.id}/team_members/?page=${pageParam}`)
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

export const useFetchEmployeeBasicDetails = (id?:number) => {
  return useQuery([BASIC_DETAILS, id], () => APIFunction.basic_details(id as number), {
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

export const useFetchPayslipInfo = (date:string, id:number | string) => {
  return useQuery([PAYSLIP_INFO, date, id], () => APIFunction.payslip_info(date, id as number), {
    enabled: !!date && !!id
  })
}

export const useFetchPayrollHistory = (year:number | string) => {
  return useQuery([PAYROLL_HISTORY, year], () => APIFunction.payroll_history(year as number), {
    enabled: !!year 
  })
}

export const useFetchAssets = (employee_pk?:number) => {
  return useQuery([MY_BUSINESS_ASSETS, employee_pk], () => APIFunction.my_business_assests(employee_pk as number), {
    enabled: !!employee_pk 
  })
}

export const useFetchBenefits = (employee_pk?:number|null) => {
  return useQuery([BENEFITS, employee_pk], () => APIFunction.benefits(employee_pk as number), {
    enabled: !!employee_pk 
  })
}
export const useFetchDoc = (employee_pk?:number|null) => {
  return useQuery([DOCUMENT, employee_pk], () => APIFunction.employee_doc(employee_pk as number), {
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
    enabled: !!status
  })
}

export const useFetchAnniversary = (status:string, page = 1) => {
  return useQuery([JOB_ANNIVERSARY, status, page], () => APIFunction.job_anniversary(status, page), {
    enabled: !!status
  })
}

export const useFetchKin = (employee_id?:number) => {
  return useQuery([NEXT_OF_KINS, employee_id], () => APIFunction.next_of_kins(employee_id as number), {
    enabled: !!employee_id
  })
}

export const useFetchEmergency = (employee_id?:number) => {
  return useQuery([EMERGENCY, employee_id], () => APIFunction.emergency(employee_id as number), {
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
export const useFetchEmployees = (tab:string, search: string) => {
  return useInfiniteQuery(
    {
      queryKey : [GET_EMPLOYEES, search],
      queryFn : ({pageParam = 1}) => APIFunction.get_employees({pageParam, search}),
      enabled : !!tab,
      keepPreviousData : true,
      getNextPageParam: (lastPage:any) => {
        let nextPageParam = lastPage?.next?.match("page=[0-9]")?.[0]?.split("page=")?.[1] || undefined
        return nextPageParam
      }
    }
  )
}


export const useFetchEmployeeTeamMembers = (id : number | undefined,page:number) => {
  return useInfiniteQuery([GET_MY_TEAM_MEMBERS, page,id], () => APIFunction.employee_team_members(id as number,page), {
    enabled : !!id, 
    getNextPageParam: (lastPage:any) => {
      return lastPage?.next
    }
  }
  )
}

export const useFetchTeams = (tab : string) => {
  return useInfiniteQuery(
    {
      queryKey : [GET_MY_TEAM_MEMBERS],
      queryFn : ({pageParam = 1}) => APIFunction.get_my_team_members({pageParam}),
      enabled : !!tab, 
      getNextPageParam: (lastPage:any) => {
        let nextPageParam = lastPage?.next?.match("page=[0-9]")?.[0]?.split("page=")?.[1] || undefined
        return nextPageParam
      }
    }
  )
}

export const useFetchNotifications = () => {
  return useInfiniteQuery(
    {
      queryKey : [NOTIFICATIONS],
      queryFn : ({pageParam = 1}) => APIFunction.notifications({pageParam}),
      getNextPageParam: (lastPage:any) => {
        let nextPageParam = lastPage?.next?.match("page=[0-9]")?.[0]?.split("page=")?.[1] || undefined
        return nextPageParam
      }
    }
  )
}


export const useFetchDepartments = (tab : string, search:string) => {
  return useInfiniteQuery(
    {
      queryKey : [GET_DEPARTMENTS, search],
      queryFn : ({pageParam = 1}) => APIFunction.departments({pageParam, search}),
      enabled : !!tab,
      keepPreviousData : true,
      getNextPageParam: (lastPage:any) => {
        let nextPageParam = lastPage?.next?.match("page=[0-9]")?.[0]?.split("page=")?.[1] || undefined
        return nextPageParam
      }
    })
}
export const useFetchTaskByPK = (id?:number) => {
  return useQuery([GET_TASK_BY_PK, id], () => APIFunction.get_task_by_pk(id as number), {
    enabled: !!id
  })
}

export const useFetchTodos = (
  filter : TaskStatisticFilter = "", 
  over_due_status : TaskDueDateFilter = "",
  progress : TaskProgressStatus = "",
  employee_id : number | "" = "", 
  page  = 1
) => {
  return useInfiniteQuery([GET_TASKS, filter,employee_id,over_due_status,progress,page], () => APIFunction.get_tasks(filter,over_due_status,progress,employee_id,page), {
    enabled: !!filter || !!employee_id || !!over_due_status || !!progress
  })
}

export const useFetchTeamTask = (
  tab : string,
  dept_id : number | "" = "",
  due_date_status : TaskDueDateFilter = "",
  progress : TaskProgressStatus = "",
  page : number = 1
) => {
  return useInfiniteQuery([GET_TEAM_TASKS, dept_id,due_date_status,progress,page], () => APIFunction.get_team_tasks(dept_id,due_date_status,progress,page), {
    enabled: tab === "My Team" && !!dept_id
  })
}

export const useFetchStatistics = (filter : TaskStatisticFilter = "",department_id : number | string = "",employee_id: number | string = "") => {
  return useQuery([GET_TASK_STATISTICS,employee_id,filter,department_id], () => APIFunction.get_task_statistics(filter,department_id,employee_id,),{
    enabled : !!employee_id || !!filter || !!department_id
  })
}
export const useFetchTrainings = ( employee_id?: number) => {
  return useQuery([TRAININGS, employee_id], () => APIFunction.get_trainings(employee_id as number),{
    enabled: !!employee_id
  });
}
export const useFetchTrainingsHist = ( employee_id?: number) => {
  return useQuery([TRAININGHISTORY, employee_id], () => APIFunction.get_training_hist(employee_id as number),{
    enabled: !!employee_id
  });
}
// export const useFetchSentStatistics = () => {
//   return useQuery(GET_SENT_STATISTICS, APIFunction.get_sent_statistics)
// }

// export const useFetchPeopleStatics = (id:number) => {
//   return useQuery([GET_EMPLOYEE_STATISTICS, id], () => APIFunction.get_employee_statistics(id), {
//     enabled: id !== null && id !== undefined
//   },

//   )
// }
// export const useFetchTeamStatistics = (id?:number) => {
//   return useQuery([GET_TEAM_STATISTICS, id], () => APIFunction.get_team_statistics(id as number), {
//     enabled: !!id
//   },)
// }

export const useFetchActivities = (id:number | "") => {
  return useInfiniteQuery(
    {
      queryKey : [GET_ACTIVITY, id],
      queryFn : ({pageParam = 1}) => APIFunction.get_activity(id as number,{pageParam}),
      enabled : !!id,
      keepPreviousData : true,
      getNextPageParam: (lastPage:any) => {
        let nextPageParam = lastPage?.next?.match("page=[0-9]")?.[0]?.split("page=")?.[1] || undefined
        return nextPageParam
      }
    }
  )
}
export const useFetchComments = (id:number | "") => {
  return useInfiniteQuery(
    {
      queryKey : [GET_COMMENTS, id],
      queryFn : ({pageParam = 1}) => APIFunction.get_comments(id as number,{pageParam}),
      enabled : !!id,
      keepPreviousData : true,
      getNextPageParam: (lastPage:any) => {
        let nextPageParam = lastPage?.next?.match("page=[0-9]")?.[0]?.split("page=")?.[1] || undefined
        return nextPageParam
      }
    }
  )
}

export const getAPIs = async (path : string) => {
  let _token = await getData("token");
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

export const putAPIs = async (path:string, fd?:any) => {
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