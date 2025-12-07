import React, { useEffect, useState } from 'react';
import api from '../services/api';

const MyLoansPage = () => {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        try {
            const response = await api.get('/loans/my');
            setLoans(response.data);
        } catch (error) {
            console.error('Error fetching loans', error);
        }
    };

    const handleReturn = async (loanId) => {
        try {
            await api.post(`/loans/return/${loanId}`);
            alert('Book returned successfully!');
            fetchLoans();
        } catch (error) {
            alert('Error returning book');
        }
    };

    return (
        <div className="container mt-5">
            <h2>My Loans</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Book Title</th>
                        <th>Issue Date</th>
                        <th>Return Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map(loan => (
                        <tr key={loan.id}>
                            <td>{loan.id}</td>
                            <td>{loan.book.title}</td>
                            <td>{loan.issueDate}</td>
                            <td>{loan.returnDate ? loan.returnDate : 'Not Returned'}</td>
                            <td>
                                {!loan.returnDate && (
                                    <button className="btn btn-warning btn-sm" onClick={() => handleReturn(loan.id)}>Return</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyLoansPage;
