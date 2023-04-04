export type PushNotificationData = {
    data? : {
        message_body? : string
        message_icon? : string
        message_title? : string
        type? : string
        type_id? : string
    }
    from? : string
    messageId? : string
    sentTime? : number
    ttl? : number
}


export type UserMembershipProps = {
    business_id? : string, 
    business_name?: string, 
    created?: string, 
    currency? : string, 
    logo? : string
}
export type StoredUserProps = {
    business_onboarding_status? : string
    business_user_memberships? : []
    email? : string
    employee_user_memberships? : UserMembershipProps[]
    first_name? : string
    last_name? : string
    profiles? : []
}

export type StoredAboutMeProps = {
    
}