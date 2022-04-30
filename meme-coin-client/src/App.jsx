import React, { useEffect, useState } from 'react'
import { ethers, utils } from 'ethers'
import { Stack, ThemeProvider } from '@mui/material'
import { makeStyles } from '@mui/styles'

import abi from './contract/MemeCoin.json'
import { theme } from './theme'
import { Buttons, InfoSection, InputField, Modal, Navbar } from './components'

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '1rem 0',
    margin: '1rem 0'
  }
})

const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [inputValue, setInputValue] = useState(({ walletAddress: '', transferAmount: '', burnAmount: '', mintAmount: '' }))
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [tokenTotalSupply, setTokenTotalSupply] = useState(0)
  const [isTokenOwner, setIsTokenOwner] = useState(false)
  const [tokenOwnerAddress, setTokenOwnerAddress] = useState(null)
  const [yourWalletAddress, setYourWalletAddress] = useState(null)
  const [error, setError] = useState(null)

  //tranasctions
  const [transacting, setTransacting] = useState({ transfering: false, burning: false, minting: false })

  const { transfering, burning, minting } = transacting

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
  const contractABI = abi.abi

  const { burnAmount, mintAmount, transferAmount, walletAddress } = inputValue

  const checkIfWalletisConnected = async () => {
    try {
      if(window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const account = accounts[0]
        setIsWalletConnected(true)
        setYourWalletAddress(account)

      } else {
        setError('Please install a MetaMask wallet to get token.')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const getTokenInfo = async () => {
    try {
      if(window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const tokenContract = new ethers.Contract(contractAddress, contractABI, signer)
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts'})

        let tokenName = await tokenContract.name()
        let tokenSymbol = await tokenContract.symbol()
        let tokenOwner = await tokenContract.owner()
        let tokenSupply = await tokenContract.totalSupply()
        tokenSupply = utils.formatEther(tokenSupply)

        setTokenName(`${tokenName} 🦊`)
        setTokenSymbol(tokenSymbol)
        setTokenTotalSupply(tokenSupply)
        setTokenOwnerAddress(tokenOwner)

        if(account ===  tokenOwner.toLowerCase()) {
          setIsTokenOwner(true)
        }
      } else {
        setError('Please install a MetaMask wallet to get token.')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  // console.log(isTokenOwner)
  const transferToken = async (e) => {
    e.preventDefault()

    if(!walletAddress || !transferAmount) return alert('Please enter valid values!')

    if(transferAmount > 500) return alert('Max transferable is 500 PBC!')
    
    try {
      if(window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const tokenContract = new ethers.Contract(contractAddress, contractABI, signer)

        const txn = await tokenContract.transfer(walletAddress, utils.parseEther(transferAmount))
        setTransacting(initialState => ({ ...initialState, transfering: true }))
        await txn.wait()
        setTransacting(initialState => ({ ...initialState, transfering: false }))

        setInputValue(initialState => ({ ...initialState, walletAddress: '', transferAmount: '' }))

        let tokenSupply = await tokenContract.totalSupply()
        tokenSupply = utils.formatEther(tokenSupply)
        setTokenTotalSupply(tokenTotalSupply)
      } else {
        setError('Please install a MetaMask wallet to get token.')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const burnToken = async (e) => {
    e.preventDefault()

    if(!burnAmount) return alert('Please enter valid values!')

    try {
      if(window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const tokenContract = new ethers.Contract(contractAddress, contractABI, signer)

        const txn = await tokenContract.burn(utils.parseEther(burnAmount))
        setTransacting(initialState => ({...initialState, burning: true }))
        await txn.wait()
        setTransacting(initialState => ({...initialState, burning: false }))

        setInputValue(initialState => ({ ...initialState, burnAmount: '' }))

        let tokenSupply = await tokenContract.totalSupply()
        tokenSupply = utils.formatEther(tokenSupply)
        setTokenTotalSupply(tokenSupply)
      } else {
        setError('Please install a MetaMask wallet to get token.')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const mintToken = async (e) => {
    e.preventDefault()

    if(!mintAmount) return alert('Please enter valid values!')
    
    try {
      if(window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const tokenContract = new ethers.Contract(contractAddress, contractABI, signer)
        let tokenOwner = await tokenContract.owner()

        const txn = await tokenContract.mint(tokenOwner, utils.parseEther(mintAmount))
        setTransacting(initialState => ({...initialState, minting: true }))
        await txn.wait()
        setTransacting(initialState => ({...initialState, minting: false }))

        setInputValue(initialState => ({ ...initialState, mintAmount: '' }))

        let tokenSupply = await tokenContract.totalSupply()
        tokenSupply = utils.formatEther(tokenSupply)
        setTokenTotalSupply(tokenSupply)
      } else {
        setError('Please install a MetaMask wallet to get token.')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const handleInputChange = (e) => {
    setInputValue(initialState => ({ ...initialState, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    checkIfWalletisConnected()
    getTokenInfo()
  },[checkIfWalletisConnected])

  const clearError = () => setError(null)

  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      {transfering && <Modal content='Transfering tokens.' />}
      {burning && <Modal content='Burning tokens.' />}
      {minting && <Modal content='Minting tokens.' />}
      {error && <Modal type='error' content={error} clearError={clearError} />}

      <Navbar isWalletConnected={isWalletConnected} />

      <Stack direction='column' alignItems='center' justifyContent='center'>
        <InfoSection tokenName={tokenName} tokenSymbol={tokenSymbol} totalSupply={tokenTotalSupply} tokenOwner={tokenOwnerAddress} contractAddress={contractAddress} yourWalletAddress={yourWalletAddress} />

        {/* transfer token */}
        <form onSubmit={transferToken} className={classes.form}>
          <InputField type='text' name='walletAddress' label='Wallet Address'  value={walletAddress} onChange={handleInputChange} placeholder='Enter Wallet Address' />
          <InputField type='text' name='transferAmount' label='Transfer Amount' value={transferAmount} onChange={handleInputChange} placeholder='0.00 PBC' />
          <Buttons type='submit' text='Transfer Token' />
        </form>

        {/* burn token */}
        <form onSubmit={burnToken} className={classes.form}>
          <InputField type='text' name='burnAmount' label='Burn Amount' value={burnAmount} onChange={handleInputChange} placeholder='0.00 PBC' />
          <Buttons type='submit' text='Burn Token' />
        </form>

        {/* mint more token */}
        {isTokenOwner && (
          <form onSubmit={mintToken} className={classes.form}>
            <InputField type='text' name='mintAmount' label='Mint Token' value={mintAmount} onChange={handleInputChange} placeholder='0.00 PBC' />
            <Buttons type='submit' text='Mint Token' />
          </form>
        )}
      </Stack>
    </ThemeProvider>
  )
}

export default App