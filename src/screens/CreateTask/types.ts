export type CreateTaskParams = {
    task_id?: number,
}

export type SubTask = {
    id? : number
    title : string
    description : string
    assigned_by? : number
    task? : number
    status : "To-do" | "In-progress" | "Completed"
}

export type Data = {
    title: string,
    description: string,
    due_date?: string,
    id: number | string,
    type: "Departments" |  "Employee",
    name: string,
    assigned_to_id : number | string
}