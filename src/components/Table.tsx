import { ReactNode, useState } from 'react'
import { Checkbox } from './Checkbox'
import { Pagination, PaginationProps } from './Pagination'

export interface TableProps extends Pick<PaginationProps, 'data'> {
    headers: ReactNode[]
    children: ReactNode
    itemsPerPage: number
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
}

export function Table({ headers, children, data, page, setPage, itemsPerPage }: TableProps) {
    const [checkboxControllerState, setCheckboxControllerState] = useState(false)
    
    function toggleCheckboxes() {
        const checkboxes = document.querySelectorAll(`input[name="item"]`) as NodeListOf<HTMLInputElement>
        let allSelected = true;
        setCheckboxControllerState(true)

        checkboxes.forEach(e => {
            if (!e.checked) {
                allSelected = false;
                e.checked = true
            }
        })

        if (allSelected) {
            setCheckboxControllerState(false)
            checkboxes.forEach(e => e.checked = false)
        }
    }

    return (
        <>
            <div className='border-white/10 rounded-lg'>
                <table className='w-full text-left text-sm text-zinc-300'>
                    <thead className='text-white leading-none font-semibold [&_th]:py-4 [&_th:first-child]:px-4'>
                        <tr>
                            <th className='w-0'>
                                <Checkbox checked={checkboxControllerState} onChange={() => toggleCheckboxes()} />
                            </th>
                            {headers.map((header, index) => {
                                return <th key={index}>{header}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody className='
                        [&_tr]:border-t
                        [&_tr]:border-white/10
                        hover:[&_tr]:bg-white/5
                        [&_tr]:transition-all 
                        [&_td]:py-4 
                        [&_td:first-child]:px-4 
                        [&_td:last-child]:px-4 [&_td:last-child]:text-right
                    '>
                        {children}
                    </tbody>
                    <tfoot className='border-t border-white/10'>
                        <tr>
                            <td colSpan={6} className='py-4'>
                                <Pagination
                                    page={page}
                                    setPage={setPage}
                                    itemsPerPage={itemsPerPage}
                                    data={data}
                                />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}