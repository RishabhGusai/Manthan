"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, writeBatch, doc, getDocs } from 'firebase/firestore';

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

    // Data States
    const [trades, setTrades] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [kycRequests, setKycRequests] = useState([]);
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'System Ready', message: 'Initializing data services...', type: 'info', time: 'Just now' }
    ]);
    const [flaggedTrades, setFlaggedTrades] = useState([]);

    // Fallback Mode
    const [isOfflineMode, setIsOfflineMode] = useState(false);

    // --- Listeners & Initialization ---
    useEffect(() => {
        let unsubTrades, unsubDocs, unsubKyc;

        const initFirebase = () => {
            try {
                // 1. Trades Listener
                const qTrades = query(collection(db, "trades"), orderBy("createdAt", "desc"));
                unsubTrades = onSnapshot(qTrades, (snapshot) => {
                    const tradesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setTrades(tradesData);
                    setFlaggedTrades(tradesData.filter(t => t.risk === 'High' || t.status === 'Flagged'));
                }, (error) => {
                    throw error; // Trigger fallback
                });

                // 2. Documents Listener
                const qDocs = query(collection(db, "documents"), orderBy("createdAt", "desc"));
                unsubDocs = onSnapshot(qDocs, (snapshot) => {
                    const docsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setDocuments(docsData);
                }, (error) => { throw error; });

                // 3. KYC Requests Listener
                const qKyc = query(collection(db, "kyc_requests"), orderBy("createdAt", "desc"));
                unsubKyc = onSnapshot(qKyc, (snapshot) => {
                    const kycData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setKycRequests(kycData);
                }, (error) => { throw error; });

                addNotification({ title: 'Cloud Sync', message: 'Connected to Firebase.', type: 'success' });

            } catch (err) {
                console.warn("Firebase not configured or failed. Switching to LocalStorage mode.", err);
                enableOfflineMode();
            }
        };

        const enableOfflineMode = () => {
            setIsOfflineMode(true);
            const localTrades = JSON.parse(localStorage.getItem('manthan_trades') || '[]');
            const localDocs = JSON.parse(localStorage.getItem('manthan_documents') || '[]');
            const localKyc = JSON.parse(localStorage.getItem('manthan_kyc') || '[]');

            if (localTrades.length > 0) setTrades(localTrades);
            if (localDocs.length > 0) setDocuments(localDocs);
            if (localKyc.length > 0) setKycRequests(localKyc);

            addNotification({ title: 'Local Mode', message: 'Data is saving to this device.', type: 'info' });
        };

        initFirebase();

        return () => {
            if (unsubTrades) unsubTrades();
            if (unsubDocs) unsubDocs();
            if (unsubKyc) unsubKyc();
        };
    }, []);

    // Helper to persist local data
    const saveToLocal = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    // --- Actions ---

    // Create a new trade
    const addTrade = async (tradeDetails) => {
        const newTrade = {
            status: 'Processing',
            date: new Date().toISOString().split('T')[0],
            createdAt: new Date(), // for sorting
            ...tradeDetails,
            risk: 'Low' // Default
        };

        if (isOfflineMode) {
            const updatedTrades = [newTrade, ...trades];
            setTrades(updatedTrades);
            saveToLocal('manthan_trades', updatedTrades);
            addNotification({ title: 'Trade Saved', message: 'Saved locally.', type: 'success' });
            return 'LOCAL-ID'; // Dummy ID
        } else {
            try {
                const docRef = await addDoc(collection(db, "trades"), newTrade);
                addNotification({ title: 'Trade Created', message: `Saved to cloud: ${docRef.id.slice(0, 6)}...`, type: 'success' });
                return docRef.id;
            } catch (e) {
                console.error("Firebase write failed", e);
                // Fallback attempt?
            }
        }
    };

    // Add Notification
    const addNotification = ({ title, message, type }) => {
        setNotifications(prev => [{ id: Date.now(), title, message, type, time: 'Just now' }, ...prev]);
    };

    // Seed Database / Sync
    const seedDatabase = async () => {
        // Initial Data Sets
        const initialTrades = [
            { id: 'T1', user: 'ExportCo India', value: '₹ 25,00,000', risk: 'Low', status: 'Processing', product: 'Cotton Textiles', quantity: '1000 Units', createdAt: new Date() },
            { id: 'T2', user: 'Global Gems', value: '₹ 1,20,00,000', risk: 'High', status: 'Flagged', reason: 'Over-Invoicing', product: 'Polished Diamonds', quantity: '50 Carats', createdAt: new Date() },
            { id: 'T3', user: 'Textile Hub', value: '₹ 8,50,000', risk: 'Low', status: 'Cleared', product: 'Silk Fabrics', quantity: '200 Meters', createdAt: new Date() },
            { id: 'T4', user: 'Alpha Logistics', value: '₹ 45,00,000', risk: 'Medium', status: 'Review', product: 'Auto Parts', quantity: '500 Units', createdAt: new Date() }
        ];

        const initialDocs = [1, 2, 3, 4, 5, 6].map(item => ({
            id: `D${item}`,
            title: `Commercial Invoice #${8830 + item}`,
            type: 'PDF',
            size: '2.4 MB',
            date: new Date().toISOString(),
            createdAt: new Date(), // Added for consistency with Firebase
            status: item % 3 === 0 ? 'Review' : 'Verified',
        }));

        const initialKyc = [
            { id: 'K1', name: 'Rahul Traders', doc: 'GST Certificate', type: 'Exporter', createdAt: new Date() }, // Added for consistency with Firebase
            { id: 'K2', name: 'Dubai Imports LLC', doc: 'Incorp. Docs', type: 'Importer', createdAt: new Date() }, // Added for consistency with Firebase
            { id: 'K3', name: 'Sino-India Pvt', doc: 'IEC License', type: 'Exporter', createdAt: new Date() } // Added for consistency with Firebase
        ];

        if (isOfflineMode) {
            setTrades(initialTrades);
            setDocuments(initialDocs);
            setKycRequests(initialKyc);
            saveToLocal('manthan_trades', initialTrades);
            saveToLocal('manthan_documents', initialDocs);
            saveToLocal('manthan_kyc', initialKyc);
            addNotification({ title: 'Data Reset', message: 'Restored default data locally.', type: 'success' });
        } else {
            try {
                const batch = writeBatch(db);
                // Re-adding the previous cloud seeding logic for completeness:
                const tradesRef = collection(db, "trades");
                const tSnap = await getDocs(tradesRef);
                if (tSnap.empty) initialTrades.forEach(t => {
                    const { id, ...rest } = t; // Remove local 'id' for Firebase
                    batch.set(doc(tradesRef), rest);
                });

                const dRef = collection(db, "documents");
                const dSnap = await getDocs(dRef);
                if (dSnap.empty) initialDocs.forEach(d => {
                    const { id, ...rest } = d; // Remove local 'id' for Firebase
                    batch.set(doc(dRef), rest);
                });

                const kRef = collection(db, "kyc_requests");
                const kSnap = await getDocs(kRef);
                if (kSnap.empty) initialKyc.forEach(k => {
                    const { id, ...rest } = k; // Remove local 'id' for Firebase
                    batch.set(doc(kRef), rest);
                });

                await batch.commit();
                addNotification({ title: 'System', message: 'Database seeded in Cloud.', type: 'success' });
            } catch (e) {
                console.error("Error seeding cloud:", e);
                addNotification({ title: 'Error', message: 'Cloud sync failed. Switching to local.', type: 'alert' });
                enableOfflineMode();
            }
        }
    };

    // Admin Action: Resolve Risk
    const resolveRisk = (id, action) => {
        if (isOfflineMode) {
            const updated = trades.map(t => t.id === id ? { ...t, status: action } : t);
            setTrades(updated);
            setFlaggedTrades(updated.filter(t => t.risk === 'High' || t.status === 'Flagged'));
            saveToLocal('manthan_trades', updated);
        } else {
            // Cloud update logic would go here, e.g., updateDoc(doc(db, "trades", id), { status: action });
        }
        addNotification({ title: 'Admin Action', message: `Trade ${id} marked as ${action}.`, type: 'info' });
    };

    return (
        <GlobalContext.Provider value={{
            user, setUser,
            documents,
            kycRequests,
            trades, addTrade,
            notifications, addNotification,
            flaggedTrades, resolveRisk,
            seedDatabase,
            isOfflineMode
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => useContext(GlobalContext);
