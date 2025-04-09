/*
- should render name, email, and password input fields
- should update the input values when typing
- should call onSubmit when the register button is clicked
*/

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  const mockData = {
    name: 'User1',
    email: 'user@example.com',
    password: 'secret123',
  };

  test('should render name, email, and password input fields', () => {
    render(<SignUpForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('should update the input values when typing', () => {
    render(<SignUpForm onSubmit={vi.fn()} />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(nameInput, { target: { value: mockData.name } });
    fireEvent.change(emailInput, { target: { value: mockData.email } });
    fireEvent.change(passwordInput, { target: { value: mockData.password } });

    expect(nameInput).toHaveValue(mockData.name);
    expect(emailInput).toHaveValue(mockData.email);
    expect(passwordInput).toHaveValue(mockData.password);
  });

  test('should call onSubmit when the register button is clicked', () => {
    const handleSubmit = vi.fn();

    render(<SignUpForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: mockData.name },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: mockData.email },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: mockData.password },
    });

    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    expect(handleSubmit).toHaveBeenCalledWith(mockData);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
