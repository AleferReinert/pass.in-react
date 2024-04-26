import { useContext } from 'react'
import { SearchProps } from './Search'
import NlwUniteIcon from '/nlw-united-icon.svg'
import { PageContext } from '../App'
import { useUrl } from '../hooks/useUrl'

export interface HeaderProps extends Pick<SearchProps, 'setSearch'> {
    activeTab: string
    setActiveTab: React.Dispatch<React.SetStateAction<"events" | "attendees">>
}

export function Header({ activeTab, setActiveTab, setSearch }: HeaderProps) {
    const { setPage } = useContext(PageContext)
    const { updateUrlParams } = useUrl()
    const active = activeTab === 'events' ? 'first:*:text-white' : 'last:*:text-white'

    function changeToEvents() {
        setActiveTab('events') 
        setPage(1)
        setSearch('')
        updateUrlParams({
            search: null,
            page: null
        })
    }
    
    function changeToAttendees() {
        setActiveTab('attendees')
    }

    return (
        <header className='flex items-center gap-5 pt-4 pb-7 sm:pt-7 text-zinc-400'>
            <img src={NlwUniteIcon} />
            
            <nav className={'flex gap-5 font-medium text-sm ' + active}>
                <button className='focus-visible:outline-none' onClick={changeToEvents}>
                    Eventos
                </button>
                <button className='focus-visible:outline-none' onClick={changeToAttendees}>
                    Participantes
                </button>
            </nav>
        </header>
    )
}