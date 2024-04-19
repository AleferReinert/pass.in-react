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
            <div className='border border-white/10 rounded-lg'>
                <table className='w-full text-left text-sm text-zinc-300'>
                    <thead>
                        <tr>
                            <th className='px-5 w-0'>
                                <Checkbox checked={checkboxControllerState} onChange={() => toggleCheckboxes()} />
                            </th>
                            {headers.map((header, index) => {
                                return (
                                    <th key={index} className='text-white py-5 leading-none font-semibold'>
                                        {header}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                    <tfoot className='border-t border-white/10'>
                        <tr>
                            <td colSpan={6} className='p-5'>
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