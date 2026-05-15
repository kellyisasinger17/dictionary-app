import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dictionary search page', () => {
  render(<App />);
  const searchInput = screen.getByRole('searchbox', { name: /search word/i });
  const title = screen.getByRole('heading', { name: /dictionary/i });
  const entry = screen.getByRole('heading', { name: /sunset/i });

  expect(searchInput).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(entry).toBeInTheDocument();
});
