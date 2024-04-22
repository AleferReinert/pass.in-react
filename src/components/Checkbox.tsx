import { ComponentProps } from 'react';

interface CheckboxProps extends ComponentProps<'input'> {}

export function Checkbox({...props}: CheckboxProps) {
    return (
        <input {...props}
            type='checkbox'
            className={`
                border size-4 bg-transparent rounded-sm border-white/10 flex self-center
                focus:ring-offset-0 focus:ring-0
                hover:cursor-pointer
                checked:bg-orange-400
                checked:focus:bg-orange-400
                checked:hover:bg-orange-400
            `}
        />
    )
}