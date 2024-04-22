import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { HeaderProps } from './Header';
import { TableFooterProps } from './table/TableFooter';
import { Table } from './table/Table';
import { BsThreeDots as ThreeDotsIcon } from 'react-icons/bs'
import { TableHeader } from './table/TableHeader';
import { TableBody } from './table/TableBody';
import { TableFooter } from './table/TableFooter';
import { PageHeader } from './PageHeader';
import { ComponentProps } from 'react';

export interface EventProps {
    id: string
    title: string
    slug: string
    details: string
    maximumAttendees: number
}

interface EventsProps extends TableFooterProps, Pick<HeaderProps, 'setActiveTab'>, ComponentProps<'div'> {
    data: EventProps[] | undefined
    setActiveTab: React.Dispatch<React.SetStateAction<"events" | "attendees">>
    setCurrentEvent: React.Dispatch<React.SetStateAction<EventProps | undefined>>
}

export function Events({ data, setActiveTab, setCurrentEvent, page, setPage, itemsPerPage, ...props }: EventsProps) {
    function goToAttendees(event: EventProps) {
        setActiveTab('attendees')
        setCurrentEvent(event)
    }

    return (
        <div {...props}>
            <PageHeader title='Eventos' description={data?.length === 0 ? 'Não há eventos no momento.' : ''} />
            
            {data && data.length > 0 && 
                <Table>
                    <TableHeader>
                        <th>Evento</th>
                        <th className='hidden sm:table-cell'>Descrição</th>
                        <th>Vagas totais</th>
                        <th></th>
                    </TableHeader>
                    <TableBody>
                        {data?.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(item => {
                            console.log(item)
                            return (
                                <tr key={item.id} className='sm:hover:text-orange-400 sm:hover:cursor-pointer'
                                    onClick={() => goToAttendees(item)}
                                >
                                    <td><Checkbox name='item' value={item.id} /></td>
                                    <td>{item.title}</td>
                                    <td className='hidden sm:table-cell'>{item.details}</td>
                                    <td>{item.maximumAttendees}</td>
                                    <td><Button bgTransparent children={<ThreeDotsIcon />} /></td>
                                </tr>
                            );
                        })}
                    </TableBody>
                    {data.length > itemsPerPage && 
                        <TableFooter data={data} page={page} setPage={setPage} itemsPerPage={itemsPerPage} />
                    }
                </Table>
            }
        </div>
    )
}