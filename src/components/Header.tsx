import NlwUniteIcon from '/nlw-united-icon.svg'

export interface HeaderProps {
    activeTab: string
    setActiveTab: React.Dispatch<React.SetStateAction<"events" | "attendees">>
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
    const active = activeTab === 'events' ? 'first:*:text-white' : 'last:*:text-white'

    return (
        <header className='flex items-center gap-5 py-2 text-zinc-400'>
            <img src={NlwUniteIcon} />
            <nav className={'flex gap-5 font-medium text-sm ' + active}>
                <button onClick={() => setActiveTab('events')}>
                    Eventos
                </button>
                <button onClick={() => setActiveTab('attendees')}>
                    Participantes
                </button>
            </nav>
        </header>
    )
}