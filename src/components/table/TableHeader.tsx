import { ReactNode, useState } from 'react'
import { Checkbox } from '../Checkbox'

interface TableHeaderProps {
    children: ReactNode[]
}

export function TableHeader({ children }: TableHeaderProps) {
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
        <thead className='
            text-white leading-none font-semibold 
            [&_th]:p-4
            [&_th:first-child]:pl-0
            [&_th:last-child]:px-0
            border-b border-zinc-800
            sm:[&_th]:pr-4
            sm:[&_th:first-child]:pl-4
        '>
            <tr>
                <th className='w-0'>
                    <Checkbox checked={checkboxControllerState} onChange={() => toggleCheckboxes()} />
                </th>
                {children}
            </tr>
        </thead>
    )
}