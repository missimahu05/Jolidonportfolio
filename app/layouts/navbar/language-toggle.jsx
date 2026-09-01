import { Button } from '~/components/button';
import { useLanguage } from '~/components/language-provider';
import styles from './theme-toggle.module.css';

export const LanguageToggle = ({ isMobile, ...rest }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      className={styles.toggle}
      data-mobile={isMobile}
      aria-label="Toggle language"
      onClick={() => toggleLanguage()}
      {...rest}
      style={{ minWidth: '48px', padding: '0 8px', fontSize: '14px', fontWeight: 'bold' }}
    >
      {language.toUpperCase()}
    </Button>
  );
};
