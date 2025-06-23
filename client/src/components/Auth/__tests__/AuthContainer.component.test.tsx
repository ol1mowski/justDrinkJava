import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../../../test/utils/test-utils';
import { AuthContainer } from '../components/AuthContainer.component';
import userEvent from '@testing-library/user-event';

describe('AuthContainer', () => {
  const mockOnLogin = vi.fn();
  const mockOnRegister = vi.fn();
  const mockOnGoogleLogin = vi.fn();
  const mockOnGithubLogin = vi.fn();
  const mockOnForgotPassword = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render login form by default', () => {
    render(
      <AuthContainer
        onLogin={mockOnLogin}
        onRegister={mockOnRegister}
        onGoogleLogin={mockOnGoogleLogin}
        onGithubLogin={mockOnGithubLogin}
        onForgotPassword={mockOnForgotPassword}
      />
    );

    expect(screen.getByText('Logowanie')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('twoj@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Wprowadź hasło')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /zaloguj się/i })
    ).toBeInTheDocument();
  });

  it('should switch to register form when register tab is clicked', async () => {
    const user = userEvent.setup();

    render(
      <AuthContainer
        onLogin={mockOnLogin}
        onRegister={mockOnRegister}
        onGoogleLogin={mockOnGoogleLogin}
        onGithubLogin={mockOnGithubLogin}
        onForgotPassword={mockOnForgotPassword}
      />
    );

    const registerTab = screen.getByText('Rejestracja');
    await user.click(registerTab);

    expect(screen.getByText('Dołącz do nas!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Powtórz hasło')).toBeInTheDocument();
  });

  it('should call onLogin when login form is submitted with valid data', async () => {
    const user = userEvent.setup();

    render(
      <AuthContainer
        onLogin={mockOnLogin}
        onRegister={mockOnRegister}
        onGoogleLogin={mockOnGoogleLogin}
        onGithubLogin={mockOnGithubLogin}
        onForgotPassword={mockOnForgotPassword}
      />
    );

    const emailInput = screen.getByPlaceholderText('twoj@email.com');
    const passwordInput = screen.getByPlaceholderText('Wprowadź hasło');
    const submitButton = screen.getByRole('button', { name: /zaloguj się/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false,
      });
    });
  });

  it('should call onRegister when register form is submitted with valid data', async () => {
    const user = userEvent.setup();

    render(
      <AuthContainer
        onLogin={mockOnLogin}
        onRegister={mockOnRegister}
        onGoogleLogin={mockOnGoogleLogin}
        onGithubLogin={mockOnGithubLogin}
        onForgotPassword={mockOnForgotPassword}
      />
    );

    // Switch to register tab
    const registerTab = screen.getByText('Rejestracja');
    await user.click(registerTab);

    const emailInput = screen.getByPlaceholderText('twoj@email.com');
    const passwordInput = screen.getByPlaceholderText('Minimum 8 znaków');
    const confirmPasswordInput = screen.getByPlaceholderText('Powtórz hasło');
    const submitButton = screen.getByRole('button', {
      name: /zarejestruj się/i,
    });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.type(confirmPasswordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnRegister).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      });
    });
  });

  it('should call onGithubLogin when GitHub button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <AuthContainer
        onLogin={mockOnLogin}
        onRegister={mockOnRegister}
        onGoogleLogin={mockOnGoogleLogin}
        onGithubLogin={mockOnGithubLogin}
        onForgotPassword={mockOnForgotPassword}
      />
    );

    const githubButton = screen.getByRole('button', {
      name: /kontynuuj z github/i,
    });
    await user.click(githubButton);

    expect(mockOnGithubLogin).toHaveBeenCalled();
  });

  it('should call onForgotPassword when forgot password link is clicked', async () => {
    const user = userEvent.setup();

    render(
      <AuthContainer
        onLogin={mockOnLogin}
        onRegister={mockOnRegister}
        onGoogleLogin={mockOnGoogleLogin}
        onGithubLogin={mockOnGithubLogin}
        onForgotPassword={mockOnForgotPassword}
      />
    );

    const forgotPasswordLink = screen.getByText('Zapomniałeś hasła?');
    await user.click(forgotPasswordLink);

    expect(mockOnForgotPassword).toHaveBeenCalled();
  });

  it('should display error message when error prop is provided', () => {
    const errorMessage = 'Nieprawidłowe dane logowania';

    render(
      <AuthContainer
        onLogin={mockOnLogin}
        onRegister={mockOnRegister}
        onGoogleLogin={mockOnGoogleLogin}
        onGithubLogin={mockOnGithubLogin}
        onForgotPassword={mockOnForgotPassword}
        error={errorMessage}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should show loading state when isLoading is true', async () => {
    render(<AuthContainer isLoading={true} />);

    // When loading, the submit button should show "Ładowanie..." text
    const submitButton = screen.getByRole('button', { name: /ładowanie/i });
    expect(submitButton).toBeDisabled();
  });
});
