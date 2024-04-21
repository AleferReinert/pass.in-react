import { ChangeEvent } from 'react'
import { HiMagnifyingGlass as MagnifyingGlassIcon } from 'react-icons/hi2'

export interface SearchProps {
    placeholder?: string
    search: string
    onSearchInputChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function Search({ placeholder, search, onSearchInputChange }: SearchProps) {

    return(
        <div className='
            flex gap-2 pl-3 rounded-lg text-sm mb-4 items-center 
            border border-zinc-800 
            w-full h-[34px] sm:w-[280px] 
        '>
            <MagnifyingGlassIcon className='size-4 text-emerald-200' />
            <input
                type='text'
                value={search}
                placeholder={placeholder}
                onChange={onSearchInputChange}
                className='border-0 h-auto p-0 bg-transparent flex-1 outline-none focus:ring-0'
            />
        </div>
    )
}