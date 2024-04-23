export interface TaskPropTypes {
    id: number,
    title: string,
    content: string | null,
    listContent: ListPropTypes[],
    archived: boolean
}

export interface ItemProps {
    task: TaskPropTypes
    deleteTask: any
}

export interface ListPropTypes {
    lId: number,
    text: string,
    completed: boolean
}