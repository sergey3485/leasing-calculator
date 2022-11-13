import * as React from 'react';

import * as SliderPrimitive from '@radix-ui/react-slider';

import { limitNumberWithinRange } from '../../../features/lib';

import styles from './slider.module.scss';

export interface SliderProps {
  minValue: number;
  maxValue: number;
  onValueChange: (value: number[]) => void;
  value: string;
  variant?: 'percent' | 'default',
}

export const Slider = (props: SliderProps): JSX.Element => {
  const {
    minValue,
    maxValue,
    onValueChange,
    value,
    variant = 'default',
  } = props;

  return (
    <SliderPrimitive.Root
      className={variant === 'default' ? styles.rootPercent : styles.root}
      min={minValue}
      max={maxValue}
      step={1}
      onValueChange={onValueChange}
      value={[limitNumberWithinRange(Number(value), minValue, maxValue)]}
    >
      <SliderPrimitive.Track className={styles.track}>
        <SliderPrimitive.Range className={styles.range} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className={styles.thumb} />
    </SliderPrimitive.Root>
  );
};
