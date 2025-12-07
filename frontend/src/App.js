import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BooksPage from './pages/BooksPage';
import AddBookPage from './pages/AddBookPage';
import MyLoansPage from './pages/MyLoansPage';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/books" element={
                    <ProtectedRoute>
                        <BooksPage />
                    </ProtectedRoute>
                } />
                <Route path="/add-book" element={
                    <ProtectedRoute>
                        <AddBookPage />
                    </ProtectedRoute>
                } />
                <Route path="/my-loans" element={
                    <ProtectedRoute>
                        <MyLoansPage />
                    </ProtectedRoute>
                } />
                <Route path="/" element={<Navigate to="/books" />} />
            </Routes>
        </Router>
    );
}

export default App;
