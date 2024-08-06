import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function InterviewPending() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        async function fetchCompanies() {
            try {
                const response = await axios.get(`http://localhost:8000/companies_not_associated/${sessionStorage.getItem("usn")}`);
                setCompanies(response.data);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        }
        fetchCompanies();
    }, []);

    const handleAccept = async (companyId) => {
        try {
            await axios.post(`http://localhost:8000/accept_company/${sessionStorage.getItem("usn")}/${companyId}`);
            // Refresh the list of companies after accepting
            const response = await axios.get(`http://localhost:8000/companies_not_associated/${sessionStorage.getItem("usn")}`);
            setCompanies(response.data);
        } catch (error) {
            console.error('Error accepting company:', error);
        }
    };

    const handleReject = async (companyId) => {
        try {
            await axios.post(`http://localhost:8000/reject_company/${sessionStorage.getItem("usn")}/${companyId}`);
            const response = await axios.get(`http://localhost:8000/companies_not_associated/${sessionStorage.getItem("usn")}`);
            setCompanies(response.data);
        } catch (error) {
            console.error('Error rejecting company:', error);
        }
    };

    return (
        <div className="w-11/12 mx-auto">
            <h2 className='text-3xl font-bold my-3'>Available company</h2>
            <table className='my-2 w-full'>
                <thead>
                    <tr>
                        <th className="font-bold px-2 text-start bg-gray-100 py-2 ">Name</th>
                        <th className='font-bold px-2 text-start bg-gray-100 py-2'>Mail</th>
                        <th className='font-bold px-2 text-start bg-gray-100 py-2'>Package</th>
                        <th className='font-bold px-2 text-start bg-gray-100 py-2'>Domain</th>
                        <th className="font-bold px-2 text-start bg-gray-100 py-2  ">Interview Date</th>
                        <th className="font-bold px-2 text-start bg-gray-100 py-2  ">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map(company => (
                        <tr key={company.interview_date}>
                            <td className='px-2'>{company.Name}</td>
                            <td className='px-2'>{company.Mail}</td>
                            <td className='px-2'>{company.package}</td>
                            <td className='px-2'>{company.Domain}</td>
                            <td className='px-2'>{company.interview_date}</td>
                            <td className='px-2'>
                                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => handleAccept(company.CompanyID)}>Accept</button> &nbsp;
                                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => handleReject(company.CompanyID)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
