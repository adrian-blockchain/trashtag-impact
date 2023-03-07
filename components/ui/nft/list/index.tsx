import { useEffect, useState } from 'react';
import {WasteToken} from "@_types/nft";

interface Props {
  wasteTokens: WasteToken[];
}

const WasteTokenGrid: React.FC<Props> = ({ wasteTokens }) => {
  const [displayTokens, setDisplayTokens] = useState<WasteToken[]>([]);

  useEffect(() => {
    setDisplayTokens(wasteTokens);
  }, [wasteTokens]);

  return (
      <div className="grid grid-cols-3 gap-4">
        {displayTokens.map((token) => (
            <div key={token.info.id} className="bg-gray-200 p-4 rounded-md">
              <img src={token.wastePict} alt={`Waste Token #${token.index}`} className="w-full rounded-md mb-4" />
              <p className="font-bold text-lg mb-2">{token.type}</p>
              <p className="text-gray-700 mb-2">Owner: {token.info.owner}</p>
              <p className="text-gray-700 mb-2">{token.info.id}</p>
            </div>
        ))}
      </div>
  );
};

export default WasteTokenGrid;
