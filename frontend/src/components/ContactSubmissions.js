import React, { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Typography,
  TextField,
} from '@mui/material';
import '../css/Admin.css';

function ContactSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    ApiService.getContactSubmissions()
      .then((response) => {
        setSubmissions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching submissions', error);
        setError('Error fetching submissions');
        setLoading(false);
      });
  }, []);

  // Filter submissions based on the search query
  const filteredSubmissions = submissions.filter((submission) =>
    submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    submission.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    submission.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-panel-container">
      <Typography variant="h4" gutterBottom className="admin-panel-title">
        Contact Form Submissions
      </Typography>

      {/* Search input field */}
      <TextField
        label="Search Submissions"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      {loading && <CircularProgress />}
      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Date Submitted</TableCell>
                <TableCell>Actions</TableCell> {/* Add an Actions column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>{submission.name}</TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell>{submission.message}</TableCell>
                  <TableCell>{new Date(submission.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {/* Download CSV Button for each submission */}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => ApiService.downloadSingleCSV(submission.id)} // Call the new API function
                    >
                      Download CSV
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default ContactSubmissions;
