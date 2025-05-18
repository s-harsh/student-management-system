import React, { useState, useEffect } from 'react';
import { getStudentById, updateStudent } from '../services/studentService';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditStudent() {
  const [student, setStudent] = useState({ name: '', age: '', class: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getStudentById(id).then((data) => setStudent(data));
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!student.name || !student.age || !student.class) {
      toast.error('Please fill all fields');
      return;
    }
    await updateStudent(id, student);
    toast.success('Student updated');
    navigate('/');
  };

  return (
    <div className="card mt-4 p-4 shadow-sm">
      <h2 className="mb-4">Edit Student</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-control"
            value={student.name || ''}
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
            value={student.age || ''}
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
            value={student.class || ''}
            onChange={handleChange}
            placeholder="Enter class"
          />
        </div>

        <button type="submit" className="btn btn-custom me-2">
          <i className="bi bi-pencil-square me-1"></i> Update Student
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

export default EditStudent;
