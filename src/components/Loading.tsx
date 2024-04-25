interface LoadingProps {
    full?: boolean
}
export default function Loading({ full }: LoadingProps) {
    const fullStyles = 'absolute top-0 left-0 right-0 bottom-0 bg-neutral-900'

    return (
        <div aria-label='Carregando' className={`flex justify-center items-center *:w-20 ${full && fullStyles}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <circle className='fill-orange-400' r="15" cx="40" cy="100">
                    <animate attributeName="opacity" calcMode="spline" dur="0.6" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
                </circle>
                <circle className='fill-orange-400' r="15" cx="100" cy="100">
                    <animate attributeName="opacity" calcMode="spline" dur="0.6" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.1"></animate></circle>
                <circle className='fill-orange-400' r="15" cx="160" cy="100">
                    <animate attributeName="opacity" calcMode="spline" dur="0.6" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
                </circle>
            </svg>
        </div>
    )
}