import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminContact() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        async function fetchContacts() {
            try {
                const response = await axios.get('http://localhost:8000/contacts/');
                setContacts(response.data);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        }
        fetchContacts();
    }, []);

    const handleDeleteContact = async (contactId) => {
        try {
            await axios.delete(`http://localhost:8000/delete_contact/${contactId}`);
            // Remove the deleted contact from the state
            setContacts(contacts.filter(contact => contact.contact_id !== contactId));
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    return (
        <>
            <h2 className='text-3xl font-bold my-3'>Contact</h2>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-900">
                    <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-900">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Subject
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Message
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => (
                            <tr key={contact.contact_id} className="bg-white border-b dark:bg-gray-50 dark:border-gray-900">
                                <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-black">
                                    {contact.firstName}
                                </td>
                                <td className="px-6 py-4 font-bold">
                                    {contact.email}
                                </td>
                                <td className="px-6 py-4 font-bold">
                                    {contact.subject}
                                </td>
                                <td className="px-6 py-4 font-bold">
                                    {contact.message}
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleDeleteContact(contact.contact_id)} className="text-red-500">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
