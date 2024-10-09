import React, { useEffect, useState, useCallback } from 'react';
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

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSubmissions = useCallback(async () => {
    try {
      const response = await ApiService.getContactSubmissions();
      setSubmissions(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching submissions', error);
      setError('Error fetching submissions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleDelete = useCallback(async (id) => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      try {
        await ApiService.deleteContactSubmission(id);
        await fetchSubmissions();
      } catch (error) {
        console.error('Error deleting submission', error);
        setError('Error deleting submission');
      }
    }
  }, [fetchSubmissions]);

  const handleDownloadSingleCSV = useCallback(async (id) => {
    try {
      await ApiService.downloadSingleCSV(id);
    } catch (error) {
      console.error('Error downloading CSV', error);
      setError('Error downloading CSV');
    }
  }, []);

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
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDownloadSingleCSV(submission.id)}
                    >
                      Download CSV
                    </Button>
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
};

export default ContactSubmissions;