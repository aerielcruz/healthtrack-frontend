import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest';
import { Login } from '@/pages/login';
import { api } from '@/api';

vi.mock('@/api');

describe('Login component', () => {
  const mockOnSuccess = vi.fn();
  const mockOnSwitchToSignup = vi.fn();
  const mockSetLoading = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(
      <Login
        onSuccess={mockOnSuccess}
        onSwitchToSignup={mockOnSwitchToSignup}
        loading={false}
        setLoading={mockSetLoading}
      />
    );

    expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(
      <Login
        onSuccess={mockOnSuccess}
        onSwitchToSignup={mockOnSwitchToSignup}
        loading={false}
        setLoading={mockSetLoading}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });

  it('calls API on valid form submit', async () => {
    (api.auth.login as unknown as Mock).mockResolvedValueOnce({ user: { id: 1, email: 'test@example.com' } });

    render(
      <Login
        onSuccess={mockOnSuccess}
        onSwitchToSignup={mockOnSwitchToSignup}
        loading={false}
        setLoading={mockSetLoading}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), { target: { value: 'Password123' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() => {
      expect(api.auth.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password123',
      });
      expect(mockOnSuccess).toHaveBeenCalledWith({ user: { id: 1, email: 'test@example.com' } });
    });
  });

  it('displays API error message on failure', async () => {
    (api.auth.login as unknown as Mock).mockRejectedValueOnce(new Error('Invalid credentials'));

    render(
      <Login
        onSuccess={mockOnSuccess}
        onSwitchToSignup={mockOnSwitchToSignup}
        loading={false}
        setLoading={mockSetLoading}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), { target: { value: 'Password123' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    expect(await screen.findByText(/Invalid credentials/i)).toBeInTheDocument();
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
});
