import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AddBookPage = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [copies, setCopies] = useState(1);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/books', {
                title,
                author,
                copiesTotal: parseInt(copies),
                copiesAvailable: parseInt(copies)
            });
            alert('Book added successfully!');
            navigate('/books');
        } catch (error) {
            alert('Error adding book');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Author</label>
                    <input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Total Copies</label>
                    <input type="number" className="form-control" value={copies} onChange={(e) => setCopies(e.target.value)} min="1" required />
                </div>
                <button type="submit" className="btn btn-primary">Add Book</button>
            </form>
        </div>
    );
};

export default AddBookPage;
