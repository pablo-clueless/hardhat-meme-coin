import React from 'react'
import { Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) =>( {
    section: {
        width: '100%',
        backgroundColor: 'var(--dark)',
        textAlign: 'center',
        padding: '2.5rem 1rem',
        letterSpacing: '1px',
    },
    title: {
        color: 'var(--base)',
        fontSize: '3rem',
        margin: '1rem 0',
        '@media screen and (max-width: 600px)': {
            fontSize: '2rem'
        }
    },
    subtitle: {
        color: 'var(--base)',
        fontSize: '1.2rem',
        margin: '0.5rem 0',
        '@media screen and (max-width: 600px)': {
            fontSize: '0.6rem'
        }
    }
}))

const InfoSection = ({ tokenName, tokenSymbol, totalSupply, tokenOwner, contractAddress, yourWalletAddress }) => {
    const classes = useStyles()

  return (
    <section className={classes.section}>
        <h1 className={classes.title}>
            {tokenName}
        </h1>
        <h3 className={classes.subtitle}>
            ${tokenSymbol}
        </h3>
        <h3 className={classes.subtitle}>
            Total Supply: {totalSupply}
        </h3>
        <p className={classes.subtitle}>
            Owner: {tokenOwner?.toLowerCase()}
        </p>
        <p className={classes.subtitle}>
            Contract Address: {contractAddress?.toLowerCase()}
        </p>
        <p className={classes.subtitle}>
            Your Wallet Address: {yourWalletAddress?.toLowerCase()}
        </p>
    </section>
  )
}

export default InfoSection