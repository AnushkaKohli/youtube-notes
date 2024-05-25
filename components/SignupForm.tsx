"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signIn, useSession } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import axios from 'axios';

const initialValues = {
    name: "",
    email: "",
    password: ""
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character")
        .required("Required"),
})

const SignupForm = () => {
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
        if (sessionStatus === "authenticated") {
            router.replace("/")
        }
    }, [sessionStatus, router])
    const onSubmit = async (values: any, onSubmitProps: any) => {
        try {
            const existingUser = await axios.post('/api/existingUser', { email: values.email });
            const user = existingUser.data;
            console.log("User: ", user)
            if (user !== "User not found") {
                alert("User already exists");
                return;
            }

            const response = await axios.post("/api/signup", values);
            console.log("Response: ", response)
            if (response.status === 201) {
                onSubmitProps.resetForm();
                await signIn('credentials', {
                    redirect: true,
                    email: values.email,
                    password: values.password,
                    callbackUrl: '/'
                })
                console.log("Session: ", session)
                console.log("Session status: ", sessionStatus)
            }
        } catch (error) {
            console.log("Error during signup: ", error);
        }
    }
    return (
        <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
        >
            <Form className='space-y-4 md:space-y-6'>
                {/* Name */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Name
                    </label>
                    <Field
                        type="text"
                        id="name"
                        name="name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage name="name" component="div" className='text-red-500 text-sm mt-1' />
                </div>
                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <Field
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage name="email" component="div" className='text-red-500 text-sm mt-1' />
                </div>
                {/* Password */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <Field
                        type="password"
                        id="password"
                        name="password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage name="password" component="div" className='text-red-500 text-sm mt-1' />
                </div>
                {/* Submit */}
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Sign Up
                </button>


                {/* Third party authentication */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-100 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                        <button
                            onClick={() => signIn("google")}
                            className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <FcGoogle size={25} className="max-w-[25px]" />
                        </button>
                        <button
                            onClick={() => signIn("github")}
                            className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <FaGithub size={25} className="max-w-[25px]" />
                        </button>
                    </div>
                </div>

                <div>
                    <div className='text-sm text-gray-600'>
                        Already have an account?
                        <Link href="/auth/signin" className='text-indigo-600 hover:text-indigo-800 ml-1'>
                            Sign in
                        </Link>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

export default SignupForm

