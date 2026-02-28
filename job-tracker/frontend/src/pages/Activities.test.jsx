import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Activities from './Activities';
import * as api from '../services/api';

vi.mock('../services/api');

test('renders activity log from API', async () => {
  api.getActivities.mockResolvedValue({
    data: [
      { _id: '1', company: 'Google', action: 'CREATED', timestamp: '2026-02-26T11:47:42.657Z' }
    ]
  });

  render(
    <BrowserRouter>
      <Activities />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('CREATED')).toBeInTheDocument();
  });
});
