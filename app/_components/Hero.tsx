import React from 'react'
import VisualizeItAnim from './VisualizeItAnim'
import Image from 'next/image'

const Hero = () => {
    return (
        <section
            className="relative bg-slate-200 bg-cover bg-center bg-no-repeat"
        >
            <div className='absolute hidden md:flex top-1/2 transform -translate-y-1/2 right-20'>
                <Image
                    src="/heroBgBlue.svg"
                    alt="Hero Image"
                    width={290} 
                    height={300}
                />
            </div>

            <div
                className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen-64 lg:items-center lg:px-8"
            >
                <div className="max-w-2xl sm:text-left text-center ">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Transform Descriptions into
                        <strong className="block font-extrabold  text-blue-400 mt-2"> Detailed Diagrams. </strong>
                    </h1>

                    <p className="mt-4  sm:text-xl/relaxed">
                        <strong>VisualizeIt</strong> empowers engineering teams with advanced tools designed to simplify diagram creation and documentation. Whether you're visualizing complex systems or drafting technical reports, our platform accelerates your workflow.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 text-center">
                        <a
                            href="#"
                            className="block w-full rounded bg-blue-400 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                        >
                            Get Started
                        </a>

                        <a
                            href="#"
                            className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-blue-400 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero