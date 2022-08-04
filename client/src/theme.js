import { createTheme } from '@mui/material'

export const theme = createTheme({
    typography: {
        fontFamily: 'var(--base-font)'
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '0.5rem 1rem',
                    borderRadius: '0px',
                    fontFamily: 'var(--bold-font)',
                },
                contained: {
                    backgroundColor: 'var(--base)',
                    color: 'var(--light)',
                    transition: '0.3s ease',
                    textTransform: 'capitalize',
                    '&:hover': {
                        transform: 'translateY(5px)',
                        backgroundColor: 'var(--base)',
                        color: 'var(--light)'
                    },
                    '@media screen and (max-width: 800px)': {
                        fontSize: '0.7rem'
                    }
                },
                outlined: {
                    backgroundColor: 'var(--success)',
                    color: 'var(--light)',
                    transition: '0.3s ease',
                    textTransform: 'capitalize',
                    borderColor: 'var(--success)',
                    '&:hover': {
                        backgroundColor: 'var(--success)',
                        color: 'var(--light)',
                        borderColor: 'var(--success)'
                    },
                    '@media screen and (max-width: 800px)': {
                        fontSize: '0.7rem'
                    }
                },
                text: {
                    backgroundColor: 'var(--error)',
                    color: 'var(--light)',
                    transition: '0.3s ease',
                    textTransform: 'capitalize',
                    borderColor: 'var(--error)',                    
                    marginTop: '0.5rem',
                    '&:hover': {
                        backgroundColor: 'var(--error)',
                        color: 'var(--light)',
                        borderColor: 'var(--error)',
                    },
                    '@media screen and (max-width: 800px)': {
                        fontSize: '0.7rem'
                    }
                }
            }
        }
    },
    palette: {
        text: {
            primary: '#262628',
            secondary: '#f78d6a',
            // alternate: '',
            error: '#F02525',
            success: '#12f14e'
        }
    }
})