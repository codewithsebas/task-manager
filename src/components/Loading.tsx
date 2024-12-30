import { LoaderCircle } from 'lucide-react'
import React from 'react'

const Loading = () => {
    return (
        <div
            className='fixed flex items-center justify-center w-full h-full top-0 right-0 left-0 bottom-0 bg-black/30 dark:bg-black/50'
            data-testid='loading-container'>
            <div className='flex flex-col gap-2 items-center text-white'>
                <LoaderCircle className='animate-spin' />
                <span>Cargando</span>
            </div>
        </div>
    )
}

export default Loading