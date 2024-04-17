import { ComponentProps } from 'react'

interface IconButtonProps extends ComponentProps<'button'> {
    theme?: 'dark' | 'light'
}


export function IconButton({theme, ...props}: IconButtonProps){
    const commomStyles = 'border border-white/10 rounded-lg size-7 hover:bg-orange-400 hover:text-black transition-all text-base inline-flex items-center justify-center ';
    const themeLight = commomStyles + 'bg-white/10 disabled:bg-white/5 disabled:text-inherit';
    const themeDark = commomStyles + 'bg-black/20';

    return(
        <button {...props} className={theme === 'dark' ? themeDark : themeLight}>
             {props.children}
        </button>
    )
}