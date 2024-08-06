import React from 'react'
import { Link } from 'react-router-dom'
import ContactSection from '../components/ContactSection'

export default function LoginPage() {


    return (
        <>






            <div className=" w-10/12 mx-auto bg-cover bg-center bg-no-repeat my-2" >

                <img class="h-auto w-full " src="https://vtu.ac.in/wp-content/uploads/2020/01/PLACEMENT1.jpg" alt="image description"/>

            </div>


            <div className="w-11/12 mx-auto flex flex-col md:flex-row ">



                <div className="max-w-sm mx-auto p-6 my-2 bg-black border border-gray-200 rounded-lg shadow ">
                    <a >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-50 ">Student Login</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    <Link to={'/student-login'} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Login
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                </div>



                <div className="max-w-sm p-6 my-2 mx-auto bg-black border border-gray-200 rounded-lg shadow ">
                    <a >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-50 ">Register Company</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    <Link to={'/company'} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Register
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                </div>



                <div className="max-w-sm p-6 my-2 mx-auto bg-black border border-gray-200 rounded-lg shadow ">
                    <a >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-50 ">Admin Login</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    <Link to={'/admin-login'} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Login
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                </div>


            </div>



            <ContactSection />

        </>
    )
}
