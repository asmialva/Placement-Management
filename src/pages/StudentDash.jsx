import React, { useState, useEffect } from 'react'
import axios from 'axios';
import InterviewPending from '../components/InterviewPending';
import AvailableCompany from '../components/AvailableCompany';
export default function StudentDash() {
    const [students, setStudents] = useState({});

    useEffect(() => {
        async function fetchStudents() {
            try {
                const response = await axios.get(`http://localhost:8000/students/${sessionStorage.getItem("usn")}`);
                setStudents(response.data); console.log(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        }
        if (sessionStorage.getItem("usn") != null) {
            fetchStudents();
        }
    }, []);

    return (

        sessionStorage.getItem("usn") == null ? <>login first</> :
            <div>


                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-11/12 mx-auto my-3" >
                    <h2 className='text-3xl font-bold my-3'>Student Dashboard</h2>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-50 uppercase ">
                            <tr>
                                <th scope="col" colSpan={2} className="px-6 py-3 bg-black ">
                                    Student Details
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-100  ">
                                    Name
                                </th>
                                <td className="px-6 py-4">
                                    {students.name}
                                </td>

                            </tr>
                            <tr className="border-b border-gray-200 ">
                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap bg-black  ">
                                    USN
                                </th>
                                <td className="px-6 py-4">
                                    {students.usn}
                                </td>

                            </tr>
                            <tr className="border-b border-gray-200 ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-100  ">
                                    Email
                                </th>
                                <td className="px-6 py-4">
                                    {students.mail}
                                </td>

                            </tr>
                            <tr className="border-b border-gray-200 ">
                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap bg-black  ">
                                    Phone
                                </th>
                                <td className="px-6 py-4">
                                    {students.phone}
                                </td>

                            </tr>
                            <tr className="border-b border-gray-200 ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-100  ">
                                    Current sem
                                </th>
                                <td className="px-6 py-4">
                                    {students.gpa}
                                </td>

                            </tr>
                            <tr className="border-b border-gray-200 ">
                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap bg-black ">
                                    sem
                                </th>
                                <td className="px-6 py-4">
                                    {students.current_sem}
                                </td>

                            </tr>

                        </tbody>
                    </table>
                </div>
                <AvailableCompany />
                <InterviewPending />

            </div>
    )
}
