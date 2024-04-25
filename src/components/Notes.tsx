import { useEffect, useState } from 'react';
import { useMycontext } from '../contexts/MainProvider'
import NoteItem from './NoteItem'
import NoteForm from './NoteView';
import {
    Grid,
    GridItem,
    Container
} from '@chakra-ui/react'
import AddNoteButton from './AddNoteButton';

const Home = () => {
    const { tasks, setTasks, isArchived, searchQuery } = useMycontext();
    const [results, setresults] = useState(tasks)

    useEffect(() => {
        if (searchQuery !== '') {
            setresults(tasks.filter(task => task.title.toLocaleLowerCase().includes(searchQuery)))
        } else {
            setresults(tasks)
        }
    }, [searchQuery, tasks])


    function deleteTask(id: number) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    return (
        <Container maxW='full' centerContent paddingTop={20} className='notesContainer'>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                {results.map(task => task.archived === isArchived && (
                    <GridItem w='100%' key={task.id}>
                        <NoteItem task={task} deleteTask={deleteTask} />
                    </GridItem>
                ))}
            </Grid >
            <NoteForm />
            <AddNoteButton />
        </Container >
    )
}

export default Home