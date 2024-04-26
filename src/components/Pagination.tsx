import { Button } from './Button'
import {FiChevronLeft as ChevronLeftIcon,
    FiChevronRight as ChevronRightIcon,
    FiChevronsLeft as ChevronsLeftIcon, 
    FiChevronsRight as ChevronsRightIcon,
} from 'react-icons/fi'
import { EventProps } from './EventList'
import { AttendeeProps } from './AttendeeList'
import { useContext } from 'react'
import { PageContext } from '../App'
import { useUrl } from '../hooks/useUrl'

export interface PaginationProps {
    data: AttendeeProps[] | EventProps[] | undefined
}

export function Pagination({ data }: PaginationProps) {
    const { updateUrlParams } = useUrl()
    const { page, setPage, itemsPerPage } = useContext(PageContext)
    const dataAmount = data?.length ?? -1
    const pagesAmount = Math.ceil(dataAmount / itemsPerPage)
    
    function visibleItems() {
        const start = (page * itemsPerPage) - (itemsPerPage)
        const end = page * itemsPerPage > dataAmount ? dataAmount : page * itemsPerPage
        return end - start
    }

    function goToPage(page: number) {
        setPage(page)
        updateUrlParams({page: (page > 1) ? page.toString() : null})
    }
    
    return (
        <>
            {dataAmount > 0 ? 
                <div className='hidden sm:block'>
                    {dataAmount > 0 && `Mostrando ${visibleItems()} de ${dataAmount} itens`}
                </div>
            : dataAmount === 0 ?
                'Nenhum participante encontrado.'
            : 
                'Carregando...'
            }
            {pagesAmount > 1 &&
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
            }
        </>
    )
}