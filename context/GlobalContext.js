"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    // --- Mock Data ---

    // User Profile
    const [user, setUser] = useState({
        name: 'Rahul Exports',
        email: 'rahul@exportco.in',
        role: 'Exporter',
        avatar: '/default-avatar.png',
        creditScore: 785
    });

    // Trades List
    const [trades, setTrades] = useState([
        { id: 'TRD-2024-001', product: 'Cotton Bales', quantity: '500 Tons', date: '2024-10-12', status: 'In Transit', origin: 'Mumbai', destination: 'Dubai', value: 5000000 },
        { id: 'TRD-2024-002', product: 'Spices (Cardamom)', quantity: '200 Kg', date: '2024-10-15', status: 'Customs Clearance', origin: 'Kochi', destination: 'London', value: 1200000 },
    ]);

    // Notifications
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Shipment Delayed', message: 'TRD-2024-001 is delayed by 2 days due to weather.', type: 'alert', time: '2 hrs ago' },
        { id: 2, title: 'Loan Approved', message: 'Your working capital loan of ₹50L is approved.', type: 'success', time: '5 hrs ago' },
    ]);

    // Admin Data
    const [flaggedTrades, setFlaggedTrades] = useState([
        { id: 'TRD-9922', user: 'Global Gems', value: '₹ 1.2Cr', risk: 'High', status: 'Flagged', reason: 'Over-Invoicing' }
    ]);

    // --- Actions ---

    // Create a new trade
    const addTrade = (tradeDetails) => {
        const newTrade = {
            id: `TRD-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
            status: 'Processing',
            date: new Date().toISOString().split('T')[0],
            ...tradeDetails
        };
        setTrades([newTrade, ...trades]);
        addNotification({ title: 'Trade Created', message: `Trade ${newTrade.id} initiated successfully.`, type: 'success' });
        return newTrade;
    };

    // Add Notification
    const addNotification = ({ title, message, type }) => {
        setNotifications(prev => [{ id: Date.now(), title, message, type, time: 'Just now' }, ...prev]);
    };

    // Admin Action: Resolve Risk
    const resolveRisk = (id, action) => {
        setFlaggedTrades(prev => prev.map(t => t.id === id ? { ...t, status: action } : t));
        addNotification({ title: 'Admin Action', message: `Trade ${id} marked as ${action}.`, type: 'info' });
    };

    return (
        <GlobalContext.Provider value={{
            user, setUser,
            trades, addTrade,
            notifications, addNotification,
            flaggedTrades, resolveRisk
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => useContext(GlobalContext);
