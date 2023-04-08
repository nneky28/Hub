import { StoredUserProps } from "../../Routes/types";

export type UserProps = {
    access_token? : string,
    refresh_token? : string
    user? : StoredUserProps
}