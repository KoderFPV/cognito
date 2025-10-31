'use client';

import { useTranslations } from 'next-intl';
import styles from './LoginForm.module.scss';

export const LoginForm = () => {
  const t = useTranslations('cms.login');

  return (
    <div className={styles.loginForm}>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="email">{t('email')}</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">{t('password')}</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">{t('submit')}</button>
        <a href="#">{t('forgotPassword')}</a>
      </form>
    </div>
  );
};
