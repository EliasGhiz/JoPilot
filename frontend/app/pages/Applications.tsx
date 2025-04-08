import { Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import type { ApplicationData } from 'app/api/pages/Applications';

// Helper functions and arrays for random generation
function getRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function formatDate(date: Date): string {
  const mm = ("0" + (date.getMonth() + 1)).slice(-2);
  const dd = ("0" + date.getDate()).slice(-2);
  const yy = date.getFullYear().toString().slice(-2);
  return `${mm}/${dd}/${yy}`;
}

const companyPrefixes = ["Alpha", "Beta", "Gamma", "Delta", "Tech", "Info", "Global", "United", "Vision", "Next"];
const companyNouns = ["Solutions", "Technologies", "Systems", "Concepts", "Dynamics", "Networks", "Innovations", "Software", "Analytics"];
const companySuffixes = ["Inc", "LLC", "Corp"];
  
const techJobTitles = [
  "DevOps Engineer", "Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer",
  "Site Reliability Engineer", "Cloud Engineer", "Security Engineer", "Data Engineer", "Mobile Developer",
  "QA Engineer", "Infrastructure Engineer", "Platform Engineer", "Machine Learning Engineer", "Embedded Software Engineer",
  "Release Engineer", "Automation Engineer", "Database Administrator", "Systems Engineer", "Application Developer"
];

const statusOptions = [
  "In Progress", "Under Consideration", "For Future Consideration",
  "Interviewing", "Interviewed", "Rejected",
  "Offer", "Offer Accepted", "Offer Declined", "Rejected"
];

function generateSampleApplications(count: number): ApplicationData[] {
  const applications: ApplicationData[] = [];
  const startDate = new Date("2024-01-01");
  const endDate = new Date("2025-04-01");

  for (let i = 0; i < count; i++) {
    const appDate = getRandomDate(startDate, endDate);
    const followUp = new Date(appDate);
    followUp.setDate(appDate.getDate() + 10);

    const companyName = `${companyPrefixes[Math.floor(Math.random() * companyPrefixes.length)]} ${companyNouns[Math.floor(Math.random() * companyNouns.length)]} ${companySuffixes[Math.floor(Math.random() * companySuffixes.length)]}`;
    const positionTitle = techJobTitles[Math.floor(Math.random() * techJobTitles.length)];
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    const applicationID = i + 1;
    
    applications.push({
      applicationID,
      companyName,
      positionTitle,
      applicationLink: `https://test.com/job/${applicationID}`,
      note: "This is a test note.",
      applicationDate: formatDate(appDate),
      status,
      followUpDate: formatDate(followUp)
    });
  }
  return applications;
}

const sampleApplications: ApplicationData[] = generateSampleApplications(200);

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
                rows={sampleApplications}
                columns={columns}
                getRowId={(row) => row.applicationID}
                disableRowSelectionOnClick
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
