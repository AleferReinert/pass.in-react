import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import { EventProps, Events } from './components/Events';
import { Attendees } from './components/Attendees';
import Loading from './components/Loading';
dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function App() {
    const url = useRef(new URL(window.location.toString()))
    const [activeTab, setActiveTab] = useState<'events' | 'attendees'>('attendees')
    const [events, setEvents] = useState<EventProps[]>()
    const [currentEvent, setCurrentEvent] = useState<EventProps>()
    const [search, setSearch] = useState(url.current.searchParams.get('search') ?? '')
    const [page, setPage] = useState(url.current.searchParams.has('page') ? Number(url.current.searchParams.get('page')) : 1)
    
    useEffect(() =>{
        const urlEvents = new URL('https://pass-in-nodejs.vercel.app/events')
        fetch(urlEvents).then(response => response.json()).then(data => {
            setEvents(data.events)
            setCurrentEvent(data.events[0])
        })
        
        if(url.current.searchParams.has('page')) {
            url.current.searchParams.set('page', (page).toString())
            window.history.pushState({}, '', url.current)
            setPage(Number(url.current.searchParams.get('page')))
        }
    }, [search, page])

    function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
        url.current.searchParams.set('search', event.target.value)
        url.current.searchParams.delete('page')
        window.history.pushState({}, '', url.current)
        setPage(1)
    }

    if(!events) {
        return <Loading />
    }

    return (
        <div className='max-w-[1216px] mx-auto px-3 sm:px-6 md:px-8'>
            <Header activeTab={activeTab} setActiveTab={setActiveTab} setPage={setPage} />

            <Events
                className={activeTab === 'events' ? 'block' : 'hidden'}
                data={events} setActiveTab={setActiveTab}
                setCurrentEvent={setCurrentEvent}
                page={page} setPage={setPage} itemsPerPage={10} 
            />
            <Attendees 
                className={activeTab === 'attendees' ? 'block' : 'hidden'}
                event={currentEvent} 
                search={search} onSearchInputChange={onSearchInputChange} 
                page={page} setPage={setPage} itemsPerPage={10}
            />
        </div>
    )
}
