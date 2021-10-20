import axios from "axios";
import moment from "moment";
import { getData, storeData } from "./Methods";

export const endPoint = 'https://coolowo.com';

export const employees_me = (business_id) => `/c/${business_id}/employees/me/`;
export const APIFunction = {
  my_business_assests : (business_id,employee_pk) => `/c/${business_id}/employees/${employee_pk}/asset_vehicles/`,
  benefits : (business_id,employee_pk) => `/c/${business_id}/employees/${employee_pk}/benefits/`,
  whos_out : (business_id,status) => `/c/${business_id}/timeoff_taken/widgets/whos_out/?status=${status}`,
  birthdays : (business_id,status) => `/c/${business_id}/employees/dashboard/birthdays/?status=${status}`,
  employees : (business_id) => `/c/${business_id}/employees/`,
  team_members : (business_id,id) => `/c/${business_id}/employees/${id}/team_members/`,
  basic_details : (business_id,id) => `/c/${business_id}/employees/${id}/basic_detail/`,
  next_of_kins : (business_id,id) => `/c/${business_id}/employees/${id}/next-of-kin`,
  emergency  : (business_id,id) => `/c/${business_id}/employees/${id}/emergency-contact/`,
  update_photo : (business_id,id) => `/c/${business_id}/employees/${id}/update-photo/`,
  edit : (business_id,id) => `/c/${business_id}/employees/${id}/`,
  trainings : (business_id,id) => `/c/${business_id}/employees/${id}/training/`,
  training_hist : (business_id,id) => `/c/${business_id}/employees/${id}/training/history/`,
  timeoff : (business_id,id) => `/c/${business_id}/employees/${id}/timeoff/`,
  timeoff_reqs : (business_id,id) => `/c/${business_id}/employees/${id}/timeoff_requests/`,
  timeoff_taken : (business_id,id,status) => `/c/${business_id}/employees/${id}/timeoff_taken/?status=${status}`,
  delete_timeoff : (business_id,id,timeoff_id) => `/c/${business_id}/employees/${id}/timeoff_requests/${timeoff_id}/`
}
export const getAPIs = async (path, token) => {
    let expiry = await getData("token_expiry");
    if(token && expiry && !moment(new Date()).isBefore(expiry)){
       await refreshToken()
    }
    let _token = await getData("token");
    console.log("_token",_token)
    return new Promise((resolve, reject) => {
      let split = path.split("/?");
      let url = split && split.length > 1 ? 
      `${endPoint}${path}&timestamp=${new Date().getTime()}` : 
      `${endPoint}${path}?timestamp=${new Date().getTime()}`;
      axios
        .get(`${url}`, {
          headers: {
            Authorization: `Bearer ${_token}`,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
          },
        })
        .then(result => {
          resolve(result.data);
        })
        .catch(error => {
          console.log("error--",error,error.response,path)
          //logError(endPoint,path,error)
          reject({status: 500, msg: error.response.data});
        });
      //setTimeout(() => reject({status: 500, msg: 'Connection Error. Please try again later'}), 50000);
    });
  };
  
export const postAPIs = async (path, token, fd) => {
  let expiry = await getData("token_expiry");
    if(token && expiry && !moment(new Date()).isBefore(expiry)){
       await refreshToken()
    }
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
          //logError(endPoint,path,error)
          if (error.response) {
            reject({status: 500, msg: error.response.data});
          } else {
            reject({status: 500, msg: 'Connection Error. Please try again later'});
          }
        });
  
      setTimeout(() => reject({status: 500, msg: 'Connection Error. Please try again later'}), 50000);
    });
  };

  export const deleteAPIs = async (path, fd) => {
    let expiry = await getData("token_expiry");
      if(expiry && !moment(new Date()).isBefore(expiry)){
         await refreshToken()
      }
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
              reject({status: 500, msg: 'Connection Error. Please try again later'});
            }
          });
    
        setTimeout(() => reject({status: 500, msg: 'Connection Error. Please try again later'}), 50000);
      });
    };
  
export const putAPIs = async (path, token, fd) => {
  let expiry = await getData("token_expiry");
    if(token && expiry && !moment(new Date()).isBefore(expiry)){
       await refreshToken()
    }
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
            error.response.data.msg.detail && typeof(error.response.data.msg.detail) === "string"
          ) {
            reject({status: 400, msg:error.response.data.msg.detail});
          } else {
            reject({status: 500, msg: 'Connection Error. Please try again later'});
          }
        });
  
      setTimeout(() => reject({status: 500, msg: 'Connection Error. Please try again later'}), 50000);
    });
  };
  
export const patchAPIs = async (path, token, fd) => {
  let expiry = await getData("token_expiry");
    if(token && expiry && !moment(new Date()).isBefore(expiry)){
       await refreshToken()
    }
    let _token = await getData("token");
    return new Promise((resolve, reject) => {
      axios({
        url: `${endPoint}${path}`,
        method: 'patch',
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
          //logError(endPoint,path,error)
          if (error.response) {
            reject({status: 500, msg: error.response.data});
          } else {
            reject({status: 500, msg: 'Connection Error. Please try again later'});
          }
        });
  
      setTimeout(() => reject({status: 500, msg: 'Connection Error. Please try again later'}), 50000);
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
          //logError(endPoint,path,error)
          if (error.response) {
            reject({status: 400, msg: error.response.data});
          } else {
            reject({status: 400, msg: 'Connection Error. Please try again later'});
          }
        });
  
      setTimeout(() => reject({status: 500, msg: 'Connection Error. Please try again later'}), 50000);
    });
  };
  
export const storeFile = async (path, token, fd) => {
  let expiry = await getData("token_expiry");
    if(token && expiry && !moment(new Date()).isBefore(expiry)){
       await refreshToken()
    }
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
            reject({status: 500, msg: 'Connection Error. Please try again later'});
          }
        });
    });
  };
  
export const storeFilePut = async (path, token, fd) => {
  let expiry = await getData("token_expiry");
    if(token && expiry && !moment(new Date()).isBefore(expiry)){
       await refreshToken()
    }
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
          console.log("res---",res)
          resolve(res.data);
        })
        .catch(error => {
          if (error.response) {
            reject({status: 500, msg: error.response.data});
          } else {
            reject({status: 500, msg: 'Connection Error. Please try again later'});
          }
        });
  
      //setTimeout(() => reject({status: 500, msg: 'Connection Error. Please try again later'}), 50000);
    });
  };

  const refreshToken = async () => {
    try{
        console.log("refreshToken-ing")
        let refresh = await getData("refresh")
        let res = await axios.post(`${endPoint}/accounts/auth/token/refresh/`,
          {
            "refresh": refresh
          }
        );
        await storeData('token_expiry',moment(new Date()).add(30,'minutes'))
        await storeData("token",res.data.access)
    }catch(err){
        console.log("refresh-error",err);
    }
}