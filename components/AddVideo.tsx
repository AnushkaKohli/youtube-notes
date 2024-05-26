"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const initialValues = {
    videoUrl: ""
}

const validationSchema = Yup.object({
    videoUrl: Yup.string().required('Required'),
})

const AddVideo = () => {
    const router = useRouter();
    const onSubmit = async (values: any, onSubmitProps: any) => {
        try {
            const splitPart = values.videoUrl.split('?v=')[1];
            const videoId = splitPart.split('&')[0];
            const response = await axios.post('/api/video', { videoId });
            if (response.data === "Video already exists") {
                alert("Video already exists")
            }
            if (response.status === 201) {
                onSubmitProps.resetForm();
                router.push('/');
            }
        } catch (error) {
            console.log("Error in adding video", error)
        }
        onSubmitProps.resetForm();
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            <Form className='space-y-4 md:space-y-6'>
                {/* VideoUrl */}
                <div>
                    <label
                        htmlFor="videoUrl"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Video URL
                    </label>
                    <Field
                        type="text"
                        id="videoUrl"
                        name="videoUrl"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage name="videoUrl" component="div" className='text-red-500 text-sm mt-1' />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Save
                </button>
            </Form>
        </Formik>
    )
}

export default AddVideo
