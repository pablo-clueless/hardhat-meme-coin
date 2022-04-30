import React from 'react'
import { Button, capitalize } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useSpring, animated } from 'react-spring'
import { Icon } from '@iconify/react'

const useStyles = makeStyles({
    modalContainer: {
        position: 'absolute',
        top: 100,
        left: '35%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        width: '30vw',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        wordBreak: 'break-word',
        backgroundColor: 'var(--light)',
        color: 'var(--base)',
        padding: '1rem 0.5rem',
    },
    error: {
        borderBottom: '5px solid var(--error)'
    },
    success: {
        borderBottom: '5px solid var(--success)'
    },
    content: {
        margin: '0.5rem 0',
        textTransform: 'capitalize',
    }
})

const AnimatedETH = animated(Icon)

const Modal = ({ type, content, clearError }) => {
    const classes = useStyles()

    const props = useSpring({
        from: { y: -5 },
        to: { y: 5 },
        loop: { reverse: true }
    })

    if(type === 'error') {
        return (
        <div className={classes.modalContainer}>
            <div className={`${classes.modal} ${classes.error}`}>
                <p className={classes.content}>{content.substring(0, 100)}</p>
                <Button variant='text' onClick={clearError}>
                    Clear
                </Button>
            </div>
        </div>
        )
    }

    // if(type === 'success') {
    //     return (
    //     <div className={classes.modalContainer}>
    //         <div className={`${classes.modal} ${classes.success}`}>
    //             <p>{content}</p>
    //         </div>
    //     </div>
    //     )
    // }

  return (
    <div className={classes.modalContainer}>
        <div className={classes.modal}>
            <animated.div style={props}>
                <Icon icon='logos:ethereum' style={{ fontSize: '1.5rem' }} />
            </animated.div>
            <p className={classes.content}>{content}</p>
        </div>
    </div>
  )
}

export default Modal