/* eslint-disable @next/next/no-img-element */

import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import ActiveLink from '../link';
import Walletbar from './Walletbar';
import {useEffect, useState} from "react";
import Web3 from 'web3';
import {ethers} from "ethers";
import {getBalanceChanges} from "xrpl";

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Waste', href: '/NFTs', current: false },
  { name: 'Impact generator', href: '/ImpactGenerator', current: false }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {


  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('0');
  useEffect(() => {
    async function connectToWallet() {

      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          // @ts-ignore
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const accounts = await signer.getAddress();
          setAddress(accounts);
          const balance = await provider.getBalance(accounts);
          setBalance(ethers.utils.formatEther(balance));
        } catch (error) {
          console.error(error);
        }
      }
    }
    connectToWallet();
  }, []);


  const handleConnectFantomTestnet = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xfa2",
            chainName: "Fantom Testnet",
            rpcUrls: ["https://rpc.testnet.fantom.network/"],
            nativeCurrency: {
              name: "Fantom",
              symbol: "FTM",
              decimals: 18,
            },
            blockExplorerUrls: ["https://explorer.testnet.fantom.network/"],
          },
        ],
      });

      const provider = new ethers.providers.JsonRpcProvider(
          "https://rpc.testnet.fantom.network/"
      );
      await provider.getNetwork();
      const signer = provider.getSigner();
      const accounts = await signer.getAddress();
      setAddress(accounts);
      const balance = await provider.getBalance(accounts);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu butt*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="hidden lg:block h-10 w-auto"
                    src="/images/img.png"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <ActiveLink
                        key={item.name}
                        href={item.href}
                        activeClass="bg-gray-900 text-white"
                      >
                        <a
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      </ActiveLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="text-gray-300 self-center mr-2">

                    {address && (
                        <ul>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800 mr-5">{address}</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800 mr-5">{balance} FTM</span>
                        </ul>
                    )}
                    {!address && (
                        <ul>
                          <button onClick={handleConnectFantomTestnet} className="inline-flex items-center px-2.5 py-2 rounded-md text-sm font-medium bg-green-100 text-green-800 mr-5">
                            Connect to Fantom Testnet
                          </button>
                        </ul>
                    )}

                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
