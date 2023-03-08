
/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next';
import { BaseLayout, NftList } from '@ui';

import { ExclamationIcon } from '@heroicons/react/solid';
import Link from 'next/link';

const Home: NextPage = () => {


  return (
    <BaseLayout>
      <section className="relative px-2 py-12 bg-white sm:py-20 md:py-32 md:px-0 tails-selected-element"
               >
        <div className="relative top-0 left-0 items-center justify-center w-full h-full md:absolute">
          <div className="relative z-20 h-full px-8 mx-auto max-w-7xl xl:px-5">
            <div className="flex flex-wrap items-center h-full sm:-mx-3">
              <div className="w-full pl-10 pr-10 sm:pl-0 md:w-1/2 xl:pr-3">
                <div
                    className="w-full pb-6 pl-0 space-y-4 sm:pl-10 md:max-w-md lg:max-w-lg md:space-y-5 lg:space-y-6 xl:space-y-7 sm:pr-5 lg:pr-0 md:pb-0">
                  <p className="font-medium tracking-wide text-blue-600 uppercase" data-primary="blue-600">Trashtag app</p>
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl">
                    Collect waste to earn crypto
                  </h1>
                  <p className="mx-auto text-base text-gray-500 lg:leading-9 md:max-w-md lg:text-xl md:max-w-3xl">The first play-to-earn platform dedicated to waste collection and environmental protection.</p>
                  <div
                      className="relative flex flex-col space-y-3 lg:flex-row lg:space-y-0 lg:space-x-4 md:pr-10 lg:pr-0">
                    <Link href="https://linktr.ee/trashtag">

                    <a target="_blank"
                       className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-blue-600 rounded-md sm:mb-0 hover:bg-blue-700 sm:w-auto"
                       data-rounded="rounded-md" data-primary="blue-600">
                      Try for free
                    </a>
                    </Link>
                    <Link href="https://youtu.be/xqQnnVfvVXs">
                      <a target="_blank"
                         className="flex items-center px-6 py-3 bg-transparent border border-gray-800 rounded-md hover:bg-gray-50"
                         data-rounded="rounded-md">
                        Watch Video
                      </a>
                    </Link>

                  </div>

                </div>
              </div>
              <div className="w-full md:w-1/2">
              </div>
            </div>
          </div>
        </div>
        <div className="relative top-0 left-0 z-10 flex items-center w-full h-full py-12">
          <div className="hidden w-1/2 md:block">
          </div>
          <div className="w-1/2 -mr-32 2xl:-mr-64 md:w-7/12">
            <img src={"../images/img_1.png"}
                 className="w-1/2" alt={`Hello`}/>
          </div>
        </div>
      </section>
    </BaseLayout>
  )
}

export default Home
