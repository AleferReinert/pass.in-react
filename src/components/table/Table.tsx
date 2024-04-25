import { ReactNode } from 'react'
import { Pagination, PaginationProps } from '../Pagination'

interface TableProps extends PaginationProps {
    children: ReactNode
}

export function Table({ children, data }: TableProps) {

    return (
        <div className='sm:border border-zinc-800 rounded-lg'>
            <table className='w-full text-left text-sm text-zinc-300'>
                {children}
                
                <tfoot>
                    <tr>
                        <td colSpan={10}>
                            <div className='py-4 sm:flex sm:items-center sm:justify-between sm:gap-2 sm:px-4'>
                                <Pagination data={data} />
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}