import axios from "axios";
import moment from "moment";
import { getData, getStoredBusiness, storeData } from "./Methods";
import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from "react-query"
import Config from "react-native-config";

export const endPoint = Config.API_URL;
//export const endPoint = 'https://api.bizedgeapp.com';

export const employees_me = (business_id) => `/c/${business_id}/employees/me/`;
export const APIFunction = {
  employees: (business_id, page = 1, search = "") => `/c/${business_id}/employees/?page=${page}&search=${search}`,
  team_members: (business_id, id, page = 1) => `/c/${business_id}/employees/${id}/team_members/?page=${page}`,
  basic_details: (business_id, id) => `/c/${business_id}/employees/${id}/basic_detail/`,
  login: async (fd) => {
    return postNoToken(`/accounts/auth/login/`, fd)
  },
  next_of_kins: async (id) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz.business_id}/employees/${id}/next-of-kin/`)
  },
  whos_out: async (category) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/timeoff_taken/widgets/whos_out/?category=${category}`)
  },
  birthdays: async (status) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/dashboard/birthdays/?status=${status}`)
  },
  my_business_assests: async (employee_pk) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/${employee_pk}/asset_vehicles/`)
  },
  benefits: async (employee_pk) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/${employee_pk}/benefits/`)

  },
  emergency: async (id) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz.business_id}/employees/${id}/emergency-contact/`)
  },
  update_emergency: async (fd, id) => {
    let biz = await getStoredBusiness();
    return putAPIs(`/c/${biz.business_id}/employees/${id}/update-emergency-contact/`, fd)
  },
  update_photo: (business_id, id) => `/c/${business_id}/employees/${id}/update-photo/`,
  edit: async (fd, id) => {
    let biz = await getStoredBusiness();
    return putAPIs(`/c/${biz.business_id}/employees/${id}/`, fd);
  },
  trainings: (business_id, id) => `/c/${business_id}/employees/${id}/training/`,
  training_hist: (business_id, id) => `/c/${business_id}/employees/${id}/training/history/`,
  timeoff: (business_id, id) => `/c/${business_id}/employees/${id}/timeoff/`,
  timeoff_reqs: (business_id, id) => `/c/${business_id}/employees/${id}/timeoff_requests/`,
  timeoff_taken: (business_id, id, status) => `/c/${business_id}/employees/${id}/timeoff_taken/?status=${status}`,
  delete_timeoff: (business_id, id, timeoff_id) => `/c/${business_id}/employees/${id}/timeoff_requests/${timeoff_id}/`,
  job_anniversary: async (status, page = 1) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz?.business_id}/employees/dashboard/job_anniversary/?status=${status}&page=${page}`)
  },
  notifications: async (page = 1) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz.business_id}/employees/notifications/?page=${page}`)
  },
  unseen_count: async (page = 1) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz.business_id}/employees/notifications/unseen_count/`)
  },
  change_password: async (fd) => postAPIs(`/accounts/auth/password/change/`, fd),
  pension_providers: async () => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz.business_id}/pension_providers/`)
  },
  banks: async () => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz.business_id}/banks/`)
  },
  update_next_of_kin: async (fd, id) => {
    let biz = await getStoredBusiness();
    return putAPIs(`/c/${biz.business_id}/employees/${id}/update-next-of-kin/`, fd)
  },
  update_pension: async (fd, id) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz.business_id}/employees/${id}/update_pension_bank_account/`, fd)
  },
  about_me: async (biz_id = null) => {
    let biz = {}
    if (biz_id) {
      biz = {
        business_id: biz_id
      }
    }
    if (!biz_id) {
      biz = await getStoredBusiness();
    }
    return getAPIs(`/c/${biz.business_id}/employees/me/`);
  },
  read_notification: async (id) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz.business_id}/employees/notifications/${id}/read/`)
  },
  bank_verification: async (fd) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz.business_id}/banks/account_number_validation/`, fd)
  },
  seen_all: async () => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz.business_id}/employees/notifications/seen_all/`)
  },
  remove_photo: async (employee_id) => {
    let biz = await getStoredBusiness();
    return putAPIs(`/c/${biz.business_id}/employees/${employee_id}/delete-photo/`)
  },
  employee_tasks: async (employee_id, completed = false) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/employees/${employee_id}/onboarding_tasks/?is_completed=${completed}`)
  },
  toggle_completed: async (employee_id, task_id, fd) => {
    let biz = await getStoredBusiness()
    return putAPIs(`/c/${biz.business_id}/employees/${employee_id}/onboarding_tasks/${task_id}/toggle_completed/`, fd)
  },
  employee_doc: async (id) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/employees/${id}/documents/`)
  },
  report_asset: async (fd, id) => {
    let biz = await getStoredBusiness()
    return postAPIs(`/c/${biz.business_id}/asset-management/assets/${id}/issues/report/`, fd)
  },
  user_info: async () => {
    return getAPIs(`/accounts/auth/user/`)
  },
  onboarded: async (employee_id) => {
    let biz = await getStoredBusiness()
    return postAPIs(`/c/${biz.business_id}/employees/${employee_id}/complete_user_onboarding/`)
  },
  attendance_config: async (limit) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/v2/attendance/config/?page_size=${limit}`)
  },
  attendance_status: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/v2/attendance/status/`)
  },
  employee_clock_in: async (fd) => {
    let biz = await getStoredBusiness()
    return postAPIs(`/c/${biz.business_id}/v2/attendance/clock_in/`, fd)
  },
  employee_clock_out: async (fd) => {
    let biz = await getStoredBusiness()
    return postAPIs(`/c/${biz.business_id}/v2/attendance/clock_out/`, fd)
  },
  payslip_info: async (date, payroll_id) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/employee_payroll_month_history/${date}/payslip/?payroll=${payroll_id}`)
  },
  payroll_history: async (year) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/employee_payroll_year_history/?year=${year}`)
  },
  payroll_years: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/employee_payroll_year_history/years/`)
  },
  location_type: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/v2/attendance/location_type/`)
  },
  error_report: async (fd) => {
    return postNoToken('/mobile_error_report', fd)
  },
  post_onboarding: async (fd) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz.business_id}/app_onboarding/`, fd)
  },
  get_onboarding: async () => {
    let about_me = await getData("about_me")
    let id = await about_me?.id
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/app_onboarding/?type=Task&employee_id=${id}`)
  },
  post_task: async (fd) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz.business_id}/tasks_app/`, fd)
  },
  post_sub_Task: async (fd) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz.business_id}/sub_tasks_app/`, fd)
  },
  post_comment: async (fd) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz.business_id}/tasks_app_comments/`, fd)
  },
  update_status: async (fd) => {
    let biz = await getStoredBusiness()
    return putAPIs(`/c/${biz.business_id}/tasks_app/${fd.id}/`, fd)
  },
  delete_task: async (fd) => {
    let biz = await getStoredBusiness()
    return deleteAPIs(`/c/${biz.business_id}/tasks_app/${fd}/`)
  },
  update_sub_task: async (fd) => {
    let biz = await getStoredBusiness()
    return putAPIs(`/c/${biz.business_id}/sub_tasks_app/${fd.id}/`, fd)
  },
  get_to_dos: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/tasks_app/get_my_or_employees_tasks/?filter=assigned_to_me`)
  },
  get_duetoday: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/tasks_app/get_my_or_employees_tasks/?filter=assigned_to_me&due_date_status=duetoday`)
  },
  get_upcoming: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/tasks_app/get_my_or_employees_tasks/?filter=assigned_to_me&due_date_status=upcoming`)
  },
  get_overdue: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/tasks_app/get_my_or_employees_tasks/?filter=assigned_to_me&due_date_status=overdue`)
  },
  get_team_tasks: async () => {
    let biz = await getStoredBusiness()
    const user = await getData("about_me")
    return getAPIs(`/c/${biz.business_id}/tasks_app/department_or_team_tasks/?department_id=${user?.department?.id}`)
  },

  get_team_duetoday: async () => {
    let biz = await getStoredBusiness()
    const user = await getData("about_me")
    return getAPIs(`/c/${biz.business_id}/tasks_app/department_or_team_tasks/?department_id=${user?.department?.id}&due_date_status=duetoday`)
  },
  get_team_upcoming: async () => {
    let biz = await getStoredBusiness()
    const user = await getData("about_me")
    return getAPIs(`/c/${biz.business_id}/tasks_app/department_or_team_tasks/?department_id=${user?.department?.id}&due_date_status=upcoming`)
  },
  get_team_overdue: async () => {
    let biz = await getStoredBusiness()
    const user = await getData("about_me")
    return getAPIs(`/c/${biz.business_id}/tasks_app/department_or_team_tasks/?department_id=${user?.department?.id}&due_date_status=overdue`)
  },

  get_personal_tasks: async (id) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/tasks_app/get_my_or_employees_tasks/?filter=assigned_to_me&employee_id=${id}`)
  },

  get_personal_due: async (id) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/tasks_app/get_my_or_employees_tasks/?filter=assigned_to_me&employee_id=${id}&due_date_status=duetoday`)
  },
  get_personal_upcoming: async (id) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/tasks_app/get_my_or_employees_tasks/?filter=assigned_to_me&employee_id=${id}&due_date_status=upcoming`)
  },
  get_personal_overdue: async (id) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/tasks_app/get_my_or_employees_tasks/?filter=assigned_to_me&employee_id=${id}&due_date_status=overdue`)
  },

  get_task_statistics: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/tasks_app/get_tasks_statistics/?filter=assigned_to_me`)
  },
  get_sent_statistics: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/tasks_app/get_tasks_statistics/?filter=created_by_me_and_sent`)
  },

  get_employee_statistics: async (id) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/tasks_app/get_tasks_statistics/?employee_id=${id}`)
  },
  get_team_statistics: async () => {
    let biz = await getStoredBusiness()
    const user = await getData("about_me")
    return getAPIs(`/c/${biz.business_id}/tasks_app/get_tasks_statistics/?department_id=${user?.department?.id}`)
  },
  get_all_sent: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/tasks_app/get_my_or_employees_tasks/?filter=created_by_me_and_sent`)
  },
  get_sent_duetoday: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/tasks_app/get_my_or_employees_tasks/?filter=created_by_me_and_sent&due_date_status=duetoday`)
  },
  get_sent_upcoming: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/tasks_app/get_my_or_employees_tasks/?filter=created_by_me_and_sent&due_date_status=upcoming`)
  },
  get_sent_overdue: async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/tasks_app/get_my_or_employees_tasks/?filter=created_by_me_and_sent&due_date_status=overdue`)
  },
  get_activity: async (id) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/tasks_app_activity/tasks_activity_order_by_date/?task_id=${id}`)
  },
  // get_comments: async (id) => {
  //   let biz = await getStoredBusiness()
  //   return getAPIs(`/c/${biz.business_id}/tasks_app_comments/tasks_comment_order_by_date/?task_id=${id}`)
  // },
  departments: async (page, search) => {
    const user = await getData('user')
    const business_id = user?.employee_user_memberships?.[0]?.business_id
    return getAPIs(`/c/${business_id}/departments/?page=${page}&search=${search}`)
  },
  get_users: async (page = 1, search) => {
    let user = await getData("user");
    const business_id = user?.employee_user_memberships?.[0]?.business_id
    return getAPIs(`/c/${business_id}/employees/?page=${page}&search=${search}`)
  },
  get_teams: async (page) => {
    const user = await getData('user')
    const business_id = user?.employee_user_memberships?.[0]?.business_id
    const about_me = await getData("about_me")
    const id = about_me?.id
    return getAPIs(`/c/${business_id}/employees/${id}/team_members/?page=${page}`)
  },

}

export const useFetchPayrollYears = () => {
  return useQuery("payroll_years", APIFunction.payroll_years)
}

export const useFetchAttendanceConfig = (limit = 1) => {
  return useQuery(["attendance_config", limit], () => APIFunction.attendance_config(limit))
}
export const useFetchAttendanceStatus = () => {
  return useQuery("attendance_status", APIFunction.attendance_status)
}
export const useFetchLocationType = () => {
  return useQuery("location_type", APIFunction.location_type)
}

export const useFetchPayslipInfo = (date, id) => {
  return useQuery(["payslip_info", date, id], () => APIFunction.payslip_info(date, id), {
    enabled: date !== null && date !== undefined && id !== null && id !== undefined
  })
}

export const useFetchPayrollHistory = (year) => {
  return useQuery(["payroll_history", year], () => APIFunction.payroll_history(year), {
    enabled: year !== null && year !== undefined && year !== ""
  })
}

export const useFetchAssets = (employee_pk) => {
  return useQuery(["my_business_assests", employee_pk], () => APIFunction.my_business_assests(employee_pk), {
    enabled: employee_pk !== null && employee_pk !== undefined && employee_pk !== ""
  })
}

export const useFetchBenefits = (employee_pk) => {
  return useQuery(["benefits", employee_pk], () => APIFunction.benefits(employee_pk), {
    enabled: employee_pk !== null && employee_pk !== undefined && employee_pk !== ""
  })
}

export const useFetchWhosOut = (category = "timeoff") => {
  return useQuery(["whos_out", category], () => APIFunction.whos_out(category), {
    enabled: category !== null && category !== undefined && category !== ""
  })
}


export const useFetchBirthdays = (status) => {
  return useQuery(["birthdays", status], () => APIFunction.birthdays(status), {
    enabled: status !== null && status !== undefined && status !== ""
  })
}

export const useFetchAnniversary = (status, page = 1) => {
  return useQuery(["job_anniversary", status, page], () => APIFunction.job_anniversary(status, page), {
    enabled: status !== null && status !== undefined && status !== ""
  })
}

export const useFetchTasks = (employee_id, completed) => {
  return useQuery(["employee_tasks", employee_id, completed], () => APIFunction.employee_tasks(employee_id, completed), {
    enabled: (
      employee_id !== null && employee_id !== undefined && employee_id !== "" &&
      completed !== null && completed !== undefined && completed !== ""
    )
  })
}

export const useFetchKin = (employee_id) => {
  return useQuery(["next_of_kins", employee_id], () => APIFunction.next_of_kins(employee_id), {
    enabled: (
      employee_id !== null && employee_id !== undefined && employee_id !== ""
    )
  })
}

export const useFetchEmergency = (employee_id) => {
  return useQuery(["emergency", employee_id], () => APIFunction.emergency(employee_id), {
    enabled: (
      employee_id !== null && employee_id !== undefined && employee_id !== ""
    )
  })
}

export const useFetchBanking = (employee_id) => {
  return useQuery(["banks", employee_id], () => APIFunction.banks(employee_id), {
    enabled: (
      employee_id !== null && employee_id !== undefined && employee_id !== ""
    )
  })
}
export const useFetchOnboarding = () => {

  return useQuery(["onboard",], () => APIFunction.get_onboarding()

  )
}
export const useFetchEmployees = (page, search) => {
  return useInfiniteQuery(['people', page, search], () => APIFunction.get_users(page, search), {

    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next
    }
  }
  )
}

export const useFetchTeams = (page, id) => {
  return useInfiniteQuery(['teams', page, id], () => APIFunction.get_teams(page, id), {
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next
    }
  }
  )
}
export const useFetchDepartments = (page, search) => {
  return useInfiniteQuery(["departments", page, search], () => APIFunction.departments(page, search), {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.next
    }
  })
}
export const useFetchTodos = (tab) => {
  return useInfiniteQuery(['todos', tab], () => APIFunction.get_to_dos(tab), {
    // enabled: tab === "All" && tab !== null && tab !== undefined
  })
}
export const useFetchDueToday = (tab) => {
  return useInfiniteQuery(['duetoday', tab], () => APIFunction.get_duetoday(tab), {
    enabled: tab === "Due Today" && tab !== null && tab !== undefined
  })
}
export const useFetchUpcoming = (tab) => {
  return useInfiniteQuery(['upcoming', tab], () => APIFunction.get_upcoming(tab), {
    enabled: tab === "Upcoming" && tab !== null && tab !== undefined
  })
}
export const useFetchOverDue = (tab) => {
  return useInfiniteQuery(['overdue', tab], () => APIFunction.get_overdue(tab), {
    enabled: tab === "Overdue" && tab !== null && tab !== undefined
  })
}
export const useFetchAllSent = (tab, index) => {
  return useInfiniteQuery(['sent todos', tab], () => APIFunction.get_all_sent(tab), {
    enabled: index === 1 && index !== null && index !== undefined
  })
}
export const useFetchAllSentDue = (tab, index) => {
  return useInfiniteQuery(['sent due', tab], () => APIFunction.get_sent_duetoday(tab), {
    enabled: index === 1 && index !== null && index !== undefined
  })
}
export const useFetchAllSentUpcoming = (tab, index) => {
  return useInfiniteQuery(['sent upcoming', tab], () => APIFunction.get_sent_upcoming(tab), {
    enabled: index === 1 && index !== null && index !== undefined
  })
}
export const useFetchAllSentOverdue = (tab, index) => {
  return useInfiniteQuery(['sent overdue', tab], () => APIFunction.get_sent_overdue(tab), {
    enabled: index === 1 && index !== null && index !== undefined
  })
}
export const useFetchPersonalTask = (tab, id) => {
  return useInfiniteQuery(['employeeTask', id], () => APIFunction.get_personal_tasks(id), {
    enabled: tab === "All" && id !== null && id !== undefined,
  })
}
export const useFetchPersonalDue = (tab, id) => {
  return useInfiniteQuery(['dueTask', id], () => APIFunction.get_personal_due(id), {
    enabled: tab === "Due Today" && id !== null && id !== undefined,
  })
}
export const useFetchPersonalUpcoming = (tab, id) => {
  return useInfiniteQuery(['upcomingTask', id], () => APIFunction.get_personal_upcoming(id), {
    enabled: tab === "Upcoming" && id !== null && id !== undefined,
  })
}
export const useFetchPersonalOverdue = (tab, id) => {
  return useInfiniteQuery(['overdueTask', id], () => APIFunction.get_personal_overdue(id), {
    enabled: tab === "Overdue" && id !== null && id !== undefined,
  })
}
export const useFetchTeamTask = (tab, index) => {
  return useInfiniteQuery(['All teamTask', tab], () => APIFunction.get_team_tasks(tab), {
    enabled: index === 2 && tab === 'All' && tab !== null && tab !== undefined
  })
}

export const useFetchTeamDuetoday = (tab, index) => {
  return useInfiniteQuery(['allDue', tab], () => APIFunction.get_team_duetoday(tab), {
    enabled: index === 2 && tab === "Due Today" && tab !== null && tab !== undefined
  })
}
export const useFetchMyTeamUpcoming = (tab, index) => {
  return useInfiniteQuery(['allUpcoming', tab], () => APIFunction.get_team_upcoming(tab), {
    enabled: index === 2 && tab === "Upcoming" && tab !== null && tab !== undefined,

  })
}
export const useFetchMyTeamOverdue = (tab) => {
  return useInfiniteQuery(['allOverdue', tab], () => APIFunction.get_team_overdue(tab), {
    enabled: tab === "Overdue" && tab !== null && tab !== undefined,
  })
}
export const useFetchMyStatus = (status, tab, id) => {
  return useInfiniteQuery(['employeeStatus', status, id], () => APIFunction.get_Mystatus(status, id), {
    enabled:
      tab === "Status" && status !== null && status !== undefined,
  })
}

export const useFetchStatistics = () => {
  return useQuery("statistics", APIFunction.get_task_statistics)
}
export const useFetchSentStatistics = () => {
  return useQuery("sent", APIFunction.get_sent_statistics)
}

export const useFetchPeopleStatics = (id) => {
  return useQuery(["count", id], () => APIFunction.get_employee_statistics(id), {
    enabled: id !== null && id !== undefined
  },

  )
}
export const useFetchTeamStatistics = () => {
  return useQuery("team", APIFunction.get_team_statistics)
}

export const useFetchActivities = (id) => {
  return useInfiniteQuery(["logs", id], () => APIFunction.get_activity(id), {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.next
    }
  })
}
export const useFetchComments = (id) => {
  return useInfiniteQuery(["comments", id], () => APIFunction.get_comments(id), {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.next
    }
  })
}
export const updateSubTask = () => {
  return useMutation(() => APIFunction.update_sub_task(),
    {
      onSuccess: () => {
      },
      onError: () => {
      }
    }
  )
}

export const useUpdate = () => {
  return useMutation(() => APIFunction.update_status(),
    {
      onSuccess: () => {
      },
      onError: () => {
      }
    }
  )
}

export const getAPIs = async (path) => {
  let _token = await getData("token");
  return new Promise((resolve, reject) => {
    axios
      .get(`${endPoint}${path}`, {
        headers: {
          Authorization: `Bearer ${_token}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': 0
        },
      }, {
        timeout: 200
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
        } else {
          reject({ status: 500, msg: 'Something went wrong. Please retry.' });
        }
      });
  });
};


export const postAPIs = async (path, fd) => {
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
        } else if(
          error?.response?.data &&
          typeof error?.response?.data === "object"){
        reject({status: 400, msg: Object.values(error?.response?.data).toString()});
      } else {
          reject({ status: 500, msg: 'Something went wrong. Please retry.' });
        }
      });
  });
};

export const deleteAPIs = async (path, fd) => {
  let _token = await getData("token");
  return new Promise((resolve, reject) => {
    axios.delete(
      `${endPoint}${path}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${_token}`
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
        }else if(
          error?.response?.data &&
          typeof error?.response?.data === "object"){
        reject({status: 400, msg: Object.values(error?.response?.data).toString()});
      } else {
          reject({ status: 500, msg: 'Something went wrong. Please retry.' });
        }
      });
  });
};

export const putAPIs = async (path, fd) => {
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
        }else if(
          error?.response?.data &&
          typeof error?.response?.data === "object"){
        reject({status: 400, msg: Object.values(error?.response?.data).toString()});
      } else {
          reject({ status: 500, msg: 'Something went wrong. Please retry.' });
        }
      });
  });
};

export const postNoToken = (path, fd) => {
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

export const storeFile = async (path, token, fd) => {
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
        //logError(endPoint,path,error)
        if (error.response) {
          reject({ status: 500, msg: error.response.data });
        } else {
          reject({ status: 500, msg: 'Something went wrong. Please retry.' });
        }
      });
  });
};

export const storeFilePut = async (path, token, fd) => {
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
        if (error.response) {
          reject({ status: 500, msg: error.response.data });
        } else {
          reject({ status: 500, msg: 'Something went wrong. Please retry.' });
        }
      });
  });
};

const refreshToken = async () => {
  try {
    let refresh = await getData("refresh")
    let res = await axios.post(`${endPoint}/accounts/auth/token/refresh/`,
      {
        "refresh": refresh
      }
    );
    await storeData('token_expiry', moment(new Date()).add(60, 'minutes'))
    await storeData("token", res.data.access)
  } catch (err) {
  }
}