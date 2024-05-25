import SignupForm from '@/components/SignupForm';
import React from 'react';

const page = () => {

    return (
        <section className="flex flex-col items-center mt-24">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign Up Form
                    </h1>
                    <SignupForm />
                </div>
            </div>
        </section>
    )
}

export default page
