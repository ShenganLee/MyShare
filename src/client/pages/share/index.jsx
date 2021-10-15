import { memo, useRef } from 'react'
import { AppBar, Container, Box, Paper, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useUploadTrriger } from './hooks'

const useStyles = makeStyles((theme) => ({
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
        backdropFilter: 'blur(20px)',
        boxShadow: `inset 0px -1px 1px ${theme.palette.grey[100]}`,

        height: '175px'
    },
    upload: {
        position: "relative",
        width: "100%",
        height: "100%",

        background: "#40a9ff",
        borderRadius: "2px",

        transition: "border-color .3s",

        textAlign: "center",
        color: "#fff",
        fontSize: "14px",

        padding: '16px 0',
        userSelect: 'none',
    },
    "upload-drag-icon": {
        fontSize: '48px',
        "& > span": {
            cursor: "pointer",
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


const Share = memo(() => {
    const input = useRef()
    const styles = useStyles()

    const handleClick = useUploadTrriger(input, (e) => {
        console.log(e.target.files)
    })

    // const handle

    return (
        <Box className={styles.root}>
            <header className={styles.header}>
                <Box className={styles.upload}>
                    <input
                        ref={input}
                        type="file"
                        accept='*'
                        multiple
                        // directory=""
                        // webkitdirectory=""
                        style={{ display: 'none' }}
                    />
                    <Box className={styles["upload-drag-icon"]}>
                        <span onClick={handleClick}>
                            <svg viewBox="0 0 1024 1024" focusable="false" data-icon="inbox" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                <path d="M885.2 446.3l-.2-.8-112.2-285.1c-5-16.1-19.9-27.2-36.8-27.2H281.2c-17 0-32.1 11.3-36.9 27.6L139.4 443l-.3.7-.2.8c-1.3 4.9-1.7 9.9-1 14.8-.1 1.6-.2 3.2-.2 4.8V830a60.9 60.9 0 0060.8 60.8h627.2c33.5 0 60.8-27.3 60.9-60.8V464.1c0-1.3 0-2.6-.1-3.7.4-4.9 0-9.6-1.3-14.1zm-295.8-43l-.3 15.7c-.8 44.9-31.8 75.1-77.1 75.1-22.1 0-41.1-7.1-54.8-20.6S436 441.2 435.6 419l-.3-15.7H229.5L309 210h399.2l81.7 193.3H589.4zm-375 76.8h157.3c24.3 57.1 76 90.8 140.4 90.8 33.7 0 65-9.4 90.3-27.2 22.2-15.6 39.5-37.4 50.7-63.6h156.5V814H214.4V480.1z" />
                            </svg>
                        </span>
                    </Box>
                    <Box component="p" className={styles["upload-text"]}>
                        单击或拖动文件
                    </Box>
                    <Box component="p" className={styles["upload-hint"]}>
                        支持粘贴操作
                    </Box>
                </Box>
            </header>
            <main>

            </main>
        </Box>
    )
})

export default Share