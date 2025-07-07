export function SkeletonTableList() {
	return (
		<div className='sm:border border-zinc-800 rounded-lg mb-2'>
			<table className='w-full text-left text-sm text-zinc-300'>
				<thead
					className='
									text-white leading-[0] font-semibold border-b border-zinc-800 text-nowrap
									[&_th]:p-4 [&_th]:pl-0
									[&_th:last-child]:px-0
									sm:[&_th]:pr-4 
									sm:[&_th:first-child]:pl-4
							'
				>
					<tr>
						<th className='w-0'>
							<div className='size-4 bg-neutral-600 animate-pulse' />
						</th>
						<th>
							<div className='lg:hidden w-4 h-4 bg-neutral-600 animate-pulse rounded-sm' />
							<div className='hidden lg:inline-block w-12 h-4 bg-neutral-600 animate-pulse rounded-sm' />
						</th>
						<th>
							<div className='w-20 h-4 bg-neutral-600 animate-pulse rounded-sm' />
						</th>
						<th className='hidden sm:table-cell'>
							<div className='lg:hidden w-14 h-4 bg-neutral-600 animate-pulse rounded-sm' />
							<div className='hidden lg:inline-block w-28 h-4 bg-neutral-600 animate-pulse rounded-sm' />
						</th>
						<th>
							<div className='lg:hidden w-14 h-4 bg-neutral-600 animate-pulse rounded-sm' />
							<div className='hidden lg:inline-block w-28 h-4 bg-neutral-600 animate-pulse rounded-sm' />
						</th>
						<th></th>
					</tr>
				</thead>
				<tbody
					className='
            gap-4
            [&_tr]:border-t [&_tr]:border-zinc-800 [&_tr]:transition-all 
            [&_td]:p-4 [&_td]:pl-0
            [&_td:last-child]:pr-0 [&_td:last-child]:text-right
            sm:[&_td]:pr-4
            sm:[&_td:first-child]:pl-4
            sm:[&_td:last-child]:pr-4
            sm:hover:[&_tr]:bg-neutral-800
        '
				>
					{[1, 2, 3, 4].map(item => {
						return (
							<tr key={item}>
								<td>
									<div className='size-4 bg-neutral-600 animate-pulse' />
								</td>
								<td>
									<div className='w-4 h-4 bg-neutral-600 animate-pulse rounded-sm' />
								</td>
								<td>
									<div className='flex flex-col gap-1 self-center'>
										<div className='w-[88px] h-[18px] bg-neutral-600 animate-pulse mb-[2px] rounded-sm' />
										<div className='w-[146px] h-[15px] bg-neutral-600 animate-pulse rounded-sm' />
									</div>
								</td>
								<td className='hidden sm:table-cell'>
									<div className='w-16 h-4 bg-neutral-600 animate-pulse rounded-sm' />
								</td>
								<td>
									<div className='sm:flex items-center gap-1'>
										<div className='w-16 h-4 bg-neutral-600 animate-pulse rounded-sm' />
									</div>
								</td>
								<td className='text-right'>
									<div className='inline-block size-7 bg-neutral-600 animate-pulse rounded-lg' />
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
