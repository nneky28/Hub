import { useFetchEmployeesData } from "../../screens/People/types";

export type PersonListCompProps = {
    item: useFetchEmployeesData
    onPressHandler: () => void;
};