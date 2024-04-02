import { PaginationButton } from './PaginationButton'
import MagnifyingGlassIcon from '../assets/magnifying-glass-icon.svg'
import ThreeDotsIcon from '../assets/three-dots-icon.svg'
import ChevronDoubleLeftIcon from '../assets/chevron-double-left-icon.svg'
import ChevronLeftIcon from '../assets/chevron-left-icon.svg'
import ChevronRightIcon from '../assets/chevron-right-icon.svg'
import ChevronDoubleRightIcon from '../assets/chevron-double-right-icon.svg'

export function AttendeeList() {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex gap-3 items-center'>
                <h1 className='text-2xl font-bold'>Participantes</h1>
                <div className='flex gap-2 pl-3 rounded-lg w-72 border border-white/10 text-sm h-[34px] items-center'>
                    <img src={MagnifyingGlassIcon} className='size-4' />
                    <input type='text' placeholder='Buscar participante...' className='border-0 h-auto p-0 bg-transparent flex-1 outline-none' />
                </div>
            </div>
            <div className='border border-white/10 rounded-lg'>
                <table className='w-full text-left text-sm text-zinc-300'>
                    <thead className='text-white'>
                        <tr>
                            <th className='py-3 px-5 w-0 font-semibold'><input type='checkbox' name='' id=''/></th>
                            <th className='py-3 font-semibold'>Código</th>
                            <th className='py-3 font-semibold'>Participante</th>
                            <th className='py-3 font-semibold'>Data de inscrição</th>
                            <th className='py-3 font-semibold'>Data do check-in</th>
                            <th className='py-3 font-semibold'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({length: 5}).map((_, index)=>{
                            return (
                                <tr key={index} className='border-t border-white/10 hover:bg-white/5'>
                                    <td className='py-3 px-5'>
                                        <input type='checkbox' className='border size-4 bg-black/20 rounded-sm border-white/10' />
                                    </td>
                                    <td>53726</td>
                                    <td className='py-3 flex flex-col gap-1'>
                                        <div className='font-semibold text-white'>
                                            Diego Fernandes
                                        </div>
                                        <div className='text-xs'>
                                            diegofernandes@gmail.com
                                        </div>
                                    </td>
                                    <td>7 dias atrás</td>
                                    <td>7 dias atrás</td>
                                    <td className='text-right px-4'>
                                        <button className='border border-white/10 rounded-lg size-7 bg-black/20'>
                                            <img src={ThreeDotsIcon} className='size-4 m-auto' />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot className='border-t border-white/10'>
                        <tr>
                            <td colSpan={4} className='p-4'>
                                Mostrando 10 de 228 ítens
                            </td>
                            <td colSpan={2} className='text-right'>
                                <div className='p-4 inline-flex gap-8 items-center'>
                                    <span>
                                        Página 1 de 11
                                    </span>
                                    <nav className='flex gap-1'>
                                        <PaginationButton title='Primeira página' icon={ChevronDoubleLeftIcon} />
                                        <PaginationButton title='Página anterior' icon={ChevronLeftIcon} />
                                        <PaginationButton title='Próxima página' icon={ChevronRightIcon} />
                                        <PaginationButton title='Última página' icon={ChevronDoubleRightIcon} />
                                    </nav>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}