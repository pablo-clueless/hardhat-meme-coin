import React from 'react'
import { makeStyles } from '@mui/styles'

import { Spinner } from '../assets'

const Modal = ({type, content, onClear}) => {
    const classes = useStyles()

    if(type === 'error') {
        return (
            <div className={classes.modalContainer}>
                <div className={classes.modal}>
                    <p>{content}</p>
                    <button type='button' onClick={onClear} className={classes.button}>
                        Ok
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={classes.modalContainer}>
            <div className={classes.modal}>
                <p>{content}</p>
                <Spinner />
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    modalContainer: {
        width: '100vw',
        minHeight: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'grid',
        placeItems: 'center',
        backdropFilter: 'blur(2px)',
        zIndex: 5,
    },
    modal: {
        width: 280,
        height: 150,
        background: 'var(--light)',
        borderRadius: 5,
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        padding: '0 0.25rem',
    },
    button: {
        padding: '0.5rem 1rem',
        outline: 'none',
        border: 'none',
        background: 'var(--base)',
        color: 'var(--light)',
        cursor: 'pointer',
    },
})

export default Modal