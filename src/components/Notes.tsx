import { useEffect, useState } from 'react';
import { useMycontext } from '../contexts/MainProvider'
import NoteItem from './NoteItem'
import NoteForm from './NoteView';
import {
    Grid,
    GridItem,
    Container,
    Button
} from '@chakra-ui/react'

const Home = () => {
    const { tasks, setTasks, setOpenForm, openForm, isArchived, searchQuery, setContent } = useMycontext();
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
                {
                    results.map(task => task.archived === isArchived && (
                        <GridItem w='100%' key={task.id}>
                            <NoteItem task={task} deleteTask={deleteTask} />
                        </GridItem>
                    ))
                }
                <NoteForm />
            </Grid >
            <Button
                onClick={() => {
                    setOpenForm(true);
                    setContent('');
                }}
                className='openForm'
                background={'#fbbc04'}
                style={{ display: !openForm ? 'block' : 'none' }}
                height={100}
                width={100}
                color={'black'}
                fontWeight={'bold'}
            >
                +
            </Button>
        </Container >
    )
}

export default Home