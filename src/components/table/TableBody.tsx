import { ReactNode } from 'react'

interface TableBodyProps {
    children: ReactNode
}

export function TableBody({ children }: TableBodyProps) {
    return (
        <tbody className='
            border-b border-zinc-800 gap-4
            [&_tr]:border-t [&_tr]:border-zinc-800 [&_tr]:transition-all 
            [&_td]:p-4 [&_td]:pl-0
            [&_td:last-child]:pr-0 [&_td:last-child]:text-right
            sm:[&_td]:pr-4
            sm:[&_td:first-child]:pl-4
            sm:[&_td:last-child]:pr-4
            sm:hover:[&_tr]:bg-neutral-800
        '>
            {children}
        </tbody>
    )
}