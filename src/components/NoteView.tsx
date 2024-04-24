import { useMycontext } from '../contexts/MainProvider'
import { LuXCircle, LuPlusCircle } from "react-icons/lu";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Textarea,
    Checkbox,
    Button,
    Input,
} from '@chakra-ui/react'

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
            <Modal isOpen={openForm} onClose={closeView}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {currentNote === 0 && (
                            <div style={{ marginBottom: '1em' }}>
                                <Button onClick={() => {
                                    setIsListForm(false);
                                    setContent('');
                                }} color={!isListForm ? 'white' : 'black'} colorScheme={!isListForm ? 'blue' : ''}>Note</Button>
                                <Button onClick={() => {
                                    setIsListForm(true);
                                    setContent(null);
                                }} color={isListForm ? 'white' : 'black'} colorScheme={isListForm ? 'blue' : ''}>List</Button>
                            </div>
                        )}
                        <Input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder='title'
                            size='full'
                        />
                    </ModalHeader>
                    {/* <ModalCloseButton /> */}
                    <ModalBody>
                        {content !== null ? (
                            <Textarea
                                value={content}
                                placeholder='content'
                                onChange={e => setContent(e.target.value)}
                            />
                        ) : (<div>
                            {listContent.map(item => (
                                <div className="itemInput" key={item.lId}>
                                    <Checkbox isChecked={item.completed}
                                        onChange={() => toggleCompleted(item.lId)} />
                                    {/* FIXME | make existing list items editable */}
                                    <Input value={item.text} placeholder='Add item' size={'full'} />
                                    <Button onClick={() => deleteFromList(item.lId)} colorScheme='red'><LuXCircle /></Button>
                                </div>
                            ))}
                            <div className="newItemInput">
                                <Input
                                    value={currentListItem}
                                    onChange={e => setCurrentListItem(e.target.value)}
                                    placeholder='Add item' />
                                <Button
                                    colorScheme='green'
                                    onClick={() => addToList()}
                                    disabled={currentListItem === ''}>
                                    <LuPlusCircle />
                                </Button>
                            </div>
                        </div>)}
                    </ModalBody>
                    <ModalFooter>
                        {currentNote === 0 ?
                            (<Button onClick={() => addNote(title, content)}>Add</Button>) :
                            (<Button onClick={() => updateNote(currentNote)}>Update</Button>)}
                        <Button onClick={() => closeView()}>close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default NoteView