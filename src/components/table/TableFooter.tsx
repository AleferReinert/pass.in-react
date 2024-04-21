import { useEffect } from 'react'
import { Button } from '../Button'
import {FiChevronLeft as ChevronLeftIcon,
    FiChevronRight as ChevronRightIcon,
    FiChevronsLeft as ChevronsLeftIcon, 
    FiChevronsRight as ChevronsRightIcon,
} from 'react-icons/fi'
import { EventProps } from '../Events'
import { AttendeeProps } from '../Attendees'

export interface TableFooterProps {
    data: AttendeeProps[] | EventProps[] | undefined
    itemsPerPage: number
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
}

export function TableFooter({ data, page, setPage, itemsPerPage }: TableFooterProps) {
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
        <tfoot>
            <tr>
                <td colSpan={10}>
                    <div className='sm:flex sm:items-center sm:justify-between sm:gap-2 py-4 px-1.5 sm:px-4'>
                        <div className='hidden sm:block'>
                            {dataAmount > 0
                                ? `Mostrando ${visibleItems()} de ${dataAmount} itens` 
                                : 'Nenhum participante encontrado.'
                            }
                        </div>

                        {pagesAmount > 1 ? 
                            <div className='flex justify-between items-center'>
                                <span className='pr-8'>Página {page} de {pagesAmount}</span>

                                <div className='gap-8 items-center'>
                                    <nav className='flex gap-1 justify-center'>
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
                            </div>
                        : 
                            ''
                        }
                    </div>
                </td>
            </tr>
        </tfoot>
    )
}