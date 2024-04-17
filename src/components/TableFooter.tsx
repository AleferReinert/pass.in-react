import { useEffect } from 'react'
import { AttendeeProps } from '../App'
import { IconButton } from './IconButton'
import {
    FiChevronLeft as ChevronLeftIcon,
    FiChevronRight as ChevronRightIcon,
    FiChevronsLeft as ChevronsLeftIcon, 
    FiChevronsRight as ChevronsRightIcon,
} from 'react-icons/fi'

export interface TableFooterProps {
    attendees: AttendeeProps[]
    itemsPerPage: number
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
}

export function TableFooter({ attendees, page, setPage, itemsPerPage }: TableFooterProps) {
    const attendeesAmount = attendees.length
    const pagesAmount = Math.ceil(attendeesAmount / itemsPerPage)

    useEffect(() => {
        const invalidPage = page < 1 || page > pagesAmount

        if(invalidPage) {
            const url = new URL(window.location.toString())
            url.searchParams.delete('page')
            window.history.pushState({}, '', url)
            setPage(1)
        }
    }, [page, pagesAmount, setPage])
    
    function visibleItems() {
        const start = (page * itemsPerPage) - (itemsPerPage)
        const end = page * itemsPerPage > attendeesAmount ? attendeesAmount : page * itemsPerPage
        return end - start
    }

    function goToPage(page: number) {
        const url = new URL(window.location.toString())
        url.searchParams.set('page', (page).toString())
        window.history.pushState({}, '', url)
        setPage(page)
    }

    return (
        <tfoot className='border-t border-white/10'>
            <tr>
                <td colSpan={6} className='p-5'>
                    {attendeesAmount === 0 ? 'Nenhum usuário encontrado.' :

                        <div className='flex justify-between'>
                            Mostrando {visibleItems()} de {attendeesAmount} itens

                            <div className='flex gap-8'>
                                <span>Página {page} de {pagesAmount}</span>
                                <nav className='flex gap-1 self-end'>
                                    <IconButton
                                        title='Primeira página'
                                        children={<ChevronsLeftIcon />}
                                        onClick={() => goToPage(1)}
                                        disabled={page == 1}
                                    />
                                    <IconButton 
                                        title='Página anterior'
                                        children={<ChevronLeftIcon />}
                                        onClick={() => goToPage(page - 1)}
                                        disabled={page == 1}
                                    />
                                    <IconButton
                                        title='Próxima página'
                                        children={<ChevronRightIcon />}
                                        onClick={() => goToPage(page + 1)}
                                        disabled={page == pagesAmount}
                                    />
                                    <IconButton
                                        title='Última página' 
                                        children={<ChevronsRightIcon />}
                                        onClick={() => goToPage(pagesAmount)}
                                        disabled={page == pagesAmount}
                                    />
                                </nav>
                            </div>
                        </div>
                    }
                </td>
            </tr>
        </tfoot>
    )
}