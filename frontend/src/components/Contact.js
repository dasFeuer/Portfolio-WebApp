import React, { useState, useCallback } from 'react';
import ApiService from '../services/ApiService';
import '../css/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = useCallback(() => {
    const formErrors = {};
    if (!formData.name.trim()) formErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) formErrors.message = 'Message is required';
    return formErrors;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitStatus(null);
      try {
        await ApiService.sendMessage(formData);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } catch (error) {
        console.error("There was an error sending the message!", error);
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(formErrors);
    }
  }, [formData, validateForm]);

  return (
    <div className="contact-container">
      <h2 className="contact-title">Get in Touch</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label className="form-label" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && <div className="invalid-feedback" role="alert">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && <div className="invalid-feedback" role="alert">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="message">Message</label>
          <textarea
            id="message"
            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message here..."
            rows="5"
            aria-invalid={errors.message ? 'true' : 'false'}
          ></textarea>
          {errors.message && <div className="invalid-feedback" role="alert">{errors.message}</div>}
        </div>
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      {submitStatus === 'success' && (
        <div className="alert alert-success" role="alert">Message sent successfully!</div>
      )}
      {submitStatus === 'error' && (
        <div className="alert alert-error" role="alert">Failed to send message. Please try again.</div>
      )}
    </div>
  );
};

export default Contact;