import { fireEvent, render, screen } from '@testing-library/react';
import { store } from './store';
import App from './App';
import { Provider } from 'react-redux';

test('renders button', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByRole('button')
  expect(linkElement).toBeInTheDocument();
});

test('renders link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const link = screen.getByRole('link');
  expect(link).toBeInTheDocument()
})