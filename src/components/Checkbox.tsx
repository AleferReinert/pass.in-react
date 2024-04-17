import { ComponentProps } from 'react';

interface CheckboxProps extends ComponentProps<'input'> {}

export function Checkbox({...props}: CheckboxProps) {
    return (
        <input {...props} type='checkbox' className='focus:ring-offset-0 focus:ring-0 hover:cursor-pointer border size-4 bg-black/20 rounded-sm border-white/10' />
    )
}