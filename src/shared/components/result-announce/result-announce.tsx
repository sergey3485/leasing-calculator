import * as React from 'react';

import { Typography } from '../typography';

import styles from './result-announce.module.scss';

export interface ResultAnnounceProps {
  title: string;
  value: number;
}

export const ResultAnnounce = (props: ResultAnnounceProps): JSX.Element => {
  const { title, value } = props;

  return (
    <div className={styles.root}>
      <Typography component="span" variant="title">
        {title}
      </Typography>

      <div className={styles.wrapper}>
        <Typography component="span" variant="result">
          {value.toLocaleString('ru')}
        </Typography>

        <Typography component="span" variant="result">
          ₽
        </Typography>
      </div>
    </div>
  );
};
