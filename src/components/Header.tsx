import NlwUniteIcon from '/nlw-united-icon.svg'

interface HeaderProps {
    activeTab: string
    setActiveTab: React.Dispatch<React.SetStateAction<"events" | "attendees">>
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
    const buttonStyles = () => {
        if(activeTab === 'events') {
            return '[&:nth-child(2)]:text-zinc-400'
        }
        return '[&:nth-child(1)]:text-zinc-400'
    }

    return (
        <header className='flex items-center gap-5 py-2'>
            <img src={NlwUniteIcon} />
            <nav className='flex gap-5 font-medium text-sm'>
                <button onClick={() => setActiveTab('events')} className={buttonStyles()}>
                    Eventos
                </button>
                <button onClick={() => setActiveTab('attendees')} className={buttonStyles()}>
                    Participantes
                </button>
            </nav>
        </header>
    )
}