"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const Navbar = () => {
    const router = useRouter();
    return (
        <div>
            <button className='border border-black px-4 py-2 rounded-lg mx-4' onClick={() => {
                router.push('/auth/signin');
            }}>Sign in</button>
            <button className='border border-black px-4 py-2 rounded-lg mx-4' onClick={() => {
                router.push('/auth/signup');
            }}>Sign up</button>
            <button className='border border-black px-4 py-2 rounded-lg mx-4' onClick={() => {
                signOut({ callbackUrl: '/' });
            }
            }>Sign out</button>
        </div>
    )
}

export default Navbar
