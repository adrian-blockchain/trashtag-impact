import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {any} from "prop-types";
import {BaseLayout} from "@ui";
import {useWeb3} from "@providers/web3";
const contractABI = require('../contracts/abi/Trashtag.json');
import {create} from 'ipfs-http-client';
import {toast} from "react-toastify";
import {NFTData, WasteToken} from "@_types/nft";
import WasteTokenGrid from "@ui/nft/list";
import TitleSection from "@ui/nft/list/TitleSection";
import {getTypeString} from "../utils/getTypeString";

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });




const NFTs = () => {
    const [plastic, setPlastic] = useState<WasteToken[]>([]);
    const [glass, setGlass] = useState<WasteToken[]>([]);
    const [paper, setPaper] = useState<WasteToken[]>([]);
    const [cigaretts, setCigaretts] = useState<WasteToken[]>([]);
    const [aluminium, setAluminium] = useState<WasteToken[]>([]);

    const [currentType, setCurrentType] = useState(-1);
    const [test, setTest] = useState('Loading');

    const contractAddress = '0x0c37cF4B70d059A591D3cD00b880C6bcFFb627f8';
    const provider = new ethers.providers.JsonRpcProvider('https://nd-286-883-760.p2pify.com/37a9e81ea19acde3eb37f5e9db138ffa');



    useEffect(() => {
        const fetchNFTs = async () => {
            const contract = new ethers.Contract(contractAddress, contractABI, provider);
            const nftData = await contract.getURIOf(contractAddress);

            const plasticData = nftData[0].toString().split(',');
            const paperData = nftData[1].toString().split(',');
            const glassData = nftData[2].toString().split(',');
            const cigarettsData = nftData[3].toString().split(',');
            const aluminiumData = nftData[4].toString().split(',');
            console.log(plasticData);


            const plasticArray: NFTData[] = createNFTArray(plasticData);
            const glassArray: NFTData[] = createNFTArray(glassData);
            console.log(glassArray);

            const paperArray: NFTData[] = createNFTArray(paperData);
            const cigarettsArray: NFTData[] = createNFTArray(cigarettsData);
            const aluminiumArray: NFTData[] = createNFTArray(aluminiumData);

             getDataFromArray(plasticArray);
            //setPlastic(plasticTokens);
            //console.log(plastic)

            getDataFromArray(glassArray);


             getDataFromArray(paperArray);

            getDataFromArray(cigarettsArray);

             getDataFromArray(aluminiumArray);


    }
        fetchNFTs();
    }, []);

const createNFTArray = (data:any)=> {
    const nftObjects: NFTData[] = [];

    for (let i = 0; i < data.length; i += 3) {
        const nftObject:NFTData = {
            id: data[i],
            uri: data[i + 1],
            owner: data[i + 2],
        };

            nftObjects.push(nftObject);

    }

    return nftObjects
}

const getDataFromArray =  async (data:NFTData[]): Promise<WasteToken[]>=> {
    const dataArray:WasteToken[] = [];
        for (let i = 0; i < data.length; i++) {
            if(data[i].uri.slice(0,3) == "baf"){

                let tokenData:WasteToken | null = await fetchFromIPFS(data[i]);
                if (tokenData) {
                    dataArray.push(tokenData);
                } else {
                    console.warn(`Error fetching token data for NFT with ID ${data[i].id}`);
                }

            }
        }
    return dataArray;
}

    const fetchFromIPFS = async (tokenData: NFTData): Promise<WasteToken | null> => {
        try {
            const res = await fetch(`https://ipfs.io/ipfs/${tokenData.uri}`);
            const labelData = await res.json();
            const baseURI = labelData['base'];
            const base = await fetch(`https://ipfs.io/ipfs/${baseURI}`);
            const baseData = await base.json();



            const wasteData: WasteToken = {
                info: {
                    id: tokenData.id,
                    owner: tokenData.owner,
                    uri: tokenData.uri,
                },
                index: labelData['index'],
                type: getTypeString(labelData['type']),
                exploration: baseData['exploration'],
                wasteLoc: baseData['wasteLoc'],
                wastePict: baseData['wasteImage'],
                trashcanPict: baseData['trashcanImage'],
                trashcanLoc: baseData['trashcanLoc'],
            };
            updatePlasticData(wasteData);

            return wasteData;
        } catch (error) {
            console.error('Error fetching from IPFS:', error);
            return null;
        }
    };



    const updatePlasticData = ( newData: WasteToken) => {
        switch (newData.type) {
            case 'plastic':
                if (plastic.indexOf(newData) ===-1) {
                    setPlastic((prevData) => [...prevData, newData]);
                }
                break;
            case 'glass':
                if (glass.indexOf(newData) ===-1) {
                    setGlass((prevData) => [...prevData, newData]);
                }
                break;
            case 'paper':
                if (paper.indexOf(newData) ===-1) {
                    setPaper((prevData) => [...prevData, newData]);
                }
                break;
            case 'cigarettes':
                if (cigaretts.indexOf(newData) ===-1) {
                    setCigaretts((prevData) => [...prevData, newData]);
                }
                break;
            case 'aluminium':
                if (aluminium.indexOf(newData) ===-1) {
                    setAluminium((prevData) => [...prevData, newData]);
                }
                break;
            default:
                break;
        }
    };
    return (
        <BaseLayout>
            <div>
                <TitleSection type={'Plastic'} length={plastic.length} />
                <WasteTokenGrid wasteTokens={plastic}/>

                <TitleSection type={'Paper'} length={paper.length} />
                <WasteTokenGrid wasteTokens={paper}/>

                <TitleSection type={'Glass'} length={glass.length} />
                <WasteTokenGrid wasteTokens={glass}/>


                <TitleSection type={'Cigarettes'} length={cigaretts.length} />
                <WasteTokenGrid wasteTokens={cigaretts}/>

                <TitleSection type={'Aluminium'} length={aluminium.length} />
                <WasteTokenGrid wasteTokens={aluminium}/>

            </div>

        </BaseLayout>


    );
};

export default NFTs;

