/*
- should render email and password input fields
- should update the input values when typing
- should call onSubmit when login button is clicked
*/

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../LoginForm';

describe('LoginForm', () => {
  test('should render email and password input fields', () => {
    render(<LoginForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('should update the input values when typing', () => {
    render(<LoginForm onSubmit={vi.fn()} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'secret123' } });

    expect(emailInput).toHaveValue('user@example.com');
    expect(passwordInput).toHaveValue('secret123');
  });

  test('should call onSubmit with email and password when login button is clicked', () => {
    const handleSubmit = vi.fn();

    render(<LoginForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'secret123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(handleSubmit).toHaveBeenCalledWith('user@example.com', 'secret123');
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
