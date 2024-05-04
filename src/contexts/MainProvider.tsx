import { createContext, useContext, useMemo, useState, Dispatch } from "react";
import { ListPropTypes, TaskPropTypes } from "../types";
// import { data } from "../data";

interface variableDataValues {
    title: string
    content: string | null
    listContent: ListPropTypes[]
    tasks: TaskPropTypes[]
    openForm: boolean
    currentNote: number
    isArchived: boolean
    searchQuery: string
    isListForm: boolean
    currentListItem: string
}

interface contextprovider {
    children: React.ReactNode
}

interface contextState extends variableDataValues {
    setTitle: Dispatch<React.SetStateAction<string>>
    setContent: Dispatch<React.SetStateAction<string | null>>
    setListContent: Dispatch<React.SetStateAction<ListPropTypes[]>>
    setTasks: Dispatch<React.SetStateAction<TaskPropTypes[]>>
    setOpenForm: Dispatch<React.SetStateAction<boolean>>
    setCurrentNote: Dispatch<React.SetStateAction<number>>
    setIsArchived: Dispatch<React.SetStateAction<boolean>>
    setSearchQuery: Dispatch<React.SetStateAction<string>>
    setIsListForm: Dispatch<React.SetStateAction<boolean>>
    setCurrentListItem: Dispatch<React.SetStateAction<string>>

}

const MainContext = createContext<contextState | undefined>(undefined)

const MainProvider = ({ children }: contextprovider) => {
    const [content, setContent] = useState<string | null>(null);
    const [listContent, setListContent] = useState<ListPropTypes[]>([]);
    const [title, setTitle] = useState<string>('');
    // const [tasks, setTasks] = useState<TaskPropTypes[]>(data);
    const [tasks, setTasks] = useState<TaskPropTypes[]>([]);
    const [openForm, setOpenForm] = useState<boolean>(false)
    const [currentNote, setCurrentNote] = useState<number>(0)
    const [isArchived, setIsArchived] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isListForm, setIsListForm] = useState<boolean>(false)
    const [currentListItem, setCurrentListItem] = useState<string>('');



    const values: contextState = useMemo(() => ({
        content,
        setContent,
        tasks,
        setTasks,
        title,
        setTitle,
        openForm,
        setOpenForm,
        currentNote,
        setCurrentNote,
        isArchived,
        setIsArchived,
        searchQuery,
        setSearchQuery,
        listContent,
        setListContent,
        isListForm,
        setIsListForm,
        currentListItem,
        setCurrentListItem
    }), [
        content,
        setContent,
        tasks,
        setTasks,
        title,
        setTitle,
        openForm,
        setOpenForm,
        currentNote,
        setCurrentNote,
        isArchived,
        setIsArchived,
        searchQuery,
        setSearchQuery,
        listContent,
        setListContent,
        isListForm,
        setIsListForm,
        currentListItem,
        setCurrentListItem
    ])

    return (
        <MainContext.Provider value={values}>
            {children}
        </MainContext.Provider>
    )
}

const useMycontext = (): contextState => {
    const context = useContext(MainContext);
    if (!context) {
        throw new Error('error')
    }
    return context
}
export { MainProvider, useMycontext }