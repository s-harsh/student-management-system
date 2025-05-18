import React, { useState } from 'react';
import { addStudent } from '../services/studentService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddStudent() {
  const [student, setStudent] = useState({ name: '', age: '', class: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!student.name || !student.age || !student.class) {
      toast.error('Please fill all fields');
      return;
    }
    await addStudent(student);
    toast.success('Student added');
    navigate('/');
  };

  return (
    <div className="card mt-4 p-4 shadow-sm">
      <h2 className="mb-4">Add Student</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-control"
            value={student.name}
            onChange={handleChange}
            placeholder="Enter full name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input
            id="age"
            name="age"
            type="number"
            className="form-control"
            value={student.age}
            onChange={handleChange}
            placeholder="Enter age"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="class" className="form-label">Class</label>
          <input
            id="class"
            name="class"
            type="text"
            className="form-control"
            value={student.class}
            onChange={handleChange}
            placeholder="Enter class"
          />
        </div>

        <button type="submit" className="btn btn-custom me-2">
          <i className="bi bi-check-circle me-1"></i> Add Student
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left-circle me-1"></i> Back
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
