import { useCallback, useEffect } from 'react'

export const useUploadTrriger = (inputRef, handler) => {
    const handleClick = useCallback(() => {
        const event = new MouseEvent('click')
        inputRef.current.dispatchEvent(event)
    }, [inputRef])

    useEffect(() => {
        inputRef.current.addEventListener('change', handler)

        return () => inputRef.current.removeEventListener('change', handler)
    }, [handler])

    return handleClick
}