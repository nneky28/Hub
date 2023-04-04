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