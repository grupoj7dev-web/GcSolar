
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const getSettings = async () => {
    try {
        const response = await axios.get(`${API_URL}/settings`);
        return response.data;
    } catch (error) {
        console.error('Error fetching settings:', error);
        return {};
    }
};

export const saveSettings = async (settings) => {
    try {
        const response = await axios.post(`${API_URL}/settings`, settings);
        return response.data;
    } catch (error) {
        console.error('Error saving settings:', error);
        throw error;
    }
};
