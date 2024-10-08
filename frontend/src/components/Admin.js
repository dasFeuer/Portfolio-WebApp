import React, { useEffect, useState, useContext } from 'react';
import ApiService from '../services/ApiService';
import { ThemeContext } from './ThemeContext';
import '../css/Admin.css';

function Admin() {
  const [submissions, setSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useContext(ThemeContext);


  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getContactSubmissions();
      const submissionsData = Array.isArray(response.data) ? response.data : response.data.content || [];
      setSubmissions(submissionsData);
    } catch (error) {
      console.error("There was an error fetching the submissions!", error);
      setError("Failed to load submissions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filteredSubmissions = submissions.filter(submission =>
    submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleDownloadCSV = async () => {
    try {
      await ApiService.downloadCSV();
    } catch (error) {
      console.error("Error downloading CSV:", error);
      alert("Failed to download CSV. Please try again.");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className={`admin-container ${darkMode ? 'dark' : ''}`}>
      <h2>Contact Form Submissions</h2>
      <div className="admin-actions">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="download-btn" onClick={handleDownloadCSV}>
          Download CSV
        </button>
      </div>
      {filteredSubmissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <table className="submissions-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Actions</th> {/* Added for delete action */}
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.map((submission, index) => (
              <tr key={index}>
                <td>{submission.name}</td>
                <td>{submission.email}</td>
                <td>{submission.message}</td>
                <td>
                  {/* Add a delete button */}
                  <button className="delete-btn" onClick={() => handleDelete(submission.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Admin;
