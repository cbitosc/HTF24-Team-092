import axios from 'axios';

const API_URL = 'http://api.endlessmedical.com/v1/dx';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

let sessionID: string | null = null;

export const initSession = async () => {
    const response = await apiClient.get('/InitSession');
    if (response.data.status === 'ok') {
        sessionID = response.data.SessionID;
        return sessionID;
    } else {
        throw new Error(response.data.error);
    }
};

export const acceptTermsOfUse = async () => {
    if (!sessionID) throw new Error('SessionID is missing.');
    const passphrase = "I have read, understood and I accept and agree to comply with the Terms of Use of EndlessMedicalAPI and Endless Medical services. The Terms of Use are available on endlessmedical.com";
    const response = await apiClient.post(`/AcceptTermsOfUse?SessionID=${sessionID}&passphrase=${encodeURIComponent(passphrase)}`);
    return response.data.status === 'ok';
};

export const getFeatures = async () => {
    if (!sessionID) throw new Error('SessionID is missing.');
    const response = await apiClient.get(`/GetFeatures?SessionID=${sessionID}`);
    return response.data;
};

// Additional functions for other endpoints can be added similarly...

export const getOutcomes = async () => {
    if (!sessionID) throw new Error('SessionID is missing.');
    const response = await apiClient.get(`/GetOutcomes?SessionID=${sessionID}`);
    return response.data;
};

// Function to reset session
export const resetSession = () => {
    sessionID = null;
};
