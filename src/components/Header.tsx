import NlwUniteIcon from '../assets/nlw-united-icon.svg'

export function Header() {
    return (
        <header className='flex items-center gap-5 py-2'>
            <img src={NlwUniteIcon} />
            <nav className='flex gap-5 font-medium text-sm'>
                <a href='' className='text-zinc-300'>Eventos</a>
                <a href=''>Participantes</a>
            </nav>
        </header>
    )
}