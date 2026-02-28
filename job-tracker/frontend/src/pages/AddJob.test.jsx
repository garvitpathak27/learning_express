import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn()
  };
});

test('renders form fields', async () => {
  const { default: AddJob } = await import('./AddJob');

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

