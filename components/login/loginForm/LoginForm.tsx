'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LoginFormTemplate } from '@/template/components/LoginForm/LoginFormTemplate';

export const LoginForm = () => {
  const t = useTranslations('cms.login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement login logic
      console.log('Login attempt:', { email, password });
      // await loginService.login(email, password);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password logic
    console.log('Forgot password clicked');
  };

  return (
    <LoginFormTemplate
      title={t('title')}
      subtitle={t('subtitle')}
      emailLabel={t('email')}
      passwordLabel={t('password')}
      submitLabel={t('submit')}
      forgotPasswordLabel={t('forgotPassword')}
      email={email}
      password={password}
      isLoading={isLoading}
      error={error}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      onForgotPasswordClick={handleForgotPassword}
    />
  );
};
