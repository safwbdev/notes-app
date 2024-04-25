import React from 'react'
import { LuPlus } from "react-icons/lu";
import { Button } from '@chakra-ui/react'
import { useMycontext } from '../contexts/MainProvider'

const AddNoteButton = () => {
    const { openForm, setOpenForm, setContent } = useMycontext();
    return (
        <Button
            onClick={() => {
                setOpenForm(true);
                setContent('');
            }}
            className='openForm'
            background={'#fbbc04'}
            style={{ display: !openForm ? 'flex' : 'none' }}
            height={100}
            width={100}
            color={'black'}
            fontWeight={'bold'}
        >
            <LuPlus />
        </Button>
    )
}

export default AddNoteButton