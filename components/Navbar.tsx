"use client";

import React from 'react';
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
    const router = useRouter();
    const { data: session } = useSession();
    return (
        <div>
            <nav className="bg-indigo-600 p-4 text-white">
                <ul className="flex justify-between text-2xl font-bold">
                    <li><Link href="/">Home</Link></li>
                    {
                        session ? (
                            <div className='flex gap-10'>
                                <li><Link href="/video/addVideo">Add Video</Link></li>
                                <li><Link href="/api/auth/signout">Sign Out</Link></li>
                            </div>
                        ) : (
                            <div className='flex gap-10'>
                                <li><Link href="/video/addVideo">Add Video</Link></li>
                                <li><Link href="/auth/signin">Sign In</Link></li>
                                <li><Link href="/auth/signup">Sign Up</Link></li>
                            </div>
                        )
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
