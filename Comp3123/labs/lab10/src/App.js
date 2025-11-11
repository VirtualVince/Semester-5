import { useState } from 'react';
import './App.css';

export default function App() {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    address2: '',
    city: '',
    province: '',
    postalCode: '',
    agreeTerms: false
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      alert('Please agree to terms and conditions');
      return;
    }
    setSubmittedData(formData);
  };

  const provinces = [
    'Choose...',
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Nova Scotia',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan'
  ];

  return (
    <div className="app-container">
      <div className="form-wrapper">
        <h1>Data Entry Form</h1>

        <div className="form-container">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="1234 Main St"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address2">Address 2</label>
            <input
              type="text"
              id="address2"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              placeholder="Apartment, studio, or floor"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="province">Province</label>
              <select
                id="province"
                name="province"
                value={formData.province}
                onChange={handleChange}
                required
              >
                {provinces.map((prov, index) => (
                  <option key={index} value={prov === 'Choose...' ? '' : prov}>
                    {prov}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            <label htmlFor="agreeTerms">Agree Terms & Condition?</label>
          </div>

          <button onClick={handleSubmit} className="submit-btn">
            Submit
          </button>
        </div>

        {submittedData && (
          <div className="result-container">
            <table className="result-table">
              <tbody>
                <tr>
                  <td className="label">Email:</td>
                  <td className="value">{submittedData.email}</td>
                </tr>
                <tr>
                  <td className="label">Full Name:</td>
                  <td className="value">{submittedData.fullName}</td>
                </tr>
                <tr>
                  <td className="label">Address:</td>
                  <td className="value">
                    {submittedData.address}
                    {submittedData.address2 && `, ${submittedData.address2}`}
                  </td>
                </tr>
                <tr>
                  <td className="label">City:</td>
                  <td className="value">{submittedData.city}</td>
                </tr>
                <tr>
                  <td className="label">Province:</td>
                  <td className="value">{submittedData.province}</td>
                </tr>
                <tr>
                  <td className="label">Postal Code:</td>
                  <td className="value">{submittedData.postalCode}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}