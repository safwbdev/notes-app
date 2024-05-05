import { createContext, useContext, useMemo, useState, Dispatch, useEffect } from "react";
import { ListPropTypes, TaskPropTypes } from "../types";
import { PATTERN } from "../pattern";

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
    move: boolean
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
    setMove: Dispatch<React.SetStateAction<boolean>>
}

const MainContext = createContext<contextState | undefined>(undefined)

const MainProvider = ({ children }: contextprovider) => {
    const [content, setContent] = useState<string | null>(null);
    const [listContent, setListContent] = useState<ListPropTypes[]>([]);
    const [title, setTitle] = useState<string>('');
    const [tasks, setTasks] = useState<TaskPropTypes[]>([]);
    const [openForm, setOpenForm] = useState<boolean>(false)
    const [currentNote, setCurrentNote] = useState<number>(0)
    const [isArchived, setIsArchived] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isListForm, setIsListForm] = useState<boolean>(false)
    const [currentListItem, setCurrentListItem] = useState<string>('');
    const [move, setMove] = useState<boolean>(false);

    let current: number = 0;

    const keyHandler = function (event: any) {
        if (PATTERN.indexOf(event.key) < 0 || event.key !== PATTERN[current]) {
            current = 0;
            return;
        }
        current++;

        if (PATTERN.length === current) {
            current = 0;
            setMove(true);
        }
    };

    document.addEventListener("keydown", keyHandler, false);




    useEffect(() => {
        if (move) {
            window.location.href = process.env.REACT_APP_REDIRECT_URL || '';
        }
    }, [move]);

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
        setCurrentListItem,
        move,
        setMove
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
        setCurrentListItem,
        move,
        setMove
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