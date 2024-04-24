
import { useMycontext } from '../contexts/MainProvider'
import { LuArchive, LuStickyNote } from "react-icons/lu";
import {
    Input, Button
} from '@chakra-ui/react'
const Header = () => {
    const {
        isArchived,
        setIsArchived,
        searchQuery,
        setSearchQuery
    } = useMycontext()

    return (
        <div className="header">
            <div className="navTitle">
                <span>
                    N
                </span>
                <LuStickyNote />
                <span>tes</span>
            </div>
            <div className="search">
                <Input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder='search by title'
                    color='black'
                    background={'white'}
                />
            </div>
            <div className="other">
                <Button onClick={() => setIsArchived(!isArchived)}>
                    {isArchived ? <LuStickyNote /> : <LuArchive />}
                </Button>
            </div>
        </div>
    )
}

export default Header