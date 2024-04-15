import { IconButton } from './IconButton'
import {
    FiChevronLeft as ChevronLeftIcon,
    FiChevronRight as ChevronRightIcon,
    FiChevronsLeft as ChevronsLeftIcon, 
    FiChevronsRight as ChevronsRightIcon,
} from 'react-icons/fi'

type TableFooterProps = {
    page: number
    updateUrlParam: (param: string, value: string | null) => void
    itemsPerPage: number
    totalAttendees: number
    totalPages: number
    status: string | null
}

export function TableFooter({ page, updateUrlParam, itemsPerPage, totalAttendees, totalPages, status }: TableFooterProps) {
    const visibleItens = () => {
        const start = (page * itemsPerPage) - (itemsPerPage)
        const end = page * itemsPerPage > totalAttendees ? totalAttendees : page * itemsPerPage
        return end-start
    }

    const goToPage = (page: number) => updateUrlParam('page', (page).toString())

    return (
        <tfoot className='border-t border-white/10'>
            <tr>
                <td colSpan={6} className='p-5'>
                    {
                        status ? status :

                        <div className='flex justify-between'>
                            Mostrando {visibleItens()} de {totalAttendees} itens

                            <div className='flex gap-8'>
                                <span>
                                    Página {page} de {totalPages}
                                </span>
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
                                        disabled={page == totalPages}
                                    />
                                    <IconButton
                                        title='Última página' 
                                        children={<ChevronsRightIcon />}
                                        onClick={() => goToPage(totalPages)}
                                        disabled={page == totalPages}
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