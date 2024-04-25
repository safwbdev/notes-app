import { LuPlus } from "react-icons/lu";
import { Button } from '@chakra-ui/react'
import { useMycontext } from '../contexts/MainProvider'

const AddNoteButton = () => {
    const { openForm, setOpenForm, setContent } = useMycontext();

    function openNoteModal() {
        setOpenForm(true);
        setContent('');
    }
    return (
        <Button
            background={'#fbbc04'}
            className='openForm'
            color={'black'}
            fontWeight={'bold'}
            height={100}
            onClick={() => openNoteModal()}
            style={{ display: !openForm ? 'flex' : 'none' }}
            width={100}
        >
            <LuPlus />
        </Button>
    )
}

export default AddNoteButton