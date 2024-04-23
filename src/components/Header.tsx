
import { useMycontext } from '../contexts/MainProvider'
import { LuArchive, LuStickyNote } from "react-icons/lu";

const Header = () => {
    const { isArchived, setIsArchived, searchQuery, setSearchQuery } = useMycontext()

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
                <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder='search by title'

                />
            </div>
            <div className="other">
                <button onClick={() => setIsArchived(!isArchived)}>
                    {isArchived ? <LuStickyNote /> : <LuArchive />}
                </button>
            </div>
        </div>
    )
}

export default Header