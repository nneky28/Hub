import axios from "axios";

export const endPoint = 'https://coolowo.com';

export const employees_me = (business_id) => `/c/${business_id}/employees/me/`;
export const APIFunction = {
  my_business_assests : (business_id,employee_pk) => `/c/${business_id}/employees/${employee_pk}/assets/`,
  benefits : (business_id,employee_pk) => `/c/${business_id}/employees/${employee_pk}/benefits/`,
  whos_out : (business_id) => `/c/${business_id}/timeoff_taken/widgets/whos_out/`,
  birthdays : (business_id) => `/c/${business_id}/employees/dashboard/birthdays/`
}

export const getAPIs = (path, token) => {
    return new Promise((resolve, reject) => {
      let split = path.split("/?");
      let url = split && split.length > 1 ? 
      `${endPoint}${path}&timestamp=${new Date().getTime()}` : 
      `${endPoint}${path}?timestamp=${new Date().getTime()}`;
      axios
        .get(`${url}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
          },
        })
        .then(result => {
          resolve(result.data);
        })
        .catch(error => {
          //logError(endPoint,path,error)
          reject({status: 500, msg: error.response.data});
        });
      setTimeout(() => reject({status: 500, msg: 'Connection Error. Please try again later'}), 50000);
    });
  };
  
export const postAPIs = (path, token, fd) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `${endPoint}${path}`,
        method: 'post',
        data: fd,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
  
export const putAPIs = (path, token, fd) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `${endPoint}${path}`,
        method: 'put',
        data: fd,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
  
export const patchAPIs = (path, token, fd) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `${endPoint}${path}`,
        method: 'patch',
        data: fd,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
    return new Promise((resolve, reject) => {
      axios({
        url: `${endPoint}${path}`,
        method: 'POST',
        data: fd,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          //logError(endPoint,path,error)
          reject(error);
        });
    });
  };
  
export const storeFilePut = async (path, token, fd) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `${endPoint}${path}`,
        method: 'put',
        data: fd,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          //logError(endPoint,path,error);
          reject({status: 400, msg: 'Connection Error. Please try again later'});
        });
  
      setTimeout(() => reject({status: 500, msg: 'Connection Error. Please try again later'}), 50000);
    });
  };
  
  const logError = (endPoint,path,error) => {
    let msg = error.response ? error.response : error;
    let fd = {
      endpoint : `${endPoint}${path}`,
      log : JSON.stringify(msg),
      device : Platform.OS
    }
    console.log("logError",fd)
    axios({
      url: `${endPoint}/logs/`,
      method: 'post',
      data: fd,
      headers: {
        Accept: 'application/json',
      },
    })
  }