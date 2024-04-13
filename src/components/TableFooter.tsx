import { IconButton } from './IconButton'
import {
    FiChevronLeft as ChevronLeftIcon,
    FiChevronRight as ChevronRightIcon,
    FiChevronsLeft as ChevronsLeftIcon, 
    FiChevronsRight as ChevronsRightIcon,
} from 'react-icons/fi'

type TableFooterProps = {
    page: number
    setCurrentPage: (page: number) => void
    itemsPerPage: number
    totalAttendees: number
    totalPages: number
}

export function TableFooter({ page, setCurrentPage, itemsPerPage, totalAttendees, totalPages }: TableFooterProps) {
    const visibleItens = () => {
        const start = (page * itemsPerPage) - (itemsPerPage)
        const end = page * itemsPerPage > totalAttendees ? totalAttendees : page * itemsPerPage
        return end-start
    }


    return (
        <tfoot className='border-t border-white/10'>
            <tr>
                <td colSpan={6} className='p-5'>
                    {
                        totalAttendees === 0 ? 'Nenhum participante encontrado.' :

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
                                        onClick={() => setCurrentPage(1)}
                                        disabled={page == 1}
                                    />
                                    <IconButton 
                                        title='Página anterior'
                                        children={<ChevronLeftIcon />}
                                        onClick={() => setCurrentPage(page - 1)}
                                        disabled={page == 1}
                                    />
                                    <IconButton
                                        title='Próxima página'
                                        children={<ChevronRightIcon />}
                                        onClick={() => setCurrentPage(page + 1)}
                                        disabled={page == totalPages}
                                    />
                                    <IconButton
                                        title='Última página' 
                                        children={<ChevronsRightIcon />}
                                        onClick={() => setCurrentPage(totalPages)}
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