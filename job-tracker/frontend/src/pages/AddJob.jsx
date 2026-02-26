import { useState } from 'react';
import { createJob } from '../services/api';
import { useNavigate } from 'react-router-dom';

function AddJob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    company: '', role: '', status: 'APPLIED', appliedDate: '', notes: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createJob(form).then(() => navigate('/'));
  };

  return (
    <div className="card light">
      <h2>Add Job Application</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="centered-table">
          <table className="form-table">
            <tbody>
            <tr>
              <th><label htmlFor="company">Company</label></th>
              <td>
                <input id="company" className="input" name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <th><label htmlFor="role">Role</label></th>
              <td>
                <input id="role" className="input" name="role" placeholder="Role" value={form.role} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <th><label htmlFor="status">Status</label></th>
              <td>
                <select id="status" className="select" name="status" value={form.status} onChange={handleChange}>
                  <option value="APPLIED">Applied</option>
                  <option value="INTERVIEW">Interview</option>
                  <option value="OFFER">Offer</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </td>
            </tr>
            <tr>
              <th><label htmlFor="appliedDate">Applied Date</label></th>
              <td>
                <input id="appliedDate" className="input" name="appliedDate" type="date" value={form.appliedDate} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <th><label htmlFor="notes">Notes</label></th>
              <td>
                <textarea id="notes" className="input" name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} rows={4} />
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="center">
                <button className="btn primary" type="submit">Add Job</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}

export default AddJob;