import { BaseLayout } from "@ui";
import {SetStateAction, useEffect, useState} from "react";
import {Range} from 'react-range';
import ImpactData from "@ui/ImpactData";
import {ethers} from "ethers";
const contractABI = require('../contracts/abi/TrashtagMarketplace.json');


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


    const [values, setValues] = useState([0]);
    const [max, setMax] = useState(0);
    const contractAddress = '0x262742b81464F303F2824C678ed68c44A89Fe8B7';
    const provider = new ethers.providers.JsonRpcProvider('https://nd-286-883-760.p2pify.com/37a9e81ea19acde3eb37f5e9db138ffa');

    const handleValuesChange = (newValues: number[]) => {
        if (newValues[newValues.length-2]>newValues[length-1]) {
            // If any value is negative, decrement the corresponding state variables
            if (plastic && plasticToBuy > 0) {
                setPlasticToBuy(plasticToBuy - newValues[newValues.length - 1]);
            } else if (paper && paperToBuy > 0) {
                setPaperToBuy(paperToBuy - newValues[newValues.length - 1]);
            } else if (aluminium && aluminiumToBuy > 0) {
                setAluminiumToBuy(aluminiumToBuy - newValues[newValues.length - 1]);
            } else if (glass && glassToBuy > 0) {
                setGlassToBuy(glassToBuy - newValues[newValues.length - 1]);
            } else if (cigarettes && cigarettesToBuy > 0) {
                setCigarettesToBuy(cigarettesToBuy - newValues[newValues.length - 1]);
            }
            return;
        }

        if (plastic && plasticToBuy + newValues[newValues.length - 1] <= plasticAvailable) {
            setPlasticToBuy(plasticToBuy + newValues[newValues.length - 1]);
        } else if (paper && paperToBuy + newValues[newValues.length - 1] <= paperAvailable) {
            setPaperToBuy(paperToBuy + newValues[newValues.length - 1]);
        } else if (aluminium && aluminiumToBuy + newValues[newValues.length - 1] <= aluminiumAvailable) {
            setAluminiumToBuy(aluminiumToBuy + newValues[newValues.length - 1]);
        } else if (glass && glassToBuy + newValues[newValues.length - 1] <= glassAvailable) {
            setGlassToBuy(glassToBuy + newValues[newValues.length - 1]);
        } else if (cigarettes && cigarettesToBuy + newValues[newValues.length - 1] <= cigarettesAvailable) {
            setCigarettesToBuy(cigarettesToBuy + newValues[newValues.length - 1]);
        }

        setValues(newValues);
    };

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


    const handleClick = (wasteType: any) => {
        switch (wasteType) {
            case "plastic":
                setMax(max+plasticAvailable)
                setPlastic(!plastic);

                break;
            case "paper":
                setMax(max+paperAvailable)

                setPaper(!paper);
                break;
            case "aluminium":
                setMax(max+aluminiumAvailable)

                setAluminium(!aluminium);
                break;
            case "glass":
                setMax(max+glassAvailable)

                setGlass(!glass);
                break;
            case "cigarettes":
                setMax(max+cigarettesAvailable)

                setCigarettes(!cigarettes);
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
                            <div className="flex w-screen space-x-5">
                                <div className="col-end-2 w-1/2 bg-gray-200 h-80 mt-auto mb-auto p-5 rounded-md justify-center items-center">
                                    <div className="flex justify-center items-center mb-10">
                                        <Range
                                            values={values}
                                            step={1}
                                            min={0}
                                            max={max}
                                            onChange={handleValuesChange}
                                            renderTrack={({props, children}) => (
                                                <div
                                                    {...props}
                                                    style={{
                                                        ...props.style,
                                                        height: '6px',
                                                        width: '100%',
                                                        backgroundColor: '#ddd',
                                                        borderRadius: '4px',
                                                    }}
                                                >
                                                    {children}
                                                </div>
                                            )}
                                            renderThumb={({props}) => (
                                                <div
                                                    {...props}
                                                    style={{
                                                        ...props.style,
                                                        height: '16px',
                                                        width: '16px',
                                                        backgroundColor: '#aaa',
                                                        borderRadius: '50%',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            height: '8px',
                                                            width: '8px',
                                                            backgroundColor: '#fff',
                                                            borderRadius: '50%',
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        />
                                        <p style={{margin: '10px', fontSize: '18px'}}>{values[0]}</p>

                                    </div>
                                    <div className="justify-center items-center">
                                        <ImpactData plastic={plasticToBuy} paper={paperToBuy} aluminium={aluminiumToBuy} glass={glassToBuy} cigarettes={cigarettesToBuy}/>

                                    </div>
                                </div>

                                <div className="flex flex-col space-y-2 h-80 bg-gray-200 w-1/2 justify-center rounded-md p-5">
                                    {!plastic ? null: <div className="flex items-center ml-20 ">
                                        <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                                        <span className="text-gray-700">Plastic   {plasticToBuy}/{plasticAvailable}</span>
                                    </div>}
                                    {!paper ? null:  <div className="flex items-center ml-20">
                                        <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                                        <span className="text-gray-700">Paper {paperToBuy}/{paperAvailable}</span>
                                    </div>}
                                    {!aluminium ? null:<div className="flex items-center ml-20">
                                        <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                                        <span className="text-gray-700">Aluminium {aluminiumToBuy}/{aluminiumAvailable} </span>
                                    </div>}
                                    {!glass ? null:<div className="flex items-center ml-20">
                                        <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                                        <span className="text-gray-700">Glass {glassToBuy}/{glassAvailable}</span>
                                    </div>}
                                    {!cigarettes ? null:<div className="flex items-center ml-20">
                                        <div className="h-3 w-3 rounded-full bg-indigo-500 mr-2"></div>
                                        <span className="text-gray-700">Cigarettes {cigarettesToBuy}/{cigarettesAvailable}</span>
                                    </div>}
                                    <a href="#_"
                                       className="flex items-center justify-center px-10 w-1/4 py-5 mt-50 ml-auto mr-auto text-2xl font-medium text-white bg-green-500 rounded-full hover:bg-green-400 lg:mt-0 tails-selected-element"
                                       data-primary="green-500" data-rounded="rounded-full"
                                       contentEditable="true">Purchase</a>
                                </div>

                            </div>

                        }

                    </div>
                </div>




        </BaseLayout>
    );


}

export default ImpactGenerator;
