import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { AttendeeList } from './components/AttendeeList';
import { Header } from './components/Header';

export interface EventProps {
    id: number
    title: string
    slug: string
    details: string
    maximumAttendees: number
    attendeesAmount: number
}

export interface AttendeeProps {
    id: number
    name: string
    email: string
    createdAt: string
    checkedInAt: string | null
}

export function App() {
    const [event, setEvent] = useState<EventProps>()
    const [attendees, setAttendees] = useState<AttendeeProps[]>()
    const itemsPerPage = 10
    const url = useRef(new URL(window.location.toString()))
    const [page, setPage] = useState(url.current.searchParams.has('page') ? Number(url.current.searchParams.get('page')) : 1)
    const [search, setSearch] = useState(url.current.searchParams.get('search') ?? '')

    // Evita páginas invalidas ao realizar buscas.
    // Sempre redireciona para a primeira página.
    function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
        url.current.searchParams.set('search', event.target.value)
        url.current.searchParams.delete('page')
        window.history.pushState({}, '', url.current)
    }
    
    useEffect(() =>{
        const urlEvent = new URL('https://pass-in-nodejs.vercel.app/events/7f968e71-187e-469e-95b1-dc861048194d')
        const urlAttendees = new URL('https://pass-in-nodejs.vercel.app/events/7f968e71-187e-469e-95b1-dc861048194d/attendees')
        
        if(search.length > 0) {
            urlAttendees.searchParams.set('query', search)
        }
        
        fetch(urlEvent).then(response => response.json()).then(data => {
            setEvent(data.event)
        })

        fetch(urlAttendees).then(response => response.json()).then(data => {
            setAttendees(data.attendees)
        })
    }, [page, search])

  return (
    <div className='max-w-[1216px] mx-auto py-5 flex flex-col gap-5'>
        <Header />
        {
            event === undefined || attendees === undefined ?
                'Carregando...'
            :
                <AttendeeList
                      event={event}
                      attendees={attendees}
                      itemsPerPage={itemsPerPage}
                      page={page}
                      setPage={setPage}
                      search={search}
                      onSearchInputChange={onSearchInputChange}
                />
        }
    </div>
  )
}
