import { ComponentProps } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
	bgTransparent?: boolean
}

export function Button({ bgTransparent, ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className={`
                ${props.className ?? ''}
                text-white text-base
                border rounded-lg size-7 transition-all 
                inline-flex items-center justify-center
                hover:bg-orange-400 hover:text-black 
                disabled:bg-zinc-900 disabled:text-zinc-500 disabled:border-zinc-800
                focus-visible:bg-zinc-700 focus-visible:text-white
                focus:bg-zinc-800 focus:text-white
                focus:hover:bg-orange-400 focus:hover:text-black
                ${bgTransparent ? 'bg-transparent border-zinc-700' : 'bg-zinc-800 border-neutral-800'}
            `}
		>
			{props.children}
		</button>
	)
}
