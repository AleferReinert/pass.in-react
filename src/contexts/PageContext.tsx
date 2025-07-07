import { createContext } from 'react'

export type PageContextProps = {
	page: number
	setPage: React.Dispatch<React.SetStateAction<number>>
	itemsPerPage: number
}

export const PageContext = createContext<PageContextProps>({ page: 1, setPage: () => {}, itemsPerPage: 10 })
