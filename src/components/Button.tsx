import { ComponentProps } from 'react'

export function Button({ ...props }: ComponentProps<'button'>){

    return(
        <button
            {...props}
            title={props.disabled ? '' : props.title}
            className={`
                border border-zinc-800
                bg-zinc-800
                rounded-lg
                size-7 
                transition-all 
                text-base
                inline-flex items-center justify-center
                hover:bg-orange-400 hover:text-black 
                disabled:bg-transparent disabled:text-zinc-800
            `}
        >
             {props.children}
        </button>
    )
}