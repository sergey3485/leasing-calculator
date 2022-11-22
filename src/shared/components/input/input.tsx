import * as React from 'react';

import { Typography } from '../typography';
import { Slider } from '../slider';

import { isNumeric, limitNumberWithinRange } from '../../../features/lib';

import styles from './input.module.scss';

export interface InputTestProps extends InputNumericProps {
  title: string;
  maxValue: number;
  minValue: number;
  addiction?: string;
  onSliderValueChange: (value: number[]) => void;
  value: number;
}

export interface InputPercentProps extends InputTestProps {
  initialPayment: number;
}

export interface InputNumericProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: number) => void;
  minValue?: number;
  maxValue?: number;
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

    const newValue = !event.currentTarget.value ? '0' : event.currentTarget.value.replace(/\s/g, '');

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
      value={value?.toLocaleString('ru')}
      onChange={handleChange}
      onBlur={handleBlur}
    />
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
    onValueChange,
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
              value={value}
            />
          </div>

          <span className={styles.firstPayment}>
            {`${initialPayment.toLocaleString('ru')} ₽`}
          </span>

          <div className={styles.percentInputWrapper}>
            <InputNumeric
              className={styles.inputPercent}
              onValueChange={onValueChange}
              value={value}
              maxValue={maxValue}
              minValue={minValue}
              type="text"
              maxLength={2}
              {...other}
            />

            <span className={styles.signPercent}>
              {addiction}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InputTest = (props: InputTestProps): JSX.Element => {
  const {
    title,
    maxValue,
    minValue,
    addiction,
    onSliderValueChange,
    onValueChange,
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
            value={value}
            type="text"
            maxValue={maxValue}
            minValue={minValue}
            onValueChange={onValueChange}
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
