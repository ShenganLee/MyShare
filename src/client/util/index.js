import { useMemo } from 'react'
import { useMemo, useCallback, useEffect } from 'react'

export const useIpcRenderer = () => {
    const ipcRenderer = useMemo(() => window.electron.ipcRenderer, [])

    return ipcRenderer
}
export const usePaste = () => {
    const ipcRenderer = useIpcRenderer()

    const handlePaste = useCallback((e) => {
        // ipcRenderer.send('sha')
        console.log('handlePaste', e)
    }, [ipcRenderer])

    useEffect(() => {
        document.addEventListener('paste', handlePaste, true)

        return () => document.removeEventListener('paste', handlePaste, true)
    }, [handlePaste])
}

export const useListener = (handle, listener) => {
    const ipcRenderer = useIpcRenderer()

    useEffect(() => {
        ipcRenderer.on(handle, listener)

        return () => ipcRenderer.off(handle, listener)
    }, [ipcRenderer, handle, listener])
}