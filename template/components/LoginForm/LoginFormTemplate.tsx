import styles from './LoginFormTemplate.module.scss';

export interface LoginFormTemplateProps {
  title: string;
  subtitle: string;
  emailLabel: string;
  passwordLabel: string;
  submitLabel: string;
  forgotPasswordLabel: string;
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onForgotPasswordClick: () => void;
}

export const LoginFormTemplate = ({
  title,
  subtitle,
  emailLabel,
  passwordLabel,
  submitLabel,
  forgotPasswordLabel,
  email,
  password,
  isLoading,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onForgotPasswordClick,
}: LoginFormTemplateProps) => {
  return (
    <div className={styles.loginForm}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            {emailLabel}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className={styles.input}
            disabled={isLoading}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            {passwordLabel}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            className={styles.input}
            disabled={isLoading}
            required
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : submitLabel}
        </button>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onForgotPasswordClick();
          }}
          className={styles.forgotPassword}
        >
          {forgotPasswordLabel}
        </a>
      </form>
    </div>
  );
};
