import { Checkbox } from './Checkbox'
import { IconButton } from './IconButton'
import { Table } from './Table'
import { TableHeader } from './TableHeader'
import { ChangeEvent, useEffect, useState } from 'react'
import { HiMagnifyingGlass as MagnifyingGlassIcon } from 'react-icons/hi2'
import { BsThreeDots as ThreeDotsIcon } from 'react-icons/bs'
import { TableCheckIn } from './TableCheckIn'
import { TableFooter } from './TableFooter'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
dayjs.extend(relativeTime)
dayjs.locale('pt-br')

type Attendee = {
    id: number
    name: string
    email: string
    createdAt: string
    checkedInAt: string | null
}

export function AttendeeList() {
    const url = new URL(window.location.toString())
    const pageParamInURL = Number(url.searchParams.get('page'))
    const [search, setSearch] = useState(() => {
        return url.searchParams.has('search') ? url.searchParams.get('search') ?? '' : ''
    })
    const [attendees, setAttendees] = useState<Attendee[]>([])
    const [totalPages, setTotalPages] = useState(1)
    const [page, setPage] = useState(1)
    const itemsPerPage = 10
    
    useEffect(() => {
        const urlAPI = new URL('https://pass-in-nodejs.vercel.app/events/7f968e71-187e-469e-95b1-dc861048194d/attendees')
        if(search.length > 0) {
            urlAPI.searchParams.set('query', search)
        }

        if(pageParamInURL > 0 && pageParamInURL <= totalPages) {
            setPage(pageParamInURL)
        }
        
        fetch(urlAPI)
        .then(response => response.json())
        .then(data => {
            const totalPages = Math.ceil(data.attendees.length / itemsPerPage)
            
            setAttendees(data.attendees)
            setTotalPages(totalPages)
            
            function updateURL(page: number){
                const url = new URL(window.location.toString())
                url.searchParams.set('page', String(page))
                window.history.pushState({}, '', url)
                setPage(totalPages)
            }
            
            if(pageParamInURL > totalPages) {
                updateURL(totalPages)
            } else if(pageParamInURL <= 0) {
                updateURL(1)
            }
        })

    }, [pageParamInURL, search, totalPages])
    
    function setCurrentPage(page: number) {
        url.searchParams.set('page', String(page))
        window.history.pushState({}, '', url)
        setPage(page)
    }

    function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
        setCurrentSearch(event.target.value)
        setCurrentPage(1)
    }

    function setCurrentSearch(search: string) {
        url.searchParams.set('search', search)
        window.history.pushState({}, '', url)
        setSearch(search)   
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex gap-3'>
                <h1 className='text-2xl font-bold -mt-1'>Participantes</h1>
                <div className='flex gap-2 pl-3 rounded-lg w-72 border border-white/10 text-sm h-[34px] items-center'>
                    <MagnifyingGlassIcon className='size-4 text-emerald-200' />
                    <input
                        type='text'
                        value={search}
                        placeholder='Buscar participante...'
                        className='border-0 h-auto p-0 bg-transparent flex-1 outline-none focus:ring-0'
                        onChange={onSearchInputChange}
                    />
                </div>
            </div>
            <Table>
                <thead className='text-white'>
                    <tr>
                        <th className='py-3 px-5 leading-none w-0'>
                            <Checkbox />
                        </th>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Participante</TableHeader>
                        <TableHeader>Data de inscrição</TableHeader>
                        <TableHeader>Data do check-in</TableHeader>
                        <TableHeader></TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {attendees.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((attendee)=>{
                        const createdAt = dayjs().to(attendee.createdAt)
                        const checkedInAt = attendee.checkedInAt !== null ? dayjs().to(attendee.checkedInAt) : ''

                        return (
                            <tr key={attendee.id} className='border-t border-white/10 hover:bg-white/5 transition-all'>
                                <td className='py-3 px-5'>
                                    <Checkbox />
                                </td>
                                <td>{attendee.id}</td>
                                <td className='py-3 flex flex-col gap-1'>
                                    <div className='font-semibold text-white'>
                                        {attendee.name}
                                    </div>
                                    <div className='text-xs'>
                                        {attendee.email}
                                    </div>
                                </td>
                                <td>{createdAt}</td>
                                <td>
                                    <TableCheckIn date={checkedInAt} />
                                </td>
                                <td className='text-right px-5'>
                                    <IconButton theme='dark' children={<ThreeDotsIcon />} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                <TableFooter
                    page={page}
                    setCurrentPage={setCurrentPage} 
                    itemsPerPage={itemsPerPage}
                    totalAttendees={attendees.length}
                    totalPages={totalPages}
                />
            </Table>
        </div>
    )
}