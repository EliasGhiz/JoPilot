import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

interface ApplicationData {
    applicationID: number;
    companyName: string;
    positionTitle: string;
    applicationLink: string;
    note: string;
    applicationDate: string; // mm/dd/yy
    status: string;
    followUpDate: string;
}

const sampleApplications: ApplicationData[] = [
    {
        applicationID: 1,
        companyName: "Acme Corp",
        positionTitle: "Software Engineer",
        applicationLink: "https://acme.com/jobs/123",
        note: "Interview scheduled",
        applicationDate: "09/25/23",
        status: "Interview",
        followUpDate: "10/10/23"
    },
    {
        applicationID: 2,
        companyName: "Globex Inc.",
        positionTitle: "Frontend Developer",
        applicationLink: "https://globex.com/careers/456",
        note: "Awaiting feedback",
        applicationDate: "09/20/23",
        status: "Applied",
        followUpDate: "09/30/23"
    }
];

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
        field: 'status',
        headerName: 'Status',
        flex: 1,
        minWidth: 120
    },
    {
        field: 'note',
        headerName: 'Notes',
        flex: 1,
        minWidth: 200
    },
];

export default function Applications() {
    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Applications
            </Typography>
            <Box sx={{ height: '70vh', width: '100%' }}>
                <DataGrid
                    rows={sampleApplications}
                    columns={columns}
                    getRowId={(row) => row.applicationID}
                    disableRowSelectionOnClick
                    sx={{ border: 0 }}
                />
            </Box>
        </Box>
    );
}
