import { useMemo, useEffect, useReducer } from 'react'

export const useMemory = (initializerArg) => {
    const memory = useMemo(() => ({ ...initializerArg }), [])

    return memory
}

export const useElectron = () => {
    const electron = useMemo(() => window.electron, [])

    return electron
}

export const useIpcRenderer = () => {
    const ipcRenderer = useMemo(() => window.electron.ipcRenderer, [])

    return ipcRenderer
}

export const useIpcListener = (handle, listener) => {
    const ipcRenderer = useIpcRenderer()

    useEffect(() => {
        ipcRenderer.on(handle, listener)

        return () => ipcRenderer.off(handle, listener)
    }, [ipcRenderer, handle, listener])
}