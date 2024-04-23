import { useEffect, useState } from 'react';
import { useMycontext } from '../contexts/MainProvider'
import NoteItem from './NoteItem'
import NoteForm from './NoteView';

const Home = () => {
    const { tasks, setTasks, setOpenForm, openForm, isArchived, searchQuery } = useMycontext();

    const [results, setresults] = useState(tasks)

    useEffect(() => {
        if (searchQuery !== '') {
            setresults(tasks.filter(task => task.title.toLocaleLowerCase().includes(searchQuery)))
        } else {
            setresults(tasks)
        }
    }, [searchQuery])


    function deleteTask(id: number) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    return (
        <div className="noteList">
            {results.map(task => task.archived === isArchived && (
                <NoteItem
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                />
            ))}
            <NoteForm />
            <button
                onClick={() => setOpenForm(true)}
                style={{ display: !openForm ? 'block' : 'none' }}
                className='openForm'>
                +
            </button>

        </div>
    )
}

export default Home