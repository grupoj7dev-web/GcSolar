import { db, auth } from '../lib/firebaseClient';
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';

const COLLECTION_NAME = 'proposals';

// No initialization needed for Firestore, but kept for compatibility
export const initializeDatabase = async () => {
    return true;
};

// Create a new proposal
export const createProposal = async (proposalData) => {
    const user = auth.currentUser;

    if (!user) {
        throw new Error('User not authenticated');
    }

    const docData = {
        user_id: user.uid,
        proposal_code: proposalData.proposalCode,
        client_name: proposalData.clientName,
        cnpj: proposalData.cnpj || null,
        status: 'aberta',
        proposal_data: proposalData,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), docData);
    return { id: docRef.id, ...docData };
};

// Get all proposals for current user
export const getProposals = async (filters = {}) => {
    const user = auth.currentUser;

    if (!user) {
        throw new Error('User not authenticated');
    }

    let q = query(
        collection(db, COLLECTION_NAME),
        where('user_id', '==', user.uid),
        orderBy('created_at', 'desc')
    );

    // Filter by status if provided
    if (filters.status && filters.status !== 'all') {
        q = query(q, where('status', '==', filters.status));
    }

    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        result.push({
            id: doc.id,
            ...data,
            // Convert timestamp for UI consistency if needed
            created_at: data.created_at?.toDate()?.toISOString() || new Date().toISOString()
        });
    });

    // Client-side search (Firestore doesn't support full-text search easily)
    if (filters.search) {
        const search = filters.search.toLowerCase();
        return result.filter(p =>
            p.client_name?.toLowerCase().includes(search) ||
            p.proposal_code?.toLowerCase().includes(search)
        );
    }

    return result;
};

// Get a single proposal by ID
export const getProposalById = async (id) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        throw new Error('Proposta não encontrada');
    }
};

// Update a proposal
export const updateProposal = async (id, proposalData) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updateData = {
        proposal_code: proposalData.proposalCode,
        client_name: proposalData.clientName,
        cnpj: proposalData.cnpj || null,
        proposal_data: proposalData,
        updated_at: serverTimestamp(),
    };

    await updateDoc(docRef, updateData);
    return { id, ...updateData };
};

// Update proposal status
export const updateProposalStatus = async (id, status) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
        status,
        updated_at: serverTimestamp(),
    });
    return true;
};

// Delete a proposal
export const deleteProposal = async (id) => {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    return true;
};

// Get statistics
export const getStatistics = async () => {
    const user = auth.currentUser;

    if (!user) {
        throw new Error('User not authenticated');
    }

    const q = query(
        collection(db, COLLECTION_NAME),
        where('user_id', '==', user.uid)
    );

    const querySnapshot = await getDocs(q);
    const stats = {
        total: 0,
        fechadas: 0,
        perdidas: 0,
        abertas: 0,
    };

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        stats.total++;
        if (data.status === 'fechada') stats.fechadas++;
        else if (data.status === 'perdida') stats.perdidas++;
        else stats.abertas++;
    });

    return stats;
};
