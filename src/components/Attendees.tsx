import { Table } from './table/Table'
import { TableHeader } from './table/TableHeader'
import { TableBody } from './table/TableBody'
import { Checkbox } from './Checkbox'
import { Button } from './Button'
import { FiCheck as CheckIcon, FiX as XIcon } from 'react-icons/fi'
import { BsThreeDots as ThreeDotsIcon } from 'react-icons/bs'
import { ComponentProps, useContext } from 'react'
import { PageContext } from '../App'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export interface AttendeeProps {
    id: number
    name: string
    email: string
    createdAt: string
    checkedInAt: string | null
}

interface AttendeesProps extends ComponentProps<'div'> {
    attendees: AttendeeProps[] | undefined
}

export function Attendees({ attendees, ...props }: AttendeesProps) {
    const { page, itemsPerPage } = useContext(PageContext)

    function checkInStatus(checkedInAt: string | null) {
        if(checkedInAt){
            return <>
                <CheckIcon className='text-green-400 inline-block' />
                <span className='hidden lg:inline'>
                    {dayjs().to(checkedInAt)}
                </span>
            </>
        }

        return <>
            <XIcon className='text-red-400 inline-block' />
            <span className='hidden lg:inline text-zinc-500'>
                Não fez check-in
            </span>
        </>
    }

    return (
        <div {...props}>
            <Table data={attendees}>
                <TableHeader>
                    <th>
                        <span className='lg:hidden'>ID</span>
                        <span className='hidden lg:inline'>Código</span>
                    </th>
                    <th>Participante</th>
                    <th className='hidden sm:table-cell'>
                        <span className='lg:hidden'>Inscrição</span>
                        <span className='hidden lg:inline'>Data da inscrição</span>
                    </th>
                    <th>
                        <span className='lg:hidden'>Check-in</span>
                        <span className='hidden lg:inline'>Data do check-in</span>
                    </th>
                    <th></th>
                </TableHeader>
                <TableBody>
                    {attendees?.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(item => {
                        return (
                            <tr key={item.id}>
                                <td>
                                    <Checkbox name='item' />
                                </td>
                                <td>{item.id}</td>
                                <td>
                                    <div className='flex flex-col gap-1 self-center'>
                                        <div className='font-semibold text-white'>
                                            {item.name}
                                        </div>
                                        <div className='text-xs -translate-y-1 hidden sm:block'>
                                            {item.email}
                                        </div>
                                    </div>
                                </td>
                                <td className='hidden sm:table-cell'>
                                    {dayjs().to(item.createdAt)}
                                </td>
                                <td>
                                    <div className='sm:flex items-center gap-1'>
                                        {checkInStatus(item.checkedInAt)}
                                    </div>
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
        </div>
    )
}