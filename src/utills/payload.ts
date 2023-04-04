

//REACT QUERY KEY
export const ABOUT_ME = "about_me"





//PAYLOAD TYPES 
export type RegisterTokenLoad = {
    user_type : "business_user" | "employee"
    registration_id : string
}

export type RequestTimeoffPayload = {
    id : number
    timeoff : number,
    start_date : string,
    end_date: string,
    reason: string
  }