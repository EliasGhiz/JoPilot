import { Typography } from "@mui/material";
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
            <Typography variant="h5">
                Applications
            </Typography>
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
