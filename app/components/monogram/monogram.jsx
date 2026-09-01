import { forwardRef, useId } from 'react';
import { classes } from '~/utils/style';
import styles from './monogram.module.css';

export const Monogram = forwardRef(({ className, highlight, ...props }, ref) => {
  return (
    <div className={classes(styles.monogramContainer, className)} ref={ref} {...props}>
      <img
        src="/logo.png"
        alt="JJ"
        className={styles.logoImage}
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <div className={styles.fallbackLogo} style={{ display: 'none' }}>
        JJ
      </div>
    </div>
  );
});
