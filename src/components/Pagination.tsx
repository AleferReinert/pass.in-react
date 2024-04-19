import { useEffect } from 'react'
import { Button } from './Button'
import {
    FiChevronLeft as ChevronLeftIcon,
    FiChevronRight as ChevronRightIcon,
    FiChevronsLeft as ChevronsLeftIcon, 
    FiChevronsRight as ChevronsRightIcon,
} from 'react-icons/fi'
import { EventProps } from './Events'
import { AttendeeProps } from './Attendees'

export interface PaginationProps {
    data: AttendeeProps[] | EventProps[] | undefined
    itemsPerPage: number
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
}

export function Pagination({ data, page, setPage, itemsPerPage }: PaginationProps) {
    const dataAmount = data?.length ?? -1
    const pagesAmount = Math.ceil(dataAmount / itemsPerPage)
    const visibleItems = () => {
        const start = (page * itemsPerPage) - (itemsPerPage)
        const end = page * itemsPerPage > dataAmount ? dataAmount : page * itemsPerPage
        return end - start
    }
    const goToPage = (page: number) => {
        const url = new URL(window.location.toString())
        url.searchParams.set('page', (page).toString())
        window.history.pushState({}, '', url)
        setPage(page)
    }

    useEffect(() => {
        const invalidPage = page < 1 || page > pagesAmount

        if(invalidPage) {
            const url = new URL(window.location.toString())
            url.searchParams.delete('page')
            window.history.pushState({}, '', url)
            setPage(1)
        }
    }, [page, pagesAmount, setPage])
    
    return (
        <div className='flex justify-between items-center'>
            Mostrando {visibleItems()} de {dataAmount} itens

            {pagesAmount > 1 ? 
                <div className='flex gap-8 items-center'>
                    <span>Página {page} de {pagesAmount}</span>
                    <nav className='flex gap-1 self-end'>
                        <Button
                            title='Primeira página'
                            children={<ChevronsLeftIcon />}
                            onClick={() => goToPage(1)}
                            disabled={page == 1}
                        />
                        <Button 
                            title='Página anterior'
                            children={<ChevronLeftIcon />}
                            onClick={() => goToPage(page - 1)}
                            disabled={page == 1}
                        />
                        <Button
                            title='Próxima página'
                            children={<ChevronRightIcon />}
                            onClick={() => goToPage(page + 1)}
                            disabled={page == pagesAmount}
                        />
                        <Button
                            title='Última página' 
                            children={<ChevronsRightIcon />}
                            onClick={() => goToPage(pagesAmount)}
                            disabled={page == pagesAmount}
                        />
                    </nav>
                </div>
            : 
                ''
            }
        </div>
    )
}