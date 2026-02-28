import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

test('renders all navigation links', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  expect(screen.getByText('Dashboard')).toBeInTheDocument();
  expect(screen.getByText('Add Job')).toBeInTheDocument();
  expect(screen.getByText('Activities')).toBeInTheDocument();
});
