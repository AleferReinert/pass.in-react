import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ComponentProps, useContext } from 'react'
import { BsThreeDots as ThreeDotsIcon } from 'react-icons/bs'
import { FiCheck as CheckIcon, FiX as XIcon } from 'react-icons/fi'
import { Button } from './Button'
import { Checkbox } from './Checkbox'
import { PageContext } from './contexts/PageContext'
import { Table } from './Table'
import { TableBody } from './TableBody'
import { TableHeader } from './TableHeader'
dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export interface AttendeeProps {
	id: number
	name: string
	email: string
	createdAt: string
	checkedInAt: string | null
}

interface AttendeesProps extends ComponentProps<'div'> {
	attendees: AttendeeProps[] | undefined
}

export function Attendees({ attendees, ...props }: AttendeesProps) {
	const { page, itemsPerPage } = useContext(PageContext)

	function checkInStatus(checkedInAt: string | null) {
		if (checkedInAt) {
			return (
				<>
					<CheckIcon className='text-green-400 inline-block' />
					<span className='hidden lg:inline'>{dayjs().to(checkedInAt)}</span>
				</>
			)
		}

		return (
			<>
				<XIcon className='text-red-400 inline-block' />
				<span className='hidden lg:inline text-zinc-400'>Não fez check-in</span>
			</>
		)
	}

	return (
		<div {...props}>
			<Table data={attendees}>
				<TableHeader>
					<th>
						<span className='lg:hidden'>ID</span>
						<span className='hidden lg:inline'>Código</span>
					</th>
					<th>Participante</th>
					<th className='hidden sm:table-cell'>
						<span className='lg:hidden'>Inscrição</span>
						<span className='hidden lg:inline'>Data da inscrição</span>
					</th>
					<th>
						<span className='lg:hidden'>Check-in</span>
						<span className='hidden lg:inline'>Data do check-in</span>
					</th>
					<th></th>
				</TableHeader>
				<TableBody>
					{attendees?.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(item => {
						return (
							<tr key={item.id}>
								<td>
									<Checkbox aria-label={`Selecionar participante ${item.name}`} name='item' />
								</td>
								<td>{item.id}</td>
								<td>
									<div className='flex flex-col gap-1 self-center'>
										<div className='font-semibold text-white'>{item.name}</div>
										<div className='text-xs -translate-y-1 hidden sm:block'>{item.email}</div>
									</div>
								</td>
								<td className='hidden sm:table-cell'>{dayjs().to(item.createdAt)}</td>
								<td>
									<div className='sm:flex items-center gap-1'>{checkInStatus(item.checkedInAt)}</div>
								</td>
								<td>
									{/*
                                        Desabilitado por não ter ações.
                                        Não foi usado disable para não interferir nos estilos.
                                    */}
									<Button bgTransparent className='pointer-events-none'>
										<ThreeDotsIcon />
									</Button>
								</td>
							</tr>
						)
					})}
				</TableBody>
			</Table>
		</div>
	)
}

