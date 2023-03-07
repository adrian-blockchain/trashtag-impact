import { FaRecycle, FaFileAlt, FaCubes, FaGlassCheers, FaSmoking, FaStopwatch } from 'react-icons/fa';

const ImpactData = ({ plastic, paper, aluminium, glass, cigarettes }: { plastic: number, paper: number, aluminium: number, glass: number, cigarettes: number }) => {

    const weight = (plastic*3+ paper*40+ glass*415 + aluminium*23.08+cigarettes*0.22).toFixed(2);
    const co2 = (plastic*89.04+ paper*35.02+ glass*322 + aluminium*184+cigarettes*5.72).toFixed(2)
    const air = (plastic*0.22+ paper*0.15+ glass*2.03 + aluminium*1.09+cigarettes*0.03).toFixed(2)
    const energy = (plastic*1.54+ paper*0.93+ glass*4.87 + aluminium*3.76+cigarettes*0.08).toFixed(2)
    const water = (plastic*174+ paper*293+ glass*1762 + aluminium*678+cigarettes*513).toFixed(2)
    const eutrophisation = (plastic*0.04+ paper*0.03+ glass*0.21 + aluminium*2.84+cigarettes*0).toFixed(2)

    return (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-lg bg-blue-500 text-white flex items-center justify-center mb-2">
                    <FaRecycle />
                </div>
                <div className="text-sm font-medium text-gray-900">{weight}<br/>(g)</div>
                <div className="text-sm font-medium text-gray-500">Average weight</div>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-lg bg-blue-500 text-white flex items-center justify-center mb-2">
                    <FaFileAlt />
                </div>
                <div className="text-sm font-medium text-gray-900">{co2} <br/>(g, EQ CO2)</div>
                <div className="text-sm font-medium text-gray-500">Greenhouse effect contribution</div>

            </div>
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-lg bg-blue-500 text-white flex items-center justify-center mb-2">
                    <FaCubes />
                </div>
                <div className="text-sm font-medium text-gray-900">{air} <br/>(mmol Ed H+)</div>
                <div className="text-sm font-medium text-gray-500">Air acidification</div>

            </div>
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-lg bg-blue-500 text-white flex items-center justify-center mb-2">
                    <FaGlassCheers />
                </div>
                <div className="text-sm font-medium text-gray-900">{energy} <br/>(MJ)</div>
                <div className="text-sm font-medium text-gray-500">Energy consumption</div>

            </div>
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-lg bg-blue-500 text-white flex items-center justify-center mb-2">
                    <FaSmoking />
                </div>
                <div className="text-sm font-medium text-gray-900">{water} <br/>(mL)</div>
                <div className="text-sm font-medium text-gray-500">Water consumption</div>

            </div>
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-lg bg-blue-500 text-white flex items-center justify-center mb-2">
                    <FaStopwatch />
                </div>
                <div className="text-sm font-medium text-gray-900">{eutrophisation} <br/>(g Eq PO4)</div>
                <div className="text-sm font-medium text-gray-500">Eutrophication</div>

            </div>
        </div>
    );
}

export default ImpactData;
