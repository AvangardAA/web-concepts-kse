import { render, screen } from '@testing-library/react';
import App from './App';

test('check price', () => {
  render(<App />);
  const checkPrice = screen.getByText(/Current price/i);
  expect(checkPrice).toBeInTheDocument();
});
