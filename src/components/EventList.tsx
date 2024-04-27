import { Button } from './Button'
import { Checkbox } from './Checkbox'
import { HeaderProps } from './Header'
import { Table } from './Table'
import { BsThreeDots as ThreeDotsIcon } from 'react-icons/bs'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'
import { ComponentProps, useContext } from 'react'
import { PageContext } from '../App'

export interface EventProps {
    id: string
    title: string
    slug: string
    details: string
    maximumAttendees: number
    attendeesAmount: number
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
                        <th>Vagas Preenchidas</th>
                        <th></th>
                    </TableHeader>
                    <TableBody>
                        {events?.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(item => {
                            return (
                                <tr key={item.id} className='sm:hover:text-orange-400'>
                                    <td>
                                        <Checkbox name='item' value={item.id} />
                                    </td>
                                    <td onClick={() => goToAttendees(item)} className='hover:cursor-pointer'>
                                        {item.title}
                                    </td>
                                    <td onClick={() => goToAttendees(item)} className='hidden sm:table-cell hover:cursor-pointer'>
                                        {item.details}
                                    </td>
                                    <td onClick={() => goToAttendees(item)} className='hover:cursor-pointer'>
                                        {item.attendeesAmount}/
                                        {item.maximumAttendees}
                                    </td>
                                    <td>
                                        {/*
                                            Desabilitado por não ter ações.
                                            Não foi usado disable para não interferir nos estilos.
                                        */}
                                        <Button bgTransparent className='pointer-events-none'>
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