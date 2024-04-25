import { useMycontext } from "../contexts/MainProvider";
import { TaskPropTypes, ItemProps } from "../types";
import { LuArchive, LuArchiveRestore, LuTrash2 } from "react-icons/lu";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Heading,
    Stack,
    Box,
    StackDivider,
    Text,
    Divider,
    ButtonGroup,
    Button,
    ListItem,
    UnorderedList,
} from '@chakra-ui/react'

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
        <Card>
            <div onClick={() => getNote()}>
                <CardHeader>
                    <Heading size='md'>{task.title}</Heading>
                </CardHeader>
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        <Box>
                            {task.content ? (
                                <Text pt='2' fontSize='sm'>{task.content}</Text>

                            ) : (
                                <UnorderedList>
                                    {task.listContent.map((item) => (<ListItem key={item.lId} style={{ textDecoration: item.completed ? 'line-through' : 'unset' }}>{item.text}</ListItem>))}
                                </UnorderedList>
                            )}
                        </Box>
                    </Stack>
                </CardBody>
            </div>
            <Divider />
            <CardFooter justifyContent={'flex-end'}>
                <ButtonGroup spacing='2' >
                    <Button variant='ghost' colorScheme='blue' onClick={() => toggleArchive(task.id)}>
                        {task.archived ? <LuArchiveRestore /> : <LuArchive />}
                    </Button>
                    <Button variant='solid' colorScheme='red' onClick={() => deleteTask(task.id)}>
                        <LuTrash2 />
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
}

export default NoteItem