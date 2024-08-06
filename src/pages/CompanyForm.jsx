import React, { useState } from 'react';
import axios from 'axios';

export default function CompanyForm() {
    const [formData, setFormData] = useState({
        companyName: '',
        websiteUrl: '',
        minGpa: '',
        maxGpa: '',
        package: '',
        domain: '',
        interviewDate: '',
        email: '',
        description: '',
    });

    const handleChange = (event) => {
        console.log(event.target.name, 1);
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

   

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send Axios request
            const response = await axios.post('http://localhost:8000/add_company', formData);
            console.log(response.data); 
            alert('Company added successfully!');
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div>

            <div className='flex flex-col w-11/12 mx-auto' >
                <h2 className='text-3xl font-bold my-3'>Register Company</h2>
               
                    <h2 className='text-2xl font-bold my-3'>Empower your company's journey: Register effortlessly with our front-end magic!.</h2>
                
            </div>
            <form onSubmit={handleSubmit}>
                <div className="w-11/12 mx-auto grid gap-6 mb-6 md:grid-cols-2 mt-5">
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-bold text-gray-900  "> Company Name</label>
                        <input type="text" name="companyName" id="first_name" value={formData.companyName} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Infosys" required />
                    </div>
                    <div>
                        <label htmlFor="website" className="block mb-2 text-sm font-bold text-gray-900 ">Website URL</label>
                        <input type="url"  name="websiteUrl" id="website" value={formData.websiteUrl} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="infosys.com" required />
                    </div>
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-bold text-gray-900  "> Min GPA</label>
                        <input type="number"  name="minGpa" max={10} min={3} id="first_name" value={formData.minGpa} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="5" required />
                    </div>
                    <div>
                        <label htmlFor="website" className="block mb-2 text-sm font-bold text-gray-900 ">Max GPA</label>
                        <input type="number" name='maxGpa' max={10} min={3} id="website" value={formData.maxGpa} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="10" required />
                    </div>
                    <div>
                        <label htmlFor="website" className="block mb-2 text-sm font-bold text-gray-900 ">Package(in Lpa)</label>
                        <input type="number" name='package'  max={100} min={2} id="website" value={formData.package} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="12" required />
                    </div>
                    <div>
                        <label htmlFor="website" className="block mb-2 text-sm font-bold text-gray-900 ">Domain</label>
                        <input type="text" name='domain' max={100} min={2} id="website" value={formData.domain} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="full stack" required />
                    </div>
                    <div>
                        <label htmlFor="website" className="block mb-2 text-sm font-bold text-gray-900 ">Interview Date</label>
                        <input type="date" name='interviewDate' max={100} min={2} id="website" value={formData.interviewDate} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="flowbite.com" required />
                    </div>


                </div>
                <div className="mb-6 w-11/12 mx-auto">
                    <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-900 ">Email address</label>
                    <input type="email" id="email" name='email' value={formData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="john.doe@company.com" required />
                </div>
                <div className="mb-6 w-11/12 mx-auto">
                    <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 ">Description</label>
                    <textarea id="message" name='description' rows="4" value={formData.description} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>
                </div>


                <div className='w-11/12 mx-auto'>
                    <button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </div>
            </form>

        </div>
    )
}
