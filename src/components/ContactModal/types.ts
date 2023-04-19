import { useFetchDocumentsData } from "../../screens/Documents/type"
import { useFetchEmployeesData } from "../../screens/People/types"
import { useFetchAboutMeData } from "../TimeoffModal/types"

export type prevProps = {
    isVisible : boolean
    loading : boolean
}
export type nextProps = {
    isVisible : boolean
    loading : boolean
}

export type ContactModalProps = {
    isVisible : boolean
    onHide : () => void
    data? : useFetchEmployeesData | useFetchAboutMeData
}

export type DocumentModalProps = {
    isVisible : boolean
    onHide : () => void
    document? : useFetchDocumentsData
}