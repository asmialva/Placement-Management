import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AdminStudent() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function fetchStudents() {
            try {
                const response = await axios.get('http://localhost:8000/students/');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        }
        fetchStudents();
    }, []);

    const handleDelete = async (usn) => {
        try {
            await axios.delete(`http://localhost:8000/delete_student/${usn}`).then((response)=>alert(response.data.message)).catch((error)=>alert('unable delete student'));
            setStudents(students.filter(student => student.usn !== usn));
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    return (    
        <>
            <h2 className='text-3xl font-bold my-3'>Students</h2>
            <Link to={'/admin/add_student'}><button >Add student</button></Link>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-900">
                    <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-900">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                USN
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mail ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                GPA
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Current Semester
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.usn} className="bg-white border-b dark:bg-gray-50 dark:border-gray-900">
                                <td className="px-6 py-4">{student.usn}</td>
                                <td className="px-6 py-4">{student.name}</td>
                                <td className="px-6 py-4">{student.mail}</td>
                                <td className="px-6 py-4">{student.gpa}</td>
                                <td className="px-6 py-4">{student.phone}</td>
                                <td className="px-6 py-4">{student.current_sem}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleDelete(student.usn)} className="text-red-500">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
