"use client";
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'
import Logo from './Logo';

const Header = () => {
    const headerOptions = [
        {
            id: 0,
            name: 'About',
            href: '#about',
        },
        {
            id: 1,
            name: 'Careers',
            href: '#careers',
        },
        {
            id: 2,
            name: 'History',
            href: '#history',
        },
        {
            id: 3,
            name: 'Service',
            href: '#service',
        },
        {
            id: 4,
            name: 'Project',
            href: '#project',
        },
        {
            id: 5,
            name: 'Blog',
            href: '#blog',
        }
    ];

    return (
        <header className=" bg-slate-100">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <a className=" text-black flex" href="#">
                            <Logo className='text-2xl' />
                        </a>
                    </div>

                    <div className="hidden md:block">
                        <nav aria-label="Global">
                            <ul className="flex items-center gap-6 text-sm">
                                {
                                    headerOptions.map(item => (
                                        <li key={item.id}>
                                            <a className="text-gray-500 transition hover:text-blue-700" key={item.id} href={item.href}> {item.name} </a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            <div
                                className="rounded-sm bg-black hover:bg-slate-600 delay-75 px-5 py-2.5 text-sm font-medium text-white shadow"
                                
                            >
                               <LoginLink postLoginRedirectURL='/dashboard'>Login</LoginLink>
                            </div>

                            <div className="hidden sm:flex">
                                <div
                                    className="rounded-sm bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-400 hover:text-blue-700"
                                   
                                >
                                   <RegisterLink>Register</RegisterLink> 
                                </div>
                            </div>
                        </div>

                        <div className="block md:hidden">
                            <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header