import { ComponentProps } from 'react'

export function Button({ ...props }: ComponentProps<'button'>){

    return(
        <button
            {...props}
            title={props.disabled ? '' : props.title}
            className={`
                text-white
                border border-zinc-700
                bg-zinc-800
                rounded-lg
                size-7 
                transition-all 
                text-base
                inline-flex items-center justify-center
                hover:bg-orange-400 hover:text-black 
                disabled:bg-zinc-900 disabled:text-zinc-500 disabled:border-zinc-800
                focus-visible:bg-zinc-700 focus-visible:text-white
            `}
        >
             {props.children}
        </button>
    )
}