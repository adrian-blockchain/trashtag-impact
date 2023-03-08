import {WasteToken} from "@_types/nft";


const DataTokenView = ({data}: { data: WasteToken }) => {

    return(
        <section className="py-20 bg-white tails-selected-element" contentEditable="true">
            <div className="flex flex-col px-8 mx-auto space-y-12 max-w-7xl xl:px-12">
                <div className="relative">
                    <h2 className="w-full text-3xl font-bold text-center sm:text-4xl md:text-5xl"> {data.type} token</h2>
                </div>
                <div className="flex flex-col mb-8 animated fadeIn sm:flex-row">
                    <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12 sm:order-last">
                        <img className="rounded-lg shadow-xl"
                             src="https://cdn.devdojo.com/images/december2020/dashboard-011.png" alt=""
                             data-rounded="rounded-lg" data-rounded-max="rounded-full"/>
                    </div>
                    <div className="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pr-16">
                        <p className="mb-2 text-sm font-semibold leading-none text-left text-indigo-600 uppercase"
                           data-primary="indigo-600">Drag-n-drop design</p>
                        <h3 className="mt-2 text-2xl sm:text-left md:text-4xl">Design Made Easy</h3>
                        <p className="mt-5 text-lg text-gray-700 text md:text-left">Collected : {data.exploration}</p>
                    </div>
                </div>
                <div className="flex flex-col mb-8 animated fadeIn sm:flex-row">
                    <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12">
                    </div>
                    <div className="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pl-16">
                        <p className="mb-2 text-sm font-semibold leading-none text-left text-indigo-600 uppercase"
                           data-primary="indigo-600">know your data</p>
                        <h3 className="mt-2 text-2xl sm:text-left md:text-4xl">Optimized For Conversions</h3>
                        <p className="mt-5 text-lg text-gray-700 text md:text-left">Backed by data, these templates have
                            been crafted for ultimate optimization. Now, converting your visitors into customers is
                            easier than ever before.</p>
                    </div>
                </div>
                <div className="flex flex-col mb-8 animated fadeIn sm:flex-row">
                    <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12 sm:order-last">
                        <img className="rounded-lg shadow-xl"
                             src="https://cdn.devdojo.com/images/december2020/dashboard-03.png" alt=""
                             data-rounded="rounded-lg" data-rounded-max="rounded-full"/>
                    </div>
                    <div className="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pr-16">
                        <p className="mb-2 text-sm font-semibold leading-none text-left text-indigo-600 uppercase"
                           data-primary="indigo-600">Easy to customize</p>
                        <h3 className="mt-2 text-2xl sm:text-left md:text-4xl">Make It Your Own</h3>
                        <p className="mt-5 text-lg text-gray-700 text md:text-left">All templates and components are
                            fully customizable. You can use these templates to tell your personal story and convey your
                            message.</p>
                    </div>
                </div>

            </div>
        </section>
    )



}

export default DataTokenView;
