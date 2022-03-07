import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type PhantomEvent = 'disconnect' | 'connect'

interface ConnectOpts {
  onlyIfTrusted: boolean
}

interface PhantomProvider {
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>
  disconnect: () => Promise<void>
  on: (event: PhantomEvent, callback: (args: any) => void) => void
  isPhantom: boolean
}

type WindowWithSolana = Window & {
  solana?: PhantomProvider
}

const connect2Phantom: React.FC = () => {
  const [walletExist, setWalletExist] = useState(false)
  const [provider, setProvider] = useState<PhantomProvider | null>(null)
  const [connected, setConnected] = useState(false)
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null)

  useEffect(() => {
    const solWindow = window as WindowWithSolana
    const { solana } = solWindow
    if (solana && solana.isPhantom) {
      setProvider(solana)
      setWalletExist(true)
    }
  }, [])

  useEffect(() => {
    provider?.on('connect', (publicKey: PublicKey) => {
      setConnected(true)
      setPublicKey(publicKey)
    })
    provider?.on('disconnect', () => {
      setConnected(false)
      setPublicKey(null)
    })
  }, [provider])

  const handleConnect: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    try {
      if (walletExist) {
        toast('Connecting Wallet')
        await provider?.connect()
        console.log('Connected with: ' + publicKey?.toString())
      } else {
        toast('Get a Phantom Wallet to dive into web3 🦄')
      }
    } catch (error) {
      toast('Error connecting Wallet :(')
    }
  }

  const handleDisconnect: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    try {
      await provider?.disconnect()
    } catch (error) {
      toast('Error disconnecting Wallet :(')
    }
  }

  return (
    <div>
      {connected ? (
        <button onClick={handleDisconnect}>Disconnect Wallet</button>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
    </div>
  )
}