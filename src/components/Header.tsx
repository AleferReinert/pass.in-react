import NlwUniteIcon from '/nlw-united-icon.svg'

export interface HeaderProps {
    activeTab: string
    setActiveTab: React.Dispatch<React.SetStateAction<"events" | "attendees">>
    setPage: React.Dispatch<React.SetStateAction<number>>
}

export function Header({ activeTab, setActiveTab, setPage }: HeaderProps) {
    const active = activeTab === 'events' ? 'first:*:text-white' : 'last:*:text-white'

    return (
        <header className='flex items-center gap-5 pt-4 pb-7 sm:pt-7 text-zinc-400'>
            <img src={NlwUniteIcon} />
            <nav className={'*:focus-visible:ring-0 flex gap-5 font-medium text-sm ' + active}>
                <button onClick={() => {
                    setActiveTab('events') 
                    setPage(1)
                }}>
                    Eventos
                </button>
                <button onClick={() => setActiveTab('attendees')}>
                    Participantes
                </button>
            </nav>
        </header>
    )
}