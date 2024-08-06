import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function InterviewPending() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        async function fetchCompanies() {
            try {
                const response = await axios.get(`http://localhost:8000/student_companies/${sessionStorage.getItem("usn")}`);
                setCompanies(response.data);console.log(response.data);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        }
        fetchCompanies();
    }, []);

    return (
        <div className="w-11/12 mx-auto">
            <h2 className='text-3xl font-bold my-3'>Interviews Pending</h2>
            <table className='my-2 w-full'>
                <thead>
                    <tr>
                        <th className="font-bold px-2 text-start bg-gray-100 py-2 ">Name</th>
                        <th className='font-bold px-2 text-start bg-gray-100 py-2'>Mail</th>
                        <th className='font-bold px-2 text-start bg-gray-100 py-2'>Package</th>
                        <th className='font-bold px-2 text-start bg-gray-100 py-2'>Domain</th>
                        <th className="font-bold px-2 text-start bg-gray-100 py-2  ">Interview Date</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map(company => (
                        <tr key={company.CompanyID}>
                            <td className='px-2 '>{company.Name}</td>
                            <td className='px-2'>{company.Mail}</td>
                            <td className='px-2'>{company.interview_date}</td>
                            <td className='px-2'>{company.Domain}</td>
                            <td className='px-2'>{company.interview_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
