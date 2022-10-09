import * as React from 'react';

import styles from './typography.module.scss';

export interface TypographyProps {
  /**
   * The content
   */
  children: React.ReactNode;

  component: React.ElementType;
}

export const Typography = (props: TypographyProps): JSX.Element => {
  const {
    children,
    component: Component = 'span',
  } = props;

  return (
    <Component>{children}</Component>
  );
};
