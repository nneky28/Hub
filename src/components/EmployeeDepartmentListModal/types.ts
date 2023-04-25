import { useFetchEmployeesData } from "../../screens/People/types"
import { useFetchDepartmentsData } from "../../screens/TaskPeopleList/types";

type Employee = useFetchEmployeesData & {
    type : "Employee"
}
type Department = useFetchDepartmentsData & {
    type : "Departments"
}
export type EmployeeDepartmentListModalProps = {
    open : boolean, 
    onHide : () => void
    onPressHandler : (param : Employee | Department) => void
}
export type Tab = "Employees" | "Departments"