import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useEffect, useRef, useState } from 'react'
import { AttendeeProps, Attendees } from './components/AttendeeList'
import { EventProps, Events } from './components/EventList'
import { Header } from './components/Header'
import { PageHeader } from './components/PageHeader'
import { Search } from './components/Search'
import { SkeletonTableList } from './components/SkeletonTableList'
import { PageContext } from './contexts/PageContext'
import { useUrl } from './hooks/useUrl'
dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function App() {
	const { hasUrlParam, getUrlParamValue, updateUrlParams } = useUrl()
	const [events, setEvents] = useState<EventProps[]>()
	const [currentEvent, setCurrentEvent] = useState<EventProps | null>(null)
	const [attendees, setAttendees] = useState<AttendeeProps[]>()
	const [activeTab, setActiveTab] = useState<'events' | 'attendees'>('attendees')
	const [search, setSearch] = useState(getUrlParamValue('search') ?? '')
	const pageParam = useRef(Number(getUrlParamValue('page')))
	const itemsPerPage = 10
	const [page, setPage] = useState(() => {
		// Verifica se o parâmetro page da URL é válido
		if (
			!hasUrlParam('page') ||
			pageParam.current <= 1 ||
			isNaN(pageParam.current) ||
			!Number.isInteger(pageParam.current)
		) {
			updateUrlParams({ page: null })
			return 1
		}
		return pageParam.current
	})

	useEffect(() => {
		const urlEvents = new URL(`${import.meta.env.VITE_API_URL}/events`)

		fetch(urlEvents)
			.then(response => response.json())
			.then(data => {
				setEvents(data.events)
				setCurrentEvent(data.events[0])
			})
	}, [])

	useEffect(() => {
		if (currentEvent) {
			setAttendees(undefined) // Evita mostrar dados errados ao trocar de evento

			const urlAttendees = new URL(
				`${import.meta.env.VITE_API_URL}/events/${currentEvent.id}/attendees?query=${search}`
			)

			fetch(urlAttendees)
				.then(response => response.json())
				.then(data => {
					setAttendees(data.attendees)

					// Redireciona para a 1ª página se 'page' na url for mais alto que a última página
					const pagesAmount = Math.ceil(data.attendees.length / itemsPerPage)
					const invalidPage = pageParam.current > pagesAmount
					invalidPage && setPage(1)

					// Atualiza os parâmetros
					updateUrlParams({
						page: pageParam.current > pagesAmount ? null : getUrlParamValue('page'),
						search: search.length > 0 ? search : null
					})
				})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentEvent, search])

	return (
		<PageContext.Provider value={{ page, setPage, itemsPerPage }}>
			<div className='max-w-[1216px] mx-auto p-3 pt-0 sm:p-6 sm:pt-0 md:p-8 md:pt-0'>
				<Header activeTab={activeTab} setActiveTab={setActiveTab} setSearch={setSearch} />

				{events ? (
					<PageHeader
						title={activeTab === 'events' ? 'Eventos' : currentEvent?.title ?? 'Participantes'}
						description={
							activeTab === 'events' ? (events.length > 0 ? '' : 'Não há eventos no momento.') : currentEvent?.details
						}
					/>
				) : (
					<div className='pb-4 animate-pulse'>
						<div className='bg-neutral-600 rounded-sm mb-2 w-[190px] h-[30px]' />
						<div className='bg-neutral-600 rounded-sm w-full max-w-[456px] h-[22px]' />
					</div>
				)}

				{activeTab === 'attendees' && (
					<>
						{currentEvent && currentEvent.attendeesAmount > 2 ? (
							<Search placeholder='Buscar participante...' search={search} setSearch={setSearch} />
						) : (
							<div className='w-[280px] h-[34px] bg-neutral-600 animate-pulse rounded-lg mb-4' />
						)}
					</>
				)}

				{events ? (
					<Events
						className={activeTab === 'events' ? 'block' : 'hidden'}
						events={events}
						setActiveTab={setActiveTab}
						setCurrentEvent={setCurrentEvent}
					/>
				) : (
					<SkeletonTableList />
				)}

				{attendees ? (
					<Attendees className={activeTab === 'attendees' ? 'block' : 'hidden'} attendees={attendees} />
				) : (
					<SkeletonTableList />
				)}
			</div>
		</PageContext.Provider>
	)
}

