import { Checkbox } from './Checkbox'
import { IconButton } from './IconButton'
import { Table } from './Table'
import { TableHeader } from './TableHeader'
import { BsThreeDots as ThreeDotsIcon } from 'react-icons/bs'
import { HiMagnifyingGlass as MagnifyingGlassIcon } from 'react-icons/hi2'
import { TableCheckIn } from './TableCheckIn'
import { TableFooter, TableFooterProps } from './TableFooter'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import { EventProps } from '../App'
import { ChangeEvent } from 'react'
dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export interface AttendeeListProps extends TableFooterProps {
    event: EventProps
    itemsPerPage: number
    search: string
    onSearchInputChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function AttendeeList({
    event,
    attendees,
    search,
    onSearchInputChange,
    itemsPerPage,
    page,
    setPage
}: AttendeeListProps) {

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex gap-3 flex-col'>
                <h1 className='text-2xl font-bold -mt-1'>
                    {event.title}
                </h1>
                <h2 className='text-zinc-400'>Lista de participantes.</h2>
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
                    {attendees.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(attendee =>{
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
                    setPage={setPage}
                    itemsPerPage={itemsPerPage}
                    attendees={attendees}
                />
            </Table>
        </div>
    )
}