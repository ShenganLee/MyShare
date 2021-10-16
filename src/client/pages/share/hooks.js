import { useMemo, useCallback, useEffect } from 'react'

export const useUploadTrriger = (inputRef, handler) => {
    const handleClick = useCallback(() => {
        const event = new MouseEvent('click')
        inputRef.current.dispatchEvent(event)
    }, [inputRef])

    useEffect(() => {
        inputRef.current.addEventListener('change', handler)

        return () => inputRef.current && inputRef.current.removeEventListener('change', handler)
    }, [handler])

    return handleClick
}

export const useIpcRenderer = () => {
    const ipcRenderer = useMemo(() => window.electron && window.electron.ipcRenderer, [])

    return ipcRenderer
}

export const useIpcSend = () => {
    const ipcRenderer = useIpcRenderer()

    const handleSend = useCallback((channel, ...args) => {
        return ipcRenderer.send(channel, ...args)
    }, [ipcRenderer])

    return handleSend
}

export const useIpcSendSync = () => {
    const ipcRenderer = useIpcRenderer()

    const handleSendSync = useCallback((channel, ...args) => {
        return ipcRenderer.sendSync(channel, ...args)
    }, [ipcRenderer])

    return handleSendSync
}

export const useIpcListener = (handle, listener) => {
    const ipcRenderer = useIpcRenderer()

    useEffect(() => {
        ipcRenderer.on(handle, listener)

        return () => ipcRenderer.off(handle, listener)
    }, [ipcRenderer, handle, listener])
}