import { useMycontext } from "../contexts/MainProvider";
import { TaskPropTypes, ItemProps } from "../types";
// import { FaArchive, FaTrash } from "react-icons/fa";
import { LuArchive, LuArchiveRestore, LuTrash2 } from "react-icons/lu";

const NoteItem = ({ task, deleteTask }: ItemProps) => {
    const {
        setOpenForm,
        setCurrentNote,
        setTitle,
        setContent,
        setTasks,
        tasks,
        setListContent
    } = useMycontext()

    function getNote() {
        setCurrentNote(task.id)
        setOpenForm(true)
        setTitle(task.title)
        setContent(task.content)
        setListContent(task.listContent)

    }

    function toggleArchive(id: number) {
        setTasks(tasks.map((task: TaskPropTypes) => {
            if (task.id === id) {
                return { ...task, archived: !task.archived };
            } else {
                return task;
            }
        }));
    }

    return (
        <div className="noteItem">
            <div className="noteContent" onClick={() => getNote()}>
                <p className="title">{task.title}</p>
                {task.content ? (
                    <p className="content">{task.content}</p>

                ) : (
                    <ul>
                        {task.listContent.map((item) => (<li key={item.lId} style={{ textDecoration: item.completed ? 'line-through' : 'unset' }}>{item.text}</li>))}
                    </ul>
                )}
            </div>
            <div className="noteFooter">
                <button className="deleteNote" onClick={() => deleteTask(task.id)}>
                    <LuTrash2 />
                </button>
                <button className="archiveNote" onClick={() => toggleArchive(task.id)}>
                    {task.archived ? <LuArchiveRestore /> : <LuArchive />}
                </button>
            </div>
        </div>
    );
}

export default NoteItem