import { useState, useCallback } from 'react'
import { makeStyles } from '@mui/styles';

import { useMemory, useIpcRenderer, useIpcListener } from '@/util'

export const stop = e => {
    e.preventDefault();
    e.stopPropagation();
}
export const useShare = () => {
    const actions = useMemory()

    actions.ipcRenderer = useIpcRenderer()

    actions.addResource = useCallback((resource) => {
        
    }, [])

    actions.deleteResource = useCallback((resource) => {

    }, [])

    actions.handleOpenDirectory = useCallback(() => {
        actions.ipcRenderer.send('open-file')
    }, [actions])

    useIpcListener('resource-monitor', (...args) => {
        console.log('resource-monitor', args)
    })

    const [isDrag, setIsDrag] = useState(false)
    actions.isDrag = isDrag

    actions.handleDragEnter = useCallback((e) => {
        stop(e)
        setIsDrag(true)
    }, [])

    actions.hadleDragLeave = useCallback(e => {
        stop(e)
        setIsDrag(false)
    }, [])

    actions.handleDrop = useCallback(e => {
        actions.hadleDragLeave(e)
        if (e.dataTransfer.files && e.dataTransfer.files.length) {
            const filePaths = e.dataTransfer.files.map(file => file.file)
            actions.ipcRenderer('add-resource', filePaths)
        }
        
    }, [actions])

    actions.handlePaste = useCallback(e => {
        if (e.metaKey && e.key === 'v') {
            stop(e)
            actions.ipcRenderer.send('paste-data')
        }
    }, [actions])

    return actions
}

export const useStyles = makeStyles((theme) => ({
    root: {
        width: '100vw',
        height: '100vh',
        minWidth: '375px',
        minHeight: '375px'
    },
    header: {
        position: 'sticky',
        top: 0,
        transition: theme.transitions.create('top'),
        zIndex: theme.zIndex.appBar,
        height: '175px',
    },
    "header-drag": {
        position: "absolute",
        top: 0,
        left: 0,
        width: '100%',
        height: '30px',
        "-webkit-app-region": "drag",
    },
    upload: {
        position: "relative",
        width: "100%",
        height: "100%",

        background: "#40a9ff",

        textAlign: "center",
        color: "#fff",
        fontSize: "14px",

        padding: '24px 0 16px 0',
        userSelect: 'none',
        outline: 0,

        borderBottomLeftRadius: (props) => props.isDrag ? 200 : 0,
        borderBottomRightRadius: (props) => props.isDrag ? 200 : 0,

        transition: "border-bottom-left-radius .6s,border-bottom-right-radius .6s",

        "& > span": {
            display: "block",
            pointerEvents: (props) => props.isDrag ? "none" : "auto",
        }
    },
    "upload-drag-icon": {
        fontSize: '48px',
        "& > span": {
            cursor: "pointer",
            "-webkit-app-region": "no-drag",
        }
    },
    "upload-text": {
        margin: "0 0 4px",
        fontSize: "16px"
    },
    "upload-hint": {
        "fontSize": "14px",
    }
}))