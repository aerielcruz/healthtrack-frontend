import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Signup } from '@/pages/signup';
import { api } from '@/api';
import { describe, test, expect, beforeEach, vi } from 'vitest';

vi.mock('@/api');

describe('Signup component', () => {
  const mockOnSuccess = vi.fn();
  const mockOnSwitchToLogin = vi.fn();
  const mockSetLoading = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders all form fields', () => {
    render(
      <Signup
        onSuccess={mockOnSuccess}
        onSwitchToLogin={mockOnSwitchToLogin}
        loading={false}
        setLoading={mockSetLoading}
      />
    );

    expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/John/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Doe/i)).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText(/••••••••/i)[0]).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText(/••••••••/i)[1]).toBeInTheDocument();
  });

  test('shows validation errors when submitting empty form', async () => {
    render(
      <Signup
        onSuccess={mockOnSuccess}
        onSwitchToLogin={mockOnSwitchToLogin}
        loading={false}
        setLoading={mockSetLoading}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Please confirm your password/i)).toBeInTheDocument();
  });

  test('calls API on valid form submit', async () => {
    // @ts-ignore
    (api.auth.register as unknown as vi.Mock).mockResolvedValueOnce({});

    render(
      <Signup
        onSuccess={mockOnSuccess}
        onSwitchToLogin={mockOnSwitchToLogin}
        loading={false}
        setLoading={mockSetLoading}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/John/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Doe/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getAllByPlaceholderText(/••••••••/i)[0], { target: { value: 'Password123' } });
    fireEvent.change(screen.getAllByPlaceholderText(/••••••••/i)[1], { target: { value: 'Password123' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    await waitFor(() => {
      expect(api.auth.register).toHaveBeenCalledWith({
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        password: 'Password123',
      });
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  test('displays API error message on failure', async () => {
    // @ts-ignore
    (api.auth.register as unknown as vi.Mock).mockRejectedValueOnce(new Error('Failed to register'));

    render(
      <Signup
        onSuccess={mockOnSuccess}
        onSwitchToLogin={mockOnSwitchToLogin}
        loading={false}
        setLoading={mockSetLoading}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/John/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Doe/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getAllByPlaceholderText(/••••••••/i)[0], { target: { value: 'Password123' } });
    fireEvent.change(screen.getAllByPlaceholderText(/••••••••/i)[1], { target: { value: 'Password123' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    expect(await screen.findByText(/Failed to register/i)).toBeInTheDocument();
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
});
