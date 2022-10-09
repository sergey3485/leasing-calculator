import * as React from 'react';

import LoaderIcon from '../icons/loader-icon';
import styles from './button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button = (props: ButtonProps) => {
  const {
    children,
    isLoading,
    onClick,
    type = 'button',
    ...other
  } = props;

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={styles.button}
      onClick={!isLoading ? onClick : undefined}
      {...other}
    >
      {!isLoading && children}

      {isLoading && (
        <div className={styles.loaderWrapper}>
          <LoaderIcon color="white" fontSize="inherit" />
        </div>
      )}
    </button>
  );
};
