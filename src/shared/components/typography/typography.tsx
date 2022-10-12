import * as React from 'react';

import styles from './typography.module.scss';

export interface TypographyProps {
  /**
   * The content
   */
  children: React.ReactNode;
  component: React.ElementType;
  variant: 'h1' | 'title' | 'result';
}

export const Typography = (props: TypographyProps): JSX.Element => {
  const {
    children,
    component: Component = 'span',
    variant,
  } = props;

  return (
    <Component className={styles[variant]}>{children}</Component>
  );
};
