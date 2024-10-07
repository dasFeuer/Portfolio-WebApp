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
    fetchSubmissions();
  }, []);

  const fetchSubmissions = () => {
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
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      ApiService.deleteContactSubmission(id)
        .then(() => {
          fetchSubmissions(); // Refresh the list after deletion
        })
        .catch((error) => {
          console.error('Error deleting submission', error);
          setError('Error deleting submission');
        });
    }
  };

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
                <TableCell>Actions</TableCell>
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
                      onClick={() => ApiService.downloadSingleCSV(submission.id)}
                    >
                      Download CSV
                    </Button>
                    {/* Delete button for each submission */}
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(submission.id)}
                      style={{ marginLeft: '10px' }}
                    >
                      Delete
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
