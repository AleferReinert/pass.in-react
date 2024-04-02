import { Checkbox } from './Checkbox'
import { IconButton } from './IconButton'
import { Table } from './Table'
import { TableHeader } from './TableHeader'
import { attendess } from '../data/attendees'
import { useState } from 'react'
import ChevronLeftIcon from '../assets/chevron-left-icon.svg'
import ChevronRightIcon from '../assets/chevron-right-icon.svg'
import ChevronDoubleLeftIcon from '../assets/chevron-double-left-icon.svg'
import ChevronDoubleRightIcon from '../assets/chevron-double-right-icon.svg'
import MagnifyingGlassIcon from '../assets/magnifying-glass-icon.svg'
import ThreeDotsIcon from '../assets/three-dots-icon.svg'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function AttendeeList() {
    const [page, setPage] = useState(1)
    const itemsPerPage = 10
    const totalPages = Math.ceil(attendess.length / itemsPerPage)

    function firstPage() {setPage(1)}
    function prevPage() {setPage(page - 1)}
    function nextPage() {setPage(page + 1)}
    function lastPage() {setPage(totalPages)}

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex gap-3'>
                <h1 className='text-2xl font-bold -mt-1'>Participantes</h1>
                <div className='flex gap-2 pl-3 rounded-lg w-72 border border-white/10 text-sm h-[34px] items-center'>
                    <img src={MagnifyingGlassIcon} className='size-4' />
                    <input
                        type='text'
                        placeholder='Buscar participante...'
                        className='border-0 h-auto p-0 bg-transparent flex-1 outline-none focus:ring-0'
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
                    {attendess.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((attendee)=>{
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
                                <td>{dayjs().to(attendee.createdAt)}</td>
                                <td>{dayjs().to(attendee.checkedInAt)}</td>
                                <td className='text-right px-4'>
                                    <IconButton theme='dark' icon={ThreeDotsIcon} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot className='border-t border-white/10'>
                    <tr>
                        <td colSpan={4} className='p-4'>
                            Mostrando {itemsPerPage} de {attendess.length} ítens
                        </td>
                        <td colSpan={2} className='text-right'>
                            <div className='p-4 inline-flex gap-8 items-center'>
                                <span>
                                    Página {page} de {totalPages}
                                </span>
                                <nav className='flex gap-1'>
                                    <IconButton
                                        title='Primeira página'
                                        icon={ChevronDoubleLeftIcon}
                                        onClick={firstPage}
                                        disabled={page == 1}
                                    />
                                    <IconButton 
                                        title='Página anterior'
                                        icon={ChevronLeftIcon}
                                        onClick={prevPage}
                                        disabled={page == 1}
                                    />
                                    <IconButton
                                        title='Próxima página'
                                        icon={ChevronRightIcon}
                                        onClick={nextPage}
                                        disabled={page == totalPages}
                                    />
                                    <IconButton
                                        title='Última página' 
                                        icon={ChevronDoubleRightIcon}
                                        onClick={lastPage}
                                        disabled={page == totalPages}
                                    />
                                </nav>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </div>
    )
}