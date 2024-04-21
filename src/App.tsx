import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import { EventProps, Events } from './components/Events';
import { AttendeeProps, Attendees } from './components/Attendees';
dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function App() {
    const url = useRef(new URL(window.location.toString()))
    const [activeTab, setActiveTab] = useState<'events' | 'attendees'>('attendees')
    const [page, setPage] = useState(url.current.searchParams.has('page') ? Number(url.current.searchParams.get('page')) : 1)
    const [attendees, setAttendees] = useState<AttendeeProps[]>()
    const [event, setEvent] = useState<EventProps>()
    const [events, setEvents] = useState<EventProps[]>()
    const [search, setSearch] = useState(url.current.searchParams.get('search') ?? '')
    const [currentEventId, setCurrentEventId] = useState('7f968e71-187e-469e-95b1-dc861048194d') //'ecb57664-fbe5-42ad-8bd5-493f69d21736'
    
    useEffect(() =>{
        const urlEvent = new URL(`https://pass-in-nodejs.vercel.app/events/${currentEventId}`)
        const urlAttendees = new URL(`https://pass-in-nodejs.vercel.app/events/${currentEventId}/attendees`)
        const urlEvents = new URL('https://pass-in-nodejs.vercel.app/events')

        if(search.length > 0) {
            urlAttendees.searchParams.set('query', search)
        }

        fetch(urlAttendees).then(response => response.json()).then(data => setAttendees(data.attendees))
        fetch(urlEvent    ).then(response => response.json()).then(data => setEvent(data.event))
        fetch(urlEvents   ).then(response => response.json()).then(data => setEvents(data.events))
    }, [currentEventId, search])

    function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
        url.current.searchParams.set('search', event.target.value)
        url.current.searchParams.delete('page')
        window.history.pushState({}, '', url.current)
        setPage(1)
    }

  return (
    <div className='max-w-[1216px] mx-auto p-3 sm:p-6 md:p-8'>
        <Header activeTab={activeTab} setActiveTab={setActiveTab} setPage={setPage} />

        {activeTab === 'events' ?
            <Events
                data={events} page={page} setPage={setPage} itemsPerPage={10} 
                setActiveTab={setActiveTab} setCurrentEventId={setCurrentEventId}
            />
        :
            <Attendees 
                data={attendees} event={event} 
                search={search} onSearchInputChange={onSearchInputChange} 
                page={page} setPage={setPage} itemsPerPage={10}
            />
        }
    </div>
  )
}
