import { useMycontext } from '../contexts/MainProvider'
import { LuXCircle, LuPlusCircle } from "react-icons/lu";

const NoteView = () => {

    const {
        tasks,
        setTasks,
        content,
        setContent,
        title,
        setTitle,
        openForm,
        setOpenForm,
        currentNote,
        setCurrentNote,
        listContent,
        setListContent,
        isListForm,
        setIsListForm,
        currentListItem,
        setCurrentListItem
    } = useMycontext();

    function clear() {
        setContent('');
        setTitle('');
        setListContent([])
    }

    function addNote(title: string, content: string | null) {
        const newTask = {
            id: Date.now(),
            title,
            content,
            listContent,
            archived: false
        };
        setTasks(oldtasks => [...oldtasks, newTask]);
        clear();
        setOpenForm(false);
        setCurrentNote(0)
    }

    function updateNote(id: number) {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, title: title, content: content, listContent: listContent } : task
        ));
        setOpenForm(false);
        setCurrentNote(0);
        clear()

    }
    function closeView() {
        setOpenForm(false);
        setCurrentNote(0);
        clear()
    }



    function toggleCompleted(id: number) {
        setListContent(listContent.map(list => {
            if (list.lId === id) {
                return { ...list, completed: !list.completed };
            } else {
                return list;
            }

        }))
    }

    function deleteFromList(id: number) {
        setListContent(listContent.filter(task => task.lId !== id));
    }

    function addToList() {
        const newItem = {
            lId: Date.now(),
            text: currentListItem,
            completed: false
        };
        setListContent(oldItems => [...oldItems, newItem]);
        setCurrentListItem('');
    }

    return (
        <>
            <div className='noteWindow' style={{ display: openForm ? 'flex' : 'none' }}>
                <div className='noteForm'>
                    {currentNote === 0 && (
                        <div className="noteHeader">
                            <button onClick={() => {
                                setIsListForm(false);
                                setContent('');
                            }} className={!isListForm ? 'selected' : ''}>Note</button>
                            <button onClick={() => {
                                setIsListForm(true);
                                setContent(null);
                            }} className={isListForm ? 'selected' : ''}>List</button>
                        </div>
                    )}
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder='title'
                    />
                    {content !== null ? (
                        <textarea
                            value={content}
                            placeholder='content'
                            onChange={e => setContent(e.target.value)}
                        />
                    ) : (<div>
                        {listContent.map(item => (
                            <div className="itemInput" key={item.lId}>
                                <input
                                    type="checkbox"
                                    checked={item.completed}
                                    onChange={() => toggleCompleted(item.lId)}
                                />
                                {/* FIXME | make existing list items editable */}
                                <input value={item.text} placeholder='Add item' />
                                <button onClick={() => deleteFromList(item.lId)}><LuXCircle /></button>
                            </div>
                        ))}
                        <div className="newItemInput">
                            <input
                                value={currentListItem}
                                onChange={e => setCurrentListItem(e.target.value)}
                                placeholder='Add item' />
                            <button
                                onClick={() => addToList()}
                                disabled={currentListItem === ''}>
                                <LuPlusCircle />
                            </button>
                        </div>
                    </div>)}
                    <div className='formFooter'>
                        {currentNote === 0 ?
                            (<button onClick={() => addNote(title, content)}>Add</button>) :
                            (<button onClick={() => updateNote(currentNote)}>Update</button>)}
                        <button onClick={() => closeView()}>close</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteView