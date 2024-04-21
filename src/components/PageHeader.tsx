export interface PageHeaderProps {
    title: string
    description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {

    return(
        <div className='pb-4'>
            <h1 className='text-xl sm:text-2xl font-bold mb-1'>
                {title}
            </h1>
            {description ? <p className='text-zinc-400 text-sm sm:text-base'>{description}</p> : ''}
        </div>
    )
}