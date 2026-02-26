import { useEffect, useState } from 'react';
import { getActivities } from '../services/api';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getActivities().then(res => setActivities(res.data));
  }, []);

  return (
    <div className="card">
      <h2>Activity Log</h2>
      <div className="centered-table">
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Action</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(a => (
              <tr key={a._id}>
                <td>{a.company}</td>
                <td>{a.action}</td>
                <td>{new Date(a.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;