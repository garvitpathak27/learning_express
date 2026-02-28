import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import * as api from '../services/api';

// Mock the API calls
vi.mock('../services/api');

test('renders job list from API', async () => {
  api.getAllJobs.mockResolvedValue({
    data: [
      { id: 1, company: 'Google', role: 'Backend Engineer', status: 'APPLIED', appliedDate: '2026-02-26', notes: 'Referral' }
    ]
  });

  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Backend Engineer')).toBeInTheDocument();
  });
});

test('renders empty table when no jobs', async () => {
  api.getAllJobs.mockResolvedValue({ data: [] });

  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.queryByText('Google')).not.toBeInTheDocument();
  });
});
