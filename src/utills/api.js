import axios from "axios";
import moment from "moment";
import { getData, getStoredBusiness, storeData } from "./Methods";
import {useQuery} from "react-query"

//export const endPoint = 'https://coolowo.com';
export const endPoint = 'https://api.bizedgeapp.com';

export const employees_me = (business_id) => `/c/${business_id}/employees/me/`;
export const APIFunction = {
  my_business_assests : (business_id,employee_pk) => `/c/${business_id}/employees/${employee_pk}/asset_vehicles/`,
  benefits : (business_id,employee_pk) => `/c/${business_id}/employees/${employee_pk}/benefits/`,
  whos_out : (business_id,category="timeoff") => `/c/${business_id}/timeoff_taken/widgets/whos_out/?category=${category}`,
  birthdays : (business_id,status) => `/c/${business_id}/employees/dashboard/birthdays/?status=${status}`,
  employees : (business_id,page=1,search = "") => `/c/${business_id}/employees/?page=${page}&search=${search}`,
  team_members : (business_id,id,page = 1) => `/c/${business_id}/employees/${id}/team_members/?page=${page}`,
  basic_details : (business_id,id) => `/c/${business_id}/employees/${id}/basic_detail/`,
  next_of_kins : async (id) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz.business_id}/employees/${id}/next-of-kin/`)
  },
  emergency  : async (id) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz.business_id}/employees/${id}/emergency-contact/`)
  },
  update_emergency : async (fd,id) => {  
    let biz = await getStoredBusiness();
    return putAPIs(`/c/${biz.business_id}/employees/${id}/update-emergency-contact/`,fd)
  },
  update_photo : (business_id,id) => `/c/${business_id}/employees/${id}/update-photo/`,
  edit : async (fd,id) => {
    let biz = await getStoredBusiness();
    return putAPIs(`/c/${biz.business_id}/employees/${id}/`,fd);
  },
  trainings : (business_id,id) => `/c/${business_id}/employees/${id}/training/`,
  training_hist : (business_id,id) => `/c/${business_id}/employees/${id}/training/history/`,
  timeoff : (business_id,id) => `/c/${business_id}/employees/${id}/timeoff/`,
  timeoff_reqs : (business_id,id) => `/c/${business_id}/employees/${id}/timeoff_requests/`,
  timeoff_taken : (business_id,id,status) => `/c/${business_id}/employees/${id}/timeoff_taken/?status=${status}`,
  delete_timeoff : (business_id,id,timeoff_id) => `/c/${business_id}/employees/${id}/timeoff_requests/${timeoff_id}/`,
  job_anniversary : (status,business_id,page=1) =>`/c/${business_id}/employees/dashboard/job_anniversary/?status=${status}&page=${page}`,
  notifications : async (page=1) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz.business_id}/employees/notifications/?page=${page}`)
  },
  unseen_count : async (page=1) => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz.business_id}/employees/notifications/unseen_count/`)
  },
  change_password : async (fd) => postAPIs(`/accounts/auth/password/change/`,fd),
  pension_providers : async () => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz.business_id}/pension_providers/`)
  },
  banks : async () => {
    let biz = await getStoredBusiness();
    return getAPIs(`/c/${biz.business_id}/banks/`)
  },
  update_next_of_kin : async (fd,id) => {
    let biz = await getStoredBusiness();
    return putAPIs(`/c/${biz.business_id}/employees/${id}/update-next-of-kin/`,fd)
  },
  update_pension : async (fd,id) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz.business_id}/employees/${id}/update_pension_bank_account/`,fd)
  },
  about_me : async (biz_id = null) => {
    let biz = {}
    if(biz_id) {
      biz = {
        business_id : biz_id
      }
    }
    if(!biz_id){
      biz = await getStoredBusiness();
    }
    return getAPIs(`/c/${biz.business_id}/employees/me/`);
  },
  read_notification : async (id) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz.business_id}/employees/notifications/${id}/read/`)
  },
  bank_verification : async (fd) => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz.business_id}/banks/account_number_validation/`,fd)
  },
  seen_all : async () => {
    let biz = await getStoredBusiness();
    return postAPIs(`/c/${biz.business_id}/employees/notifications/seen_all/`)
  },
  remove_photo : async (employee_id) =>{
    let biz = await getStoredBusiness();
    return putAPIs(`/c/${biz.business_id}/employees/${employee_id}/delete-photo/`)
  },
  employee_tasks : async (employee_id,completed = false) =>{
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/employees/${employee_id}/onboarding_tasks/?is_completed=${completed}`)
  },
  toggle_completed : async (employee_id,task_id,fd) => {
    let biz = await getStoredBusiness()
    return putAPIs(`/c/${biz.business_id}/employees/${employee_id}/onboarding_tasks/${task_id}/toggle_completed/`,fd)
  },
  employee_doc : async (id) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/employees/${id}/documents/`)
  },
  report_asset : async (fd,id) =>{
    let biz = await getStoredBusiness()
    return postAPIs(`/c/${biz.business_id}/asset-management/assets/${id}/issues/report/`,fd)
  },
  user_info : async () => {
    return getAPIs(`/accounts/auth/user/`)
  },
  onboarded : async (employee_id) => {
    let biz = await getStoredBusiness()
    return postAPIs(`/c/${biz.business_id}/employees/${employee_id}/complete_user_onboarding/`)
  },
  attendance_config : async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/attendance_config/`)
  },
  attendance_status : async () => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/attendance/status/`)
  },
  employee_clock_in : async (fd) => {
    let biz = await getStoredBusiness()
    return postAPIs(`/c/${biz.business_id}/attendance/clock_in/`,fd)
  },
  employee_clock_out : async (fd) => {
    let biz = await getStoredBusiness()
    return postAPIs(`/c/${biz.business_id}/attendance/clock_out/`,fd)
  },
  payslip_info : async (date,payroll_id) =>{
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/employee_payroll_month_history/${date}/payslip/?payroll=${payroll_id}`)
  },
  payroll_history : async (year) => {
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/employee_payroll_year_history/?year=${year}`)
  },
  payroll_years : async () =>{
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/employee_payroll_year_history/years/`)
  },
  location_type : async () =>{
    let biz = await getStoredBusiness()
    return getAPIs(`/c/${biz.business_id}/attendance/location_type/`)
  }
}

export const useFetchPayrollYears  = () => {
  return useQuery("payroll_years",APIFunction.payroll_years)
}

export const useFetchAttendanceConfig = () => {
  return useQuery("attendance_config",APIFunction.attendance_config)
}
export const useFetchAttendanceStatus = () => {
  return useQuery("attendance_status",APIFunction.attendance_status)
}
export const useFetchLocationType = () => {
  return useQuery("location_type",APIFunction.location_type)
}

export const useFetchPayslipInfo  = (date,id) => {
  return useQuery(["payslip_info",date,id],()=>APIFunction.payslip_info(date,id),{
    enabled : date !== null && date !== undefined && id !== null && id !== undefined
  })
}

export const useFetchPayrollHistory  = (year) => {
  return useQuery(["payroll_history",year],()=>APIFunction.payroll_history(year),{
    enabled : year !== null && year !== undefined && year !== ""
  })
}



export const getAPIs = async (path) => {
    let _token = await getData("token");
    //console.log("getAPIs",`${endPoint}${path}`,_token)
    return new Promise((resolve, reject) => {
      axios
        .get(`${endPoint}${path}`, {
          headers: {
            Authorization: `Bearer ${_token}`,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
          },
        },{
          timeout : 200
        })
        .then(result => {
          resolve(result.data);
        })
        .catch(error => {
          //console.log("ERROR",error)
          if (
            error.response && error.response.data && 
            error.response.data.detail && typeof(error.response.data.detail) === "string"
          ) {
            reject({status: 400, msg:error.response.data.detail});
          } else {
            reject({status: 500, msg: 'Something went wrong. Please retry.'});
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
            error.response.data.detail && typeof(error.response.data.detail) === "string"
          ){
            reject({status: 400, msg:error.response.data.detail});
          } else if (
            error.response && error.response.data && 
            error.response.data.message && typeof(error.response.data.message) === "string"
          ) {
            reject({status: 400, msg:error.response.data.message});
          } else {
            reject({status: 500, msg: 'Something went wrong. Please retry.'});
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
            headers : {
              'Content-Type' : 'application/json',
              Authorization : `Bearer ${_token}`
            }
          }
        )
          .then(result => {
            resolve(result.data);
          })
          .catch(error => {
            if (
              error.response && error.response.data && 
              error.response.data.detail && typeof(error.response.data.detail) === "string"
            ) {
              reject({status: 400, msg:error.response.data.detail});
            } else {
              reject({status: 500, msg: 'Something went wrong. Please retry.'});
            }
          });
      });
    };
  
export const putAPIs = async (path,fd) => {
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
          console.log("ERROR",error)
          if (
            error.response && error.response.data && error.response.data.msg && 
            error.response.data.msg.detail && typeof(error.response.data.msg.detail) === "string"
          ) {
            reject({status: 400, msg:error.response.data.msg.detail});
          } else {
            reject({status: 500, msg: 'Something went wrong. Please retry.'});
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
        if (error.response) {
          reject({status: 400, msg: error.response.data});
        } else {
          reject({status: 400, msg: 'Something went wrong. Please retry.'});
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
            reject({status: 500, msg: error.response.data});
          } else {
            reject({status: 500, msg: 'Something went wrong. Please retry.'});
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
            reject({status: 500, msg: error.response.data});
          } else {
            reject({status: 500, msg: 'Something went wrong. Please retry.'});
          }
        });
    });
  };

  const refreshToken = async () => {
    try{
        let refresh = await getData("refresh")
        let res = await axios.post(`${endPoint}/accounts/auth/token/refresh/`,
          {
            "refresh": refresh
          }
        );
        await storeData('token_expiry',moment(new Date()).add(60,'minutes'))
        await storeData("token",res.data.access)
    }catch(err){
    }
}