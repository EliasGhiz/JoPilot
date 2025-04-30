import { Button, Typography, Box } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import api from "app/api/api";
import type { ApplicationData } from 'app/api/pages/Applications';

const columns: GridColDef[] = [
    {
        field: 'applicationDate',
        headerName: 'Date',
        flex: 1,
        minWidth: 100
    },
    {
        field: 'companyName',
        headerName: 'Company Name',
        flex: 1,
        minWidth: 150
    },
    {
        field: 'positionTitle',
        headerName: 'Position Title',
        flex: 1,
        minWidth: 150
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        minWidth: 120
    },
    {
        field: 'followUpDate',
        headerName: 'Follow Up Date',
        flex: 1,
        minWidth: 120
    },
    {
        field: 'applicationLink',
        headerName: 'Application Link',
        flex: 1,
        minWidth: 200,
        renderCell: (params: GridRenderCellParams) => (
            <a href={params.value as string} target="_blank" rel="noopener noreferrer">
                {params.value}
            </a>
        )
    },
    {
        field: 'note',
        headerName: 'Notes',
        flex: 1,
        minWidth: 200
    },
];

// Random data generation helpers
function randomFrom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
        .toISOString().split('T')[0];
}

function randomCompanyName() {
    const companies = ["Google", "Amazon", "Netflix", "Meta", "Apple", "Microsoft", "Tesla", "OpenAI", "Stripe", "Airbnb"];
    return randomFrom(companies);
}

function randomPositionTitle() {
    const titles = ["Software Engineer", "Data Scientist", "Product Manager", "UX Designer", "DevOps Engineer", "QA Analyst"];
    return randomFrom(titles);
}

function randomStatus() {
    return randomFrom(["Pending", "Interview", "Rejected", "Offer", "Assessment", "Phone Screen"]);
}

function randomNote() {
    const notes = [
        "Follow up next week.",
        "Sent coding challenge.",
        "Waiting for recruiter response.",
        "Prepare for interview.",
        "No response yet.",
        "Check application portal."
    ];
    return randomFrom(notes);
}

function randomUrl() {
    const domains = ["google.com", "amazon.jobs", "netflix.com", "meta.com", "apple.com", "microsoft.com"];
    return `https://careers.${randomFrom(domains)}/apply/${Math.floor(Math.random() * 10000)}`;
}

function generateTestApplications(count: number = 10) {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setDate(today.getDate() - 30);
    return Array.from({ length: count }, (_, i) => ({
        applicationID: 1000 + i,
        companyName: randomCompanyName(),
        positionTitle: randomPositionTitle(),
        applicationDate: randomDate(lastMonth, today),
        status: randomStatus(),
        followUpDate: randomDate(today, new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)),
        applicationLink: randomUrl(),
        note: randomNote(),
    }));
}

export default function Applications() {
    const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
    const [applications, setApplications] = useState<ApplicationData[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch applications from the API when the component mounts or when the authentication state changes
    useEffect(() => {
        const loadApplications = async () => {
            if (!isAuthenticated) {
                setApplications([]);
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const { data } = await api.get('/applications', getAccessTokenSilently);
                setApplications(data);
            } catch (e) {
                setApplications([]);
            }
            setLoading(false);
        };
        if (!isLoading) {
            loadApplications();
        }
    }, [getAccessTokenSilently, isAuthenticated, isLoading]);

    const handleTestData = () => {
        setApplications(generateTestApplications(12));
        setLoading(false);
    };

    return (
        <div style={{
            width: '100%',
            maxHeight: 'inherit',
            height: 'inherit',
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
            margin: 0,
        }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography variant="h5" sx={{ mr: 2 }}>
                    Applications
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={handleTestData}
                >
                    Test View
                </Button>
            </Box>
            <DataGrid
                rows={applications}
                columns={columns}
                getRowId={(row) => row.applicationID}
                disableRowSelectionOnClick
                loading={loading}
                initialState={{
                    pagination: { paginationModel: { pageSize: 25 } },
                }}
                sx={{
                    border: 0,
                }}
            />
        </div>
    );
}
