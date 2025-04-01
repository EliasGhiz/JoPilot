export interface ApplicationData {
    applicationID: number;
    companyName: string;
    positionTitle: string;
    applicationLink: string;
    note: string;
    applicationDate: string;
    status: string;
    followUpDate: string;
}

import getApiUrl from 'app/api/apiUrl';

const API_BASE_URL = getApiUrl();

export async function fetchApplications(): Promise<ApplicationData[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/applications`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching applications:', error);
        return [];
    }
}
