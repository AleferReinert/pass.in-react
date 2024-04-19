export interface PageHeaderProps {
    title: string
    description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {

    return(
        <div className='my-4'>
            <h1 className='text-2xl font-bold mb-1'>
                {title}
            </h1>
            {description ? <p className='text-zinc-400'>{description}</p> : ''}
        </div>
    )
}