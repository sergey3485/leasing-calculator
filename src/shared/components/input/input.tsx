import * as React from 'react';

import { Typography } from '../typography';
import { Slider } from '../slider';

import { isNumeric, limitNumberWithinRange } from '../../../features/lib';

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

export interface InputTestProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  maxValue: number;
  minValue: number;
  addiction?: string;
  initialPayment?: string;
  onSliderValueChange: (value: number[]) => void;
  value: string;
}

export interface InputPercentProps extends InputTestProps {
  initialPayment: string;
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

export const InputNumeric = (props: InputNumericProps) => {
  const {
    onChange,
    onBlur,
    onValueChange,
    minValue,
    maxValue,
    value,
    ...other
  } = props;

  React.useEffect(() => {
    onValueChange?.(
      limitNumberWithinRange(value ? +value : 0, minValue, maxValue),
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minValue, maxValue, onValueChange]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);

    const newValue = !event.currentTarget.value ? '0' : event.currentTarget.value;

    if (isNumeric(newValue)) {
      onValueChange?.(+newValue);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(event);

    onValueChange?.(
      limitNumberWithinRange(+event.currentTarget.value.replace(/\s/g, ''), minValue, maxValue),
    );
  };

  return (
    <input
      {...other}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

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
              value={value.toString()}
              variant="percent"
            />
          </div>

          <input className={styles.input} value={value.toLocaleString('ru')} type="text" {...other} />

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
              value={value.toString()}
            />
          </div>

          <span className={styles.firstPayment}>
            {`${initialPayment} ₽`}
          </span>

          <div className={styles.percentInputWrapper}>
            <InputNumeric className={styles.inputPercent} value={value} type="text" maxLength={2} {...other} />

            <span className={styles.signPercent}>
              {addiction}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface InputNumericProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: number) => void;
  minValue?: number;
  maxValue?: number;
}

export const InputTest = (props: InputTestProps): JSX.Element => {
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
              value={value}
              variant="percent"
            />
          </div>

          <InputNumeric
            className={styles.input}
            value={Number(value).toLocaleString('ru')}
            type="text"
            maxValue={maxValue}
            minValue={minValue}
            {...other}
          />

          <span className={styles.sign}>
            {addiction}
          </span>
        </div>
      </div>
    </div>
  );
};
