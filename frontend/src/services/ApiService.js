import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';  // Update with your actual backend URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const ApiService = {
  getProjects() {
    return apiClient.get('/projects');
  },

  sendMessage(data) {
    return apiClient.post('/contact', data);
  },

  // Fetch contact submissions from the backend
  getContactSubmissions: () => {
      return apiClient.get('/contact-submissions');
  },

  // Add this function to ApiService.js
downloadCSV: () => {
    console.log("Download CSV button clicked");
    return axios({
      url: `${API_BASE_URL}/export-submissions`,  // Adjust this URL as needed
      method: 'GET',
      responseType: 'blob',  // Important to set the response type to blob for file download
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'contact_submissions.csv');  // Filename for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch(error => {
      console.error("Error downloading CSV", error);
    });
  }
};

export default ApiService;