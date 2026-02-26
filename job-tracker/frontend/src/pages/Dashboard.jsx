import { useEffect, useState } from 'react';
import { getAllJobs, deleteJob } from '../services/api';

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getAllJobs().then(res => setJobs(res.data));
  }, []);

  const handleDelete = (id) => {
    deleteJob(id).then(() => setJobs(jobs.filter(j => j.id !== id)));
  };

  return (
    <div className="card">
      <h2>Job Applications</h2>
      <div className="centered-table">
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Applied Date</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id}>
                <td>{job.company}</td>
                <td>{job.role}</td>
                <td>{job.status}</td>
                <td>{job.appliedDate}</td>
                <td>{job.notes}</td>
                <td>
                  <button className="btn ghost" onClick={() => handleDelete(job.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;