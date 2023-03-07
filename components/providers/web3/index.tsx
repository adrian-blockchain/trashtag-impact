import { createContext, FunctionComponent, useContext, useEffect, useState } from "react"
import { createDefaultState, createWeb3State, loadContract, Web3State } from "./utils";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { NftMarketContract } from "@_types/nftMarketContract";



const pageReload = () => { window.location.reload(); }

const handleAccount = (ethereum: MetaMaskInpageProvider) => async () => {
  const isLocked =  !(await ethereum._metamask.isUnlocked());
  if (isLocked) { pageReload(); }
}

const setGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
  ethereum.on("chainChanged", pageReload);
  ethereum.on("accountsChanged", handleAccount(ethereum));
}

const getNFTAvailable = async () =>{
  const contractJson = require('../../../contracts/abi/TrashtagMarketplace.json');
  const contractAddress = '0x262742b81464F303F2824C678ed68c44A89Fe8B7';
  const webProvider = await new ethers.providers.JsonRpcProvider('https://nd-286-883-760.p2pify.com/37a9e81ea19acde3eb37f5e9db138ffa');
  const signer =new ethers.Wallet('257da6b2c2b1abc70ba9e1bf406aeb0117d540ffaf3b696662e11283713c6d5e', webProvider);
  const contract = new ethers.Contract(contractAddress, contractJson, signer);

  const tx =await contract.getURIOf(contractAddress);
  console.log(tx);
  return tx;

}


const removeGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
  ethereum?.removeListener("chainChanged", pageReload);
  ethereum?.removeListener("accountsChanged", handleAccount);
}

const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent = ({children}) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

  useEffect(() => {
    async function initWeb3() {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any);
        const contract =  await loadContract("NftMarket", provider);

        const signer = provider.getSigner();
        const signedContract = contract.connect(signer);

        setTimeout(() => setGlobalListeners(window.ethereum), 500);
        setWeb3Api(createWeb3State({
          ethereum: window.ethereum,
          provider,
          contract: signedContract as unknown as NftMarketContract,
          isLoading: false
        }))
      } catch(e: any) {
        console.error("Please, install web3 wallet");
        setWeb3Api((api) => createWeb3State({
          ...api as any,
          isLoading: false,
        }))
      }
    }

    initWeb3();
    return () => removeGlobalListeners(window.ethereum);
  }, [])

  return (
    <Web3Context.Provider value={web3Api}>
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  return useContext(Web3Context);
}

export function useHooks() {
  const { hooks } = useWeb3();
  return hooks;
}

export default Web3Provider;


//Ledger implementation









