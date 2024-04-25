import { Button } from './Button'
import { Checkbox } from './Checkbox'
import { HeaderProps } from './Header'
import { Table } from './table/Table'
import { BsThreeDots as ThreeDotsIcon } from 'react-icons/bs'
import { TableHeader } from './table/TableHeader'
import { TableBody } from './table/TableBody'
import { ComponentProps, useContext } from 'react'
import { PageContext } from '../App'

export interface EventProps {
    id: string
    title: string
    slug: string
    details: string
    maximumAttendees: number
}

interface EventsProps extends Pick<HeaderProps, 'setActiveTab'>, ComponentProps<'div'> {
    events: EventProps[] | undefined
    setCurrentEvent: React.Dispatch<React.SetStateAction<EventProps | null>>
}

export function Events({ events, setActiveTab, setCurrentEvent, ...props }: EventsProps) {
    const { page, itemsPerPage } = useContext(PageContext)

    function goToAttendees(currentEvent: EventProps) {
        setActiveTab('attendees')
        setCurrentEvent(currentEvent)
    }

    return (
        <div {...props}>
            {events && events?.length > 0 && 
                <Table data={events}>
                    <TableHeader>
                        <th>Evento</th>
                        <th className='hidden sm:table-cell'>Descrição</th>
                        <th>Vagas totais</th>
                        <th></th>
                    </TableHeader>
                    <TableBody>
                        {events?.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(item => {
                            return (
                                <tr key={item.id} 
                                    className='sm:hover:text-orange-400 sm:hover:cursor-pointer'
                                    onClick={() => goToAttendees(item)}
                                >
                                    <td>
                                        <Checkbox name='item' value={item.id} />
                                    </td>
                                    <td>
                                        {item.title}
                                    </td>
                                    <td className='hidden sm:table-cell'>
                                        {item.details}
                                    </td>
                                    <td>
                                        {item.maximumAttendees}
                                    </td>
                                    <td>
                                        <Button bgTransparent>
                                            <ThreeDotsIcon />
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </TableBody>
                </Table>
            }
        </div>
    )
}