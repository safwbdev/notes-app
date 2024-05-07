import { useEffect, useState } from 'react';
import { useMycontext } from '../contexts/MainProvider'
import NoteItem from './NoteItem'
import NoteForm from './NoteView';
import {
    Grid,
    GridItem,
    Container,
    Spinner
} from '@chakra-ui/react'
import AddNoteButton from './AddNoteButton';


const Home = () => {
    const { tasks, setTasks, isArchived, searchQuery } = useMycontext();
    const [results, setresults] = useState(tasks)
    const [loadingStatus, setLoadingStatus] = useState(true);

    useEffect(() => {
        if (searchQuery !== '') {
            setresults(tasks.filter(task => task.title.toLocaleLowerCase().includes(searchQuery)))
        } else {
            setresults(tasks)
        }
    }, [searchQuery, tasks])

    useEffect(() => {
        console.log('test', process.env.REACT_APP_API_URL);
        if (!process.env.REACT_APP_API_URL) return;

        console.log('pass');


        fetch(process.env.REACT_APP_API_URL)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setLoadingStatus(false)
                setTasks(data.notes);
            });
    }, []);


    function deleteTask(id: number) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    return (
        <Container maxW='full' centerContent paddingTop={20} className='notesContainer'>
            {loadingStatus && (<Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />)}
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