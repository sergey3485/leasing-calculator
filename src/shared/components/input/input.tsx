import * as React from 'react';

import { Typography } from '../typography';
import { Slider } from '../slider';

import styles from './input.module.scss';

export interface InputRoot extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  maxValue: number;
  minValue: number;
  addiction: string;
  value: number;
  onSliderValueChange: (value: number[]) => void;
  disabled: boolean;
}

export interface InputPercentProps extends InputProps {
  initialPayment: number;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  maxValue: number;
  minValue: number;
  addiction?: string;
  initialPayment?: number;
  onSliderValueChange: (value: number[]) => void;
  value: number;
}

export const Input = (props: InputProps): JSX.Element => {
  const {
    title,
    maxValue,
    minValue,
    addiction,
    initialPayment,
    onSliderValueChange,
    value,
    disabled,
    ...other
  } = props;

  return (
    <div className={styles.inputRoot}>
      <Typography component="span" variant="title">
        {title}
      </Typography>
      <div className={disabled ? styles.disabled : styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.sliderContainer}>
            <Slider
              onValueChange={onSliderValueChange}
              maxValue={maxValue}
              minValue={minValue}
              value={Number(value)}
            />
          </div>

          <input className={styles.input} value={value.toLocaleString('ru')} type="text" maxLength={9} {...other} />

          <span className={styles.sign}>
            {addiction}
          </span>
        </div>
      </div>
    </div>
  );
};

export const InputPercent = (props: InputPercentProps): JSX.Element => {
  const {
    title,
    onSliderValueChange,
    maxValue,
    minValue,
    value,
    initialPayment,
    addiction,
    disabled,
    ...other
  } = props;

  return (
    <div className={styles.inputRoot}>
      <Typography component="span" variant="title">
        {title}
      </Typography>
      <div className={disabled ? styles.disabled : styles.wrapperPercent}>
        <div className={styles.container}>
          <div className={styles.sliderContainer}>
            <Slider
              onValueChange={onSliderValueChange}
              maxValue={maxValue}
              minValue={minValue}
              value={Number(value)}
            />
          </div>

          <span className={styles.firstPayment}>
            {`${initialPayment.toLocaleString('ru')} ₽`}
          </span>

          <div className={styles.percentInputWrapper}>
            <input className={styles.inputPercent} value={value} type="text" maxLength={2} {...other} />

            <span className={styles.signPercent}>
              {addiction}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
