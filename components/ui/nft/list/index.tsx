import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { WasteToken } from "@_types/nft";
import * as queryString from "querystring";
import Link from "@ui/link";

interface Props {
    wasteTokens: WasteToken[];
}

const WasteTokenGrid: React.FC<Props> = ({ wasteTokens }) => {
    const [displayTokens, setDisplayTokens] = useState<WasteToken[]>([]);
    const router = useRouter();

    useEffect(() => {
        setDisplayTokens(wasteTokens);
    }, [wasteTokens]);



    return (
        <div className="grid grid-cols-3 gap-4">
            {displayTokens.map((token) => (

                <Link
                    key={token.index}
                    href={`/nft/$?id=${token.info.id}&uri=${token.info.uri}&owner=${token.info.owner}`}
                    activeClass="active"
                >
                    <div className="bg-gray-200 p-4 rounded-md">
                        <img src={token.wastePict} alt={`Waste Token #${token.index}`} className="w-full rounded-md mb-4" />
                        <p className="font-bold text-lg text-black mb-2">{token.type}</p>
                        <p className="text-gray-700 mb-2">Owner: {token.info.owner}</p>
                        <p className="text-gray-700 mb-2">{token.info.id}</p>
                    </div>
                </Link>


            ))}
        </div>

    );
};

export default WasteTokenGrid;
