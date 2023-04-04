import { DateData } from "react-native-calendars/src/types";

export type CustomCalendarModalProps = {
    onHide : () => void
    show : boolean
    onDayPress : (param : DateData) => void
    date : string
    disableMinimum? : boolean
    maxDate? : Date
    minDate? : Date
}   