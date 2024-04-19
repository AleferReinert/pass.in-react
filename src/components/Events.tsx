import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { TableProps } from './Table';
import { BsThreeDots as ThreeDotsIcon } from 'react-icons/bs'

export interface EventProps {
    id: number
    title: string
    slug: string
    details: string
    attendeesAmount: number
    maximumAttendees: number
}

interface EventsProps extends Pick<TableProps, 'page' | 'itemsPerPage'> {
        events: EventProps[] | undefined
}

export function Events({ events, page, itemsPerPage }: EventsProps) {

    return (
        <>
                {events?.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(event => {
                    return (
                        <tr key={event.id} className='border-t border-white/10 hover:bg-white/5 transition-all'>
                            <td className='py-3 px-5'>
                                <Checkbox name='item' value={event.id} />
                            </td>
                            <td>{event.title}</td>
                            <td>{event.details}</td>
                            <td>{event.maximumAttendees}</td>
                            <td className='text-right px-5'>
                                <Button children={<ThreeDotsIcon />} />
                            </td>
                        </tr>
                    )
                })}
        </>
    )
}