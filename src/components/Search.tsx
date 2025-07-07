import { useContext } from 'react'
import { HiMagnifyingGlass as MagnifyingGlassIcon } from 'react-icons/hi2'
import { useUrl } from '../hooks/useUrl'
import { PageContext } from './contexts/PageContext'

export interface SearchProps {
	placeholder?: string
	search: string
	setSearch: React.Dispatch<React.SetStateAction<string>>
}

export function Search({ placeholder, search, setSearch }: SearchProps) {
	const { setPage } = useContext(PageContext)
	const { updateUrlParams } = useUrl()

	function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value)
		setPage(1)
		updateUrlParams({
			page: null
		})
	}

	return (
		<div
			className='
            flex gap-2 pl-3 rounded-lg text-sm mb-4 items-center border border-zinc-800 w-full h-[34px] sm:w-[280px]
        '
		>
			<MagnifyingGlassIcon className='size-4 text-emerald-200' />
			<input
				name='search'
				type='text'
				value={search}
				placeholder={placeholder}
				onChange={e => onInputChange(e)}
				className='border-0 h-auto p-0 bg-transparent flex-1 outline-none focus:ring-0'
			/>
		</div>
	)
}
