import { ReactNode } from 'react';

interface TableBodyProps {
    children: ReactNode
}

export function TableBody({ children }: TableBodyProps) {
    return (
        <tbody className='
            border-b border-zinc-800
            [&_tr]:border-t
            [&_tr]:border-zinc-800
            hover:[&_tr]:bg-neutral-800
            [&_tr]:transition-all 
            [&_td]:pr-1.5
            [&_td]:py-4
            [&_td:first-child]:pl-1.5
            [&_td:last-child]:text-right
            sm:[&_td]:pr-4
            sm:[&_td:first-child]:pl-4
        '>
            {children}
        </tbody>
    )
}