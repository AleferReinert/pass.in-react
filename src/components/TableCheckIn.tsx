import { FiCheck as CheckIcon, FiX as XIcon } from 'react-icons/fi'

type TableCheckInProps = {
    date?: string
}

export function TableCheckIn({date}: TableCheckInProps) {
    if(date) {
        return (
            <span className='flex items-center gap-1'>
                <CheckIcon className='text-green-400' />
                {date}
            </span>
        )
    } else {
        return (
            <span className='flex items-center gap-1 text-zinc-500'>
                <XIcon className='text-red-400' />
                Não fez check-in
            </span>
        )
    }
}