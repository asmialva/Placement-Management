import AdminContact from '../components/AdminContact'
import AdminStudent from '../components/AdminStudent'
import AdminCompanies from '../components/AdminCompanies'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPage() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        async function fetchCompanies() {
            try {
                const response = await axios.get('http://localhost:8000/companies/');
                setCompanies(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        }
        fetchCompanies();
    }, []);

    const handleDeleteCompany = async (companyId) => {
        try {
            await axios.delete(`http://localhost:8000/delete_company/${companyId}`);
            setCompanies(companies.filter(company => company.CompanyID !== companyId));
            alert('company deleted successfully')
        } catch (error) {
            console.error('Error deleting company:', error);
        }
    };
    const handleUpdateCompany = async (companyId) => {
        try {
            await axios.patch(`http://localhost:8000/update_company/${companyId}`);
            alert('company updated successfully')
            window.location.reload();
        } catch (error) {
            console.error('Error deleting company:', error);
        }
    };
    return (
        <>
            <div className="w-11/12 mx-auto">
                <h2 className='text-3xl font-bold my-3'>Available Companies</h2>

                <div className='flex flex-col md:flex-row '>

                <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-900">
                    <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-900">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Company Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Company Mail Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Company Website
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Package
                            </th>
                            <th scope="col" className="px-6 py-3">
                                GPA Min
                            </th>
                            <th scope="col" className="px-6 py-3">
                                GPA Max
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Domain
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Interview Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                accept
                            </th>
                            <th scope="col" className="px-6 py-3">
                                reject
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map(company => (
                            !company.accepted &&
                            <tr key={company.company_id} className="bg-white border-b dark:bg-gray-50 dark:border-gray-900">
                                <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-black">
                                    {company.name}
                                </td>
                                <td className="px-6 py-4 font-bold">
                                    {company.mail}
                                </td>
                                <td className="px-6 py-4 font-bold">
                                    {company.website}
                                </td>
                                <td className="px-6 py-4 font-bold">
                                    {company.package}
                                </td>
                                <td className="px-6 py-4 font-bold">
                                    {company.gpa_range_min}
                                </td>
                                <td className="px-6 py-4 font-bold">
                                    {company.gpa_range_max}
                                </td>
                                <td className="px-6 py-4 font-bold">
                                    {company.domain}
                                </td>
                                <td className="px-6 py-4 font-bold">
                                    {company.interview_date}
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleUpdateCompany(company.company_id)} className="text-green-500">accept</button>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleDeleteCompany(company.company_id)} className="text-red-500">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

                </div>

                <AdminCompanies />
                <AdminStudent />
                <AdminContact />
            </div>
        </>
    )
}
