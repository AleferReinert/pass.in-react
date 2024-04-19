import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import { EventProps, Events } from './components/Events';
import { AttendeeProps, Attendees } from './components/Attendees';
import { Table } from './components/Table';
import { PageHeader } from './components/PageHeader';
import { Search } from './components/Search';
dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function App() {
    const url = useRef(new URL(window.location.toString()))
    const eventsPageTitle = useRef('Carregando...')
    const attendeesPageTitle = useRef('Carregando...')
    const attendeesPageDescription = useRef('...')
    const [activeTab, setActiveTab] = useState<'events' | 'attendees'>('attendees')
    const [page, setPage] = useState(url.current.searchParams.has('page') ? Number(url.current.searchParams.get('page')) : 1)
    const [attendees, setAttendees] = useState<AttendeeProps[]>()
    const [events, setEvents] = useState<EventProps[]>()
    const [search, setSearch] = useState(url.current.searchParams.get('search') ?? '')
    
    useEffect(() =>{
        const eventExampleId = '7f968e71-187e-469e-95b1-dc861048194d' //'ecb57664-fbe5-42ad-8bd5-493f69d21736'  
        const urlEvent = new URL(`https://pass-in-nodejs.vercel.app/events/${eventExampleId}`)
        const urlAttendees = new URL(`https://pass-in-nodejs.vercel.app/events/${eventExampleId}/attendees`)
        const urlEvents = new URL('https://pass-in-nodejs.vercel.app/events')

        if(search.length > 0) {
            urlAttendees.searchParams.set('query', search)
        }
        
        fetch(urlEvent).then(response => response.json()).then(data => {
            attendeesPageTitle.current = data.event.title ?? 'Participantes'
        })
        fetch(urlAttendees).then(response => response.json()).then(data => {
            setAttendees(data.attendees)
            attendeesPageDescription.current = data.attendees.length > 0 ? 'Lista de participantes' : 'Não há participantes'
        })
        fetch(urlEvents).then(response => response.json()).then(data => {
            setEvents(data.events)
            eventsPageTitle.current = data.events.length === 0 ? 'Não há eventos' : 'Eventos'
        })
    }, [search])

    // Evita páginas invalidas ao realizar buscas.
    // Sempre redireciona para a primeira página.
    function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
        url.current.searchParams.set('search', event.target.value)
        url.current.searchParams.delete('page')
        window.history.pushState({}, '', url.current)
        setPage(1)
    }

  return (
    <div className='max-w-[1216px] mx-auto py-5'>
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'events' ?
            <>
                <PageHeader
                    title={eventsPageTitle.current}
                />
                <Table
                    headers={['Evento', 'Descrição', 'Limite de participantes', null]}
                    data={events} 
                    page={page} 
                    itemsPerPage={10} 
                    setPage={setPage} 
                    children={<Events events={events} page={page} itemsPerPage={10} />}
                />
            </>
        :
            <>
                <PageHeader
                    title={attendeesPageTitle.current}
                    description={attendeesPageDescription.current}
                />
                <Search search={search} onSearchInputChange={onSearchInputChange} />
                <Table 
                    headers={['Código', 'Participante', 'Data de inscrição', 'Data do check-in', null]}
                    data={attendees} 
                    page={page} 
                    setPage={setPage} 
                    itemsPerPage={10} 
                    children={<Attendees attendees={attendees} page={page} itemsPerPage={10} />}
                />
            </>
        }
    </div>
  )
}
