import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

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

  getContactSubmissions: () => {
    return apiClient.get('/contact-submissions');
  },

  deleteContactSubmission(id) {
    return apiClient.delete(`${API_BASE_URL}/contact-submissions/${id}`);
  },

  downloadCSV: () => {
    return axios({
      url: `${API_BASE_URL}/export-submissions`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'contact_submissions.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch(error => {
      console.error("Error downloading CSV", error);
    });
  },
};

export default ApiService;