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

export interface EventProps {
    id: number
    title: string
    slug: string
    details: string
    attendeesAmount: number
    maximumAttendees: number
}

interface EventsProps extends TableFooterProps, Pick<HeaderProps, 'setActiveTab'> {
    data: EventProps[] | undefined
    setCurrentEventId: React.Dispatch<React.SetStateAction<string>>
}

export function Events({ data, page, setPage, itemsPerPage, setCurrentEventId, setActiveTab }: EventsProps) {
    function goToAttendees(id: number) {
        setCurrentEventId((id).toString())
        setTimeout(() => setActiveTab('attendees'), 400);
    }

    if(data?.length === 0) {
        return <PageHeader title='Eventos' />
    }

    return (
        <>
        <PageHeader title='Eventos' description={data?.length === 0 ? 'Não há eventos no momento.' : ''} />
        
        {data && data.length > 0 ? 
            <Table>
                <TableHeader>
                    <th>Evento</th>
                    <th className='hidden sm:table-cell'>Descrição</th>
                    <th>Vagas totais</th>
                    <th></th>
                </TableHeader>
                <TableBody>
                    {data?.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(item => {
                        return (
                            <tr key={item.id}>
                                <td><Checkbox name='item' value={item.id} /></td>
                                <td>
                                    <button 
                                        className='hover:text-orange-400 text-left' 
                                        onClick={() => goToAttendees(item.id)}
                                    >
                                        {item.title}
                                    </button>
                                </td>
                                <td className='hidden sm:table-cell'>{item.details}</td>
                                <td>{item.maximumAttendees}</td>
                                <td><Button bgTransparent children={<ThreeDotsIcon />} /></td>
                            </tr>
                        );
                    })}
                </TableBody>
                {data.length > itemsPerPage ? 
                    <TableFooter data={data} page={page} setPage={setPage} itemsPerPage={itemsPerPage} />
                : ''}
            </Table>
        : ''}
        </>
    )
}