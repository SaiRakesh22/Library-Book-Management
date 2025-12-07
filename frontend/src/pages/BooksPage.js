import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const role = localStorage.getItem('role');

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await api.get('/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books', error);
        }
    };

    const handleBorrow = async (bookId) => {
        try {
            await api.post('/loans/borrow', { bookId });
            alert('Book borrowed successfully!');
            fetchBooks(); // Refresh list to update availability
        } catch (error) {
            alert('Error borrowing book. Maybe no copies available?');
        }
    };

    const handleDelete = async (bookId) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await api.delete(`/books/${bookId}`);
                alert('Book deleted successfully');
                fetchBooks();
            } catch (error) {
                alert('Error deleting book');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>Books</h2>
            {role === 'ADMIN' && (
                <Link to="/add-book" className="btn btn-success mb-3">Add Book</Link>
            )}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Available</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.copiesAvailable} / {book.copiesTotal}</td>
                            <td>
                                {role === 'USER' && (
                                    book.copiesAvailable > 0 ? (
                                        <button className="btn btn-primary btn-sm me-2" onClick={() => handleBorrow(book.id)}>Borrow</button>
                                    ) : (
                                        <span className="text-danger me-2">Out of Stock</span>
                                    )
                                )}
                                {role === 'ADMIN' && (
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(book.id)}>Delete</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BooksPage;
