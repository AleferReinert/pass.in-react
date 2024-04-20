import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { HeaderProps } from './Header';
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

interface EventsProps extends Pick<TableProps, 'page' | 'itemsPerPage'>, Pick<HeaderProps, 'setActiveTab'> {
    events: EventProps[] | undefined
    setCurrentEventId: React.Dispatch<React.SetStateAction<string>>
}

export function Events({ events, page, itemsPerPage, setCurrentEventId, setActiveTab }: EventsProps) {

    return (
        <>
                {events?.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(event => {
                    return (
                        <tr key={event.id}>
                            <td>
                                <Checkbox name='item' value={event.id} />
                            </td>
                            <td>
                                <button
                                    className='hover:text-orange-400'
                                    onClick={() => {
                                        setCurrentEventId((event.id).toString())
                                        setTimeout(() => setActiveTab('attendees'), 400);
                                    }}
                                >
                                    {event.title}
                                </button>
                            </td>
                            <td>{event.details}</td>
                            <td>{event.maximumAttendees}</td>
                            <td>
                                <Button children={<ThreeDotsIcon />} />
                            </td>
                        </tr>
                    )
                })}
        </>
    )
}