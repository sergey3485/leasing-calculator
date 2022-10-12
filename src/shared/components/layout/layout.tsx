import * as React from 'react';

import styles from './layout.module.scss';

export interface LayoutProps {

  // content
  children: React.ReactNode;
}

export const Layout = (props: LayoutProps): JSX.Element => {
  const { children } = props;
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};
