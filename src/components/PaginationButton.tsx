import { ReactNode } from 'react'

interface PaginationButtonProps {
    title: string
    icon: ReactNode
}

export function PaginationButton(props: PaginationButtonProps){
    return(
        <button title={props.title} className='border border-white/10 rounded-lg size-7 bg-white/20'>
            <img src={props.icon} className='size-4 m-auto' />
        </button>
    )
}