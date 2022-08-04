import React from 'react'
import { Button, TextField } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles'

const useStyles = makeStyles(theme =>createStyles({
  formControl: {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0.5rem 2rem',
  },
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        height: '50px',
        color: 'var(--base)',
        borderColor: 'var(--base)',
        borderRadius: '0',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--dark)'
      }
    },
    '& .MuiFormLabel-root': {
      color: 'var(--base)',
      '&.MuiFormLabel-root.Mui-focused': {
        color: 'var(--dark)'
      }
    }
  }
}))

const InputField = ({ type, label, name, value, onChange, placeholder }) => {
  const classes = useStyles()

  return (
    <div className={classes.formControl}>
        <TextField fullWidth type={type} label={label} name={name} value={value} onChange={onChange} placeholder={placeholder} size='small' classes={{ root: classes.root }} />
    </div>
  )
}

export default InputField