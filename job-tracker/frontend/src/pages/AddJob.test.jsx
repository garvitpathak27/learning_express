import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AddJob from './AddJob';
import * as api from '../services/api';

vi.mock('../services/api');

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn()
  };
});

test('renders form fields', () => {
  render(
    <BrowserRouter>
      <AddJob />
    </BrowserRouter>
  );

  expect(screen.getByPlaceholderText('Company')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Role')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Notes')).toBeInTheDocument();
  expect(screen.getByText('Add Job')).toBeInTheDocument();
});

test('submits form and calls API', async () => {
  api.createJob.mockResolvedValue({ data: { id: 1, company: 'Google' } });

  render(
    <BrowserRouter>
      <AddJob />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText('Company'), {
    target: { value: 'Google' }
  });
  fireEvent.change(screen.getByPlaceholderText('Role'), {
    target: { value: 'Backend Engineer' }
  });
  fireEvent.change(screen.getByLabelText('Applied Date'), {
    target: { value: '2026-02-26' }
k  });

  fireEvent.click(screen.getByText('Add Job'));

  await waitFor(() => {
    expect(api.createJob).toHaveBeenCalled();
  });
});
