import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {getTypeString} from "../../utils/getTypeString";
import {NFTData, WasteToken} from "@_types/nft";
import Image from 'next/image';
import { BaseLayout } from '@ui';
import PictureCarousel from "@ui/nft/pictureCaroussel";
import DataTokenView from "@ui/nft/DataTokenView";

const TokenDetailsPage = () => {
    const router = useRouter();
    const { id, uri, owner } = router.query;
    const [data, setdata] = useState<WasteToken>();


    useEffect(()=>{
        const fetchFromIPFS = async () => {


                const res = await fetch(`https://ipfs.io/ipfs/${uri}`);
                const labelData = await res.json();
                const baseURI = labelData['base'];
                const base = await fetch(`https://ipfs.io/ipfs/${baseURI}`);
                const baseData = await base.json();


                const wasteData: WasteToken = {
                    info: {
                        id: Number(id),
                        owner: `${owner}`,
                        uri: `${uri}`,
                    },
                    index: labelData['index'],
                    type: getTypeString(labelData['type']),
                    exploration: baseData['exploration'],
                    wasteLoc: baseData['wasteLoc'],
                    wastePict: baseData['wasteImage'],
                    trashcanPict: baseData['trashcanImage'],
                    trashcanLoc: baseData['trashcanLoc'],
                };
                setdata(wasteData);



        };
        fetchFromIPFS();

    })




    return (
        <BaseLayout>
            <section className="w-full py-20 bg-gray-50 tails-selected-element" contentEditable="true">
                <div className="px-10 mx-auto max-w-7xl">
                    <div className="px-10 mb-8 space-y-5 lg:px-0 lg:text-center lg:mb-16">
                        <h2 className="text-4xl font-bold sm:text-5xl">Waste NFT</h2>
                        <p className="text-lg text-gray-600 w-ful sm:text-xl">Waste tokens hold the power to not only incentivize and reward environmentally-friendly behavior, but also to drive tangible impact by supporting waste reduction and clean-up initiatives worldwide.</p>
                    </div>
                    <div className="grid overflow-hidden lg:rounded-xl">
                        <div className="grid items-center lg:grid-cols-2">
                            <div
                                className="flex flex-col items-start justify-center h-full py-16 pl-16 pr-16 space-y-4 bg-white lg:pr-20 lg:py-0">
                                <h3 className="text-2xl font-semibold sm:text-4xl">{data?.type} #{data?.info.id}</h3>

                            </div>
                            <div className="overflow-hidden bg-gray-100 h-96">
                                <img
                                    src={data?.wastePict}
                                    className="object-cover w-full h-full" alt=""/>
                            </div>
                        </div>

                        <div className="grid items-center lg:grid-cols-2">
                            <div className="order-last overflow-hidden bg-gray-100 h-96 lg:order-first">
                                <img
                                    src={data?.trashcanPict}
                                    className="object-cover w-full h-full" alt=""/>
                            </div>
                            <div
                                className="flex flex-col items-start justify-center h-full py-16 pl-16 pr-16 space-y-4 bg-white lg:pr-20 lg:py-0">
                                <h3 className="text-2xl font-semibold sm:text-4xl">Trashcan pict</h3>

                            </div>
                        </div>

                        <div className="grid items-center lg:grid-cols-2">
                            <div
                                className="flex flex-col items-start justify-center h-full py-16 pl-16 pr-16 space-y-4 bg-white lg:pr-20 lg:py-0">
                                <h3 className="text-2xl font-semibold sm:text-4xl">Protect environment</h3>
                                <p className="text-lg text-gray-600">
                                    Don t let your waste harm the environment - take action today and join the movement to keep our planet clean and healthy for generations to come.
                                </p>
                            </div>
                            <div className="bg-gray-100 h-96">
                                <img
                                    src="https://cdn.pixabay.com/photo/2020/02/17/06/00/pollution-4855507_960_720.jpg"
                                    className="object-cover w-full h-full" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </BaseLayout>
    );
};

export default TokenDetailsPage;

//   <img src={tokenData.wastePict} alt={`Waste Token #${tokenData.index}`} />
