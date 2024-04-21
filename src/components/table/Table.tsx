import { ReactNode } from 'react'

interface TableProps {
    children: ReactNode
}

export function Table({ children }: TableProps) {

    return (
        <div className='sm:border border-zinc-800 rounded-lg'>
            <table className='w-full text-left text-sm text-zinc-300'>
                {children}
            </table>
        </div>
    )
}