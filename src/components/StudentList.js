import React, { useEffect, useState } from 'react';
import { getStudents, deleteStudent } from '../services/studentService';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function StudentList() {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const loadStudents = async () => {
        const res = await getStudents();
        setStudents(res.data);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            await deleteStudent(id);
            toast.success("Student deleted");
            loadStudents();
        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    // Filter students by name or class
    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.class.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <h2 className="mt-4 mb-3">Student List</h2>

            {/* Summary and Search bar */}
            <div className="mb-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div>
                    <strong>Total Students: </strong> {students.length}
                </div>
                <input
                    type="text"
                    placeholder="Search by name or class..."
                    className="form-control"
                    style={{ maxWidth: '300px' }}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <Link to="/add" className="btn btn-custom">
                    <i className="bi bi-plus-circle me-1"></i> Add Student
                </Link>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Class</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">No students found</td>
                            </tr>
                        ) : (
                            filteredStudents.map(s => (
                                <tr key={s._id}>
                                    <td>{s.name}</td>
                                    <td>{s.age} years</td>
                                    <td>
                                        <span className="badge bg-primary">{s.class}</span>
                                    </td>
                                    <td>
                                        <Link
                                            to={`/edit/${s._id}`}
                                            className="btn btn-sm btn-warning me-2"
                                            title="Edit Student"
                                        >
                                            <i className="bi bi-pencil-square me-1"></i> Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(s._id)}
                                            className="btn btn-sm btn-danger"
                                            title="Delete Student"
                                        >
                                            <i className="bi bi-trash me-1"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StudentList;
