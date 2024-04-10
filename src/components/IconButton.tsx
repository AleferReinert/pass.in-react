import { ComponentProps } from 'react'

interface IconButtonProps extends ComponentProps<'button'> {
    icon: string
    theme?: 'dark' | 'light'
}

export function IconButton({theme, icon, ...props}: IconButtonProps){
    const commomStyles = 'border border-white/10 rounded-lg size-7 hover:bg-orange-400 transition-all ';
    const themeLight = commomStyles + 'bg-white/20 disabled:bg-white/5';
    const themeDark = commomStyles + 'bg-black/20';

    return(
        <button 
            {...props} 
            className={theme === 'dark' ? themeDark : themeLight}
        >
            <img src={icon} className='size-4 m-auto' />
        </button>
    )
}