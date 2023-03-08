import { BaseLayout } from "@ui";
import {SetStateAction, useEffect, useState} from "react";
import {Range} from 'react-range';
import ImpactData from "@ui/ImpactData";
import {ethers} from "ethers";
import Link from "@ui/link";
const contractABI = require('../contracts/abi/Trashtag.json');


const ImpactGenerator = () => {
    const [plastic, setPlastic] = useState(false);
    const [paper, setPaper] = useState(false);
    const [aluminium, setAluminium] = useState(false);
    const [glass, setGlass] = useState(false);
    const [cigarettes, setCigarettes] = useState(false);


    const [plasticAvailable, setPlasticAvailable] = useState(0);
    const [paperAvailable, setPaperAvailable] = useState(0);
    const [aluminiumAvailable, setAluminiumAvailable] = useState(0);
    const [glassAvailable, setGlassAvailable] = useState(0);
    const [cigarettesAvailable, setCigarettesAvailable] = useState(0);

    const [plasticToBuy, setPlasticToBuy] = useState(0);
    const [paperToBuy, setPaperToBuy] = useState(0);
    const [aluminiumToBuy, setAluminiumToBuy] = useState(0);
    const [glassToBuy, setGlassToBuy] = useState(0);
    const [cigarettesToBuy, setCigarettesToBuy] = useState(0);



    const contractAddress = '0x0c37cF4B70d059A591D3cD00b880C6bcFFb627f8';
    const provider = new ethers.providers.JsonRpcProvider('https://nd-286-883-760.p2pify.com/37a9e81ea19acde3eb37f5e9db138ffa');


    const allWasteTypesFalse = !plastic && !paper && !aluminium && !glass && !cigarettes;


    useEffect(()=>{
        const fetchNFT = async ()=>{
            const contract = new ethers.Contract(contractAddress, contractABI, provider);
            const nftData = await contract.getURIOf(contractAddress);
            console.log(nftData);
            setPlasticAvailable(nftData[0].length);
            setGlassAvailable(nftData[1].length);
            setPaperAvailable(nftData[2].length);
            setCigarettesAvailable(nftData[3].length);
            setAluminiumAvailable(nftData[4].length);
        }
     fetchNFT();
    })

    async function buyTokens() {
        if(window.ethereum){
            await window.ethereum.request({ method: "eth_requestAccounts" });



            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            window.ethereum.enable()

            await provider.send('eth_requestAccounts', []); // <- this promps user to connect metamask
            const signer = provider.getSigner();
            const accounts= await signer.getAddress();

            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const price = cigarettesToBuy+plasticToBuy+glassToBuy+paperToBuy+aluminiumToBuy;
            //const gweiValue = ethers.utils.;
            alert(accounts);

            const overrides = {
                gasLimit: 900000000,
                value:ethers.utils.parseEther(price.toString())
            };

            const tx = await contract.buyTokens(
                plasticToBuy,
                glassToBuy,
                paperToBuy,
                cigarettesToBuy,
                aluminiumToBuy,
                accounts,
                overrides
            );

            await tx.wait();
        }


    }


    const handleClick = (wasteType: string) => {
        switch (wasteType) {
            case "plastic":
                if (plasticToBuy === plasticAvailable) {
                    setPlasticToBuy(0);
                    setPlastic(!plastic);

                } else {
                    setPlasticToBuy(plasticAvailable);
                    setPlastic(!plastic);
                }
                break;
            case "paper":
                if (paperToBuy === paperAvailable) {
                    setPaperToBuy(0);
                    setPaper(!paper);

                } else {
                    setPaperToBuy(paperAvailable);
                    setPaper(!paper);
                }
                break;
            case "aluminium":
                if (aluminiumToBuy === aluminiumAvailable) {
                    setAluminiumToBuy(0);
                    setAluminium(!aluminium);

                } else {
                    setAluminiumToBuy(aluminiumAvailable);
                    setAluminium(!aluminium);
                }
                break;
            case "glass":
                if (glassToBuy === glassAvailable) {
                    setGlassToBuy(0);
                    setGlass(!glass);

                } else {
                    setGlassToBuy(glassAvailable);
                    setGlass(!glass);
                }
                break;
            case "cigarettes":
                if (cigarettesToBuy === cigarettesAvailable) {
                    setCigarettesToBuy(0);
                    setCigarettes(!cigarettes);

                } else {
                    setCigarettesToBuy(cigarettesAvailable);
                    setCigarettes(!cigarettes);
                }
                break;
            default:
                break;
        }
    };


    return (
        <BaseLayout>
            <section className="bg-white py-16 tails-selected-element" contentEditable="true">
                <div className="mx-auto w-full px-10 sm:text-center text-black box-border">
                    <h2 className="font-sans text-5xl sm:text-6xl font-black text-black uppercase">
Waste Token                    </h2>
                    <h3 className="mb-1 font-sans text-xl font-black uppercase text-gray-500">
Invest in the global waste cleaning                    </h3>
                </div>
            </section>
                <div>
                    <h2 className="font-sans text-xl sm:text-xl font-black text-gray-600 justify-center items-center">
                        Select the type of waste you want to have an impact on.
                    </h2>
                    <div className="max-w-7xl px-5 py-20 flex space-x-5 w-full h-full justify-center mx-auto">
                        <div className="flex flex-col items-center">
                            <div className={`flex h-full w-full rounded-md ${plastic ? 'bg-green-400' : 'bg-gray-300'}`}>
                                <button onClick={() => handleClick("plastic")}><img src={'../../images/plastic.png'}/></button>
                            </div>
                            <span className="mt-2 text-center font-medium text-gray-600">Plastic</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className={`flex h-full w-full rounded-md ${paper ? 'bg-green-400' : 'bg-gray-300'}`}>
                                <button onClick={() => handleClick("paper")}><img src={'../../images/food-delivery.png'} width="500"/></button>
                            </div>
                            <span className="mt-2 text-center font-medium text-gray-600">Paper</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className={`flex h-full w-full rounded-md ${aluminium ? 'bg-green-400' : 'bg-gray-300'}`}>
                                <button onClick={() => handleClick("aluminium")}><img src={'../../images/can-red.png'}  width="500"/></button>
                            </div>
                            <span className="mt-2 text-center font-medium text-gray-600">Aluminium</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className={`flex h-full w-full rounded-md ${glass ? 'bg-green-400' : 'bg-gray-300'}`}>
                                <button onClick={() => handleClick("glass")}><img src={'../../images/glass-bottle.png'}/></button>
                            </div>
                            <span className="mt-2 text-center font-medium text-gray-600">Glass</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className={`flex h-full w-full rounded-md ${cigarettes ? 'bg-green-400' : 'bg-gray-300'}`}>
                                <button onClick={() => handleClick("cigarettes")}><img src={'../../images/cigarette-butt.png'}/></button>
                            </div>
                            <span className="mt-2 text-center font-medium text-gray-600">Cigarettes</span>
                        </div>


                </div>

                    <div className="flex space-x-2">

                        {allWasteTypesFalse ? null :
                            <div className="flex w-screen space-x-5 justify-center items-center">
                                <div className="col-end-2 w-1/2 bg-gray-200 h-80 mt-auto mb-auto p-5 rounded-md ">
                                    <div className="justify-center items-center mt-auto ">
                                        <ImpactData plastic={plasticToBuy} paper={paperToBuy} aluminium={aluminiumToBuy} glass={glassToBuy} cigarettes={cigarettesToBuy}/>
<span className="text-gray-500 font-light text-xs">All Impact trash calculations are based on the BEE platform developed by Citeo. The BEE platform provides reliable data on the environmental impact of waste management, including greenhouse gas emissions, energy consumption, and waste volume. By using the BEE platform, Impact trash ensures that its calculations are accurate and up-to-date, providing users with valuable information on the environmental impact of waste management practices.</span>
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-2 h-80 bg-gray-200 w-1/2 justify-center rounded-md p-5">
                                    {!plastic ? null: <div className="flex items-center ml-20 ">
                                        <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                                        <span className="text-gray-700">Plastic   <span className="text-gray-500">{plasticToBuy}</span></span>
                                    </div>}
                                    {!paper ? null:  <div className="flex items-center ml-20">
                                        <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                                        <span className="text-gray-700">Paper <span className="text-gray-500">{paperToBuy}</span></span>
                                    </div>}
                                    {!aluminium ? null:<div className="flex items-center ml-20">
                                        <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                                        <span className="text-gray-700">Aluminium <span className="text-gray-500">{aluminiumToBuy}</span></span>
                                    </div>}
                                    {!glass ? null:<div className="flex items-center ml-20">
                                        <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                                        <span className="text-gray-700">Glass <span className="text-gray-500">  {glassToBuy}</span></span>
                                    </div>}
                                    {!cigarettes ? null:<div className="flex items-center ml-20">
                                        <div className="h-3 w-3 rounded-full bg-indigo-500 mr-2"></div>
                                        <span className="text-gray-700">Cigarettes <span className="text-gray-500">{cigarettesToBuy}</span></span>
                                    </div>}
                                    <span className="text-gray-700 ml-auto mr-auto">Tokens to pay {cigarettesToBuy+plasticToBuy+glassToBuy+paperToBuy+aluminiumToBuy} $FTM </span>

                                    <button onClick={()=>buyTokens()}
                                       className="flex items-center justify-center px-10 w-1/4 py-5 mt-50 ml-auto mr-auto text-2xl font-medium text-white bg-green-500 rounded-full hover:bg-green-400 lg:mt-0 tails-selected-element"
                                       data-primary="green-500" data-rounded="rounded-full"
                                       contentEditable="true">Purchase</button>
                                    <Link href="https://testnet.ftmscan.com/address/0x0c37cF4B70d059A591D3cD00b880C6bcFFb627f8"   activeClass="activeClass">
                                        <a target="_blank" className="text-blue-700 ml-auto mr-auto">FTM block explorer</a>
                                    </Link>
                                </div>

                            </div>

                        }

                    </div>
                </div>






        </BaseLayout>
    );


}

export default ImpactGenerator;
