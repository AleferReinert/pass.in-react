import { ChangeEvent } from 'react'
import { HiMagnifyingGlass as MagnifyingGlassIcon } from 'react-icons/hi2'

export interface SearchProps {
    search: string
    onSearchInputChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function Search({ search, onSearchInputChange }: SearchProps) {

    return(
        <div className='flex gap-2 pl-3 rounded-lg border border-zinc-800 w-full sm:w-[280px] text-sm h-[34px] items-center mb-4'>
            <MagnifyingGlassIcon className='size-4 text-emerald-200' />
            <input
                type='text'
                value={search}
                placeholder='Pesquisar...'
                onChange={onSearchInputChange}
                className='border-0 h-auto p-0 bg-transparent flex-1 outline-none focus:ring-0'
            />
        </div>
    )
}