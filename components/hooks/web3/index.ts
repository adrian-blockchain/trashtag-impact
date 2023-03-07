import { useHooks } from "@providers/web3"
import {useState} from "react";
import WalletConnect from "@walletconnect/browser";


export const useAccount = () => {
  const hooks = useHooks();
  const swrRes = hooks.useAccount();

  return {
    account: swrRes
  }
}

const walletConnector = new WalletConnect({
  bridge: 'https://bridge.walletconnect.org' // Required
  // Other options

})




export const useNetwork = () => {
  const hooks = useHooks();
  const swrRes = hooks.useNetwork();

  return {
    network: swrRes
  }
}

export const useListedNfts = () => {
  const hooks = useHooks();
  const swrRes = hooks.useListedNfts();

  return {
    nfts: swrRes
  }
}

export const useOwnedNfts = () => {
  const hooks = useHooks();
  const swrRes = hooks.useOwnedNfts();

  return {
    nfts: swrRes
  }
}
