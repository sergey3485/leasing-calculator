/* eslint-disable max-len */
import * as React from 'react';

import { getInitialPayment, getMonthlyPayment, getFullSum } from '../lib';

import { defaultData } from '../constants/default-values';

export const useLeasingDataControl = () => {
  const [leasingData, setLeasingData] = React.useState(defaultData);

  const changeInputValueMonth = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(Number(event.currentTarget.value))) {
      return;
    }
    const newMonth = Number(event.currentTarget.value);

    if (newMonth >= 60) {
      setLeasingData({
        ...leasingData,
        lease_term: 60,
        monthly_payment_from: getMonthlyPayment(leasingData.initial_payment, leasingData.car_cost, 60),
        total_sum: getFullSum(leasingData.initial_payment_percent, leasingData.car_cost, 60),
      });
      return;
    }

    if (newMonth <= 1) {
      setLeasingData({
        ...leasingData,
        lease_term: 1,
        monthly_payment_from: getMonthlyPayment(leasingData.initial_payment, leasingData.car_cost, 1),
        total_sum: getFullSum(leasingData.initial_payment_percent, leasingData.car_cost, 1),
      });
      return;
    }

    setLeasingData({
      ...leasingData,
      lease_term: newMonth,
      monthly_payment_from: getMonthlyPayment(leasingData.initial_payment, leasingData.car_cost, newMonth),
      total_sum: getFullSum(leasingData.initial_payment_percent, leasingData.car_cost, newMonth),
    });
  };

  const changeMonth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMonth = Number(event.currentTarget.value);
    if (newMonth <= 1) {
      setLeasingData({
        ...leasingData,
        lease_term: 1,
        monthly_payment_from: getMonthlyPayment(leasingData.initial_payment, leasingData.car_cost, 1),
        total_sum: getFullSum(leasingData.initial_payment_percent, leasingData.car_cost, 1),
      });
      return;
    }

    if (newMonth >= 60) {
      setLeasingData({
        ...leasingData,
        lease_term: 60,
        monthly_payment_from: getMonthlyPayment(leasingData.initial_payment, leasingData.car_cost, 60),
        total_sum: getFullSum(leasingData.initial_payment_percent, leasingData.car_cost, 60),
      });
      return;
    }

    setLeasingData({
      ...leasingData,
      lease_term: newMonth,
      monthly_payment_from: getMonthlyPayment(leasingData.initial_payment, leasingData.car_cost, newMonth),
      total_sum: getFullSum(leasingData.initial_payment_percent, leasingData.car_cost, newMonth),
    });
  };

  const changeSliderValueMonth = (value: number[]) => {
    setLeasingData({
      ...leasingData,
      lease_term: value[0],
      monthly_payment_from: getMonthlyPayment(leasingData.initial_payment, leasingData.car_cost, value[0]),
      total_sum: getFullSum(leasingData.initial_payment_percent, leasingData.car_cost, value[0]),
    });
  };

  const changeInputValuePercent = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(Number(event.currentTarget.value))) {
      return;
    }
    const newPercent = Number(event.currentTarget.value);

    if (newPercent <= 10) {
      setLeasingData({
        ...leasingData,
        initial_payment_percent: newPercent,
        initial_payment: getInitialPayment(10, leasingData.car_cost),
        total_sum: getFullSum(10, leasingData.car_cost, leasingData.lease_term),

      });
      return;
    }
    if (newPercent >= 60) {
      setLeasingData({
        ...leasingData,
        initial_payment_percent: 60,
        initial_payment: getInitialPayment(60, leasingData.car_cost),
        total_sum: getFullSum(60, leasingData.car_cost, leasingData.lease_term),

      });
      return;
    }
    setLeasingData({
      ...leasingData,
      initial_payment_percent: newPercent,
      initial_payment: getInitialPayment(newPercent, leasingData.car_cost),
      total_sum: getFullSum(newPercent, leasingData.car_cost, leasingData.lease_term),
    });
  };

  const changePercent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPercent = Number(event.currentTarget.value);
    if (newPercent <= 10) {
      setLeasingData({
        ...leasingData,
        initial_payment_percent: 10,
        initial_payment: getInitialPayment(10, leasingData.car_cost),
        total_sum: getFullSum(10, leasingData.car_cost, leasingData.lease_term),

      });
      return;
    }

    if (newPercent >= 60) {
      setLeasingData({
        ...leasingData,
        initial_payment_percent: 60,
        initial_payment: getInitialPayment(60, leasingData.car_cost),
        total_sum: getFullSum(60, leasingData.car_cost, leasingData.lease_term),

      });
      return;
    }

    setLeasingData({
      ...leasingData,
      initial_payment_percent: newPercent,
      initial_payment: getInitialPayment(newPercent, leasingData.car_cost),
      total_sum: getFullSum(newPercent, leasingData.car_cost, leasingData.lease_term),
    });
  };

  const changeSliderValuePercent = (value: number[]) => {
    setLeasingData({
      ...leasingData,
      initial_payment_percent: value[0],
      initial_payment: getInitialPayment(value[0], leasingData.car_cost),
      total_sum: getFullSum(value[0], leasingData.car_cost, leasingData.lease_term),
    });
  };

  const changeInputValueCarCoast = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(Number(event.currentTarget.value.replace(/\s/g, '')))) {
      return;
    }
    const newCarCoast = Number(event.currentTarget.value.replace(/\s/g, ''));

    if (newCarCoast <= 1000000) {
      setLeasingData({
        ...leasingData,
        car_cost: newCarCoast,
        initial_payment: getInitialPayment(leasingData.initial_payment_percent, 1000000),
        monthly_payment_from: getMonthlyPayment(leasingData.initial_payment, 1000000, leasingData.lease_term),
        total_sum: getFullSum(leasingData.initial_payment_percent, 1000000, leasingData.lease_term),
      });
      return;
    }

    if (newCarCoast >= 6000000) {
      setLeasingData({
        ...leasingData,
        car_cost: 6000000,
        initial_payment: getInitialPayment(leasingData.initial_payment_percent, 6000000),
        monthly_payment_from: getMonthlyPayment(leasingData.initial_payment, 6000000, leasingData.lease_term),
        total_sum: getFullSum(leasingData.initial_payment_percent, 6000000, leasingData.lease_term),
      });
      return;
    }
    setLeasingData({
      ...leasingData,
      car_cost: newCarCoast,
      monthly_payment_from: getMonthlyPayment(leasingData.initial_payment, newCarCoast, leasingData.lease_term),
      total_sum: getFullSum(leasingData.initial_payment_percent, newCarCoast, leasingData.lease_term),
    });
  };

  const changeCarCoast = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCarCoast = Number(event.currentTarget.value.replace(/\s/g, ''));
    if (newCarCoast <= 1000000) {
      setLeasingData({
        ...leasingData,
        car_cost: 1000000,
        initial_payment: getInitialPayment(leasingData.initial_payment_percent, 1000000),
        monthly_payment_from: getMonthlyPayment(leasingData.initial_payment, 1000000, leasingData.lease_term),
        total_sum: getFullSum(leasingData.initial_payment_percent, 1000000, leasingData.lease_term),
      });
      return;
    }

    if (newCarCoast >= 6000000) {
      setLeasingData({
        ...leasingData,
        car_cost: 6000000,
        initial_payment: getInitialPayment(leasingData.initial_payment_percent, 6000000),
        monthly_payment_from: getMonthlyPayment(leasingData.initial_payment, 6000000, leasingData.lease_term),
        total_sum: getFullSum(leasingData.initial_payment_percent, 6000000, leasingData.lease_term),
      });
      return;
    }

    setLeasingData({
      ...leasingData,
      car_cost: newCarCoast,
      initial_payment: getInitialPayment(leasingData.initial_payment_percent, newCarCoast),
      monthly_payment_from: getMonthlyPayment(leasingData.initial_payment, newCarCoast, leasingData.lease_term),
      total_sum: getFullSum(leasingData.initial_payment_percent, newCarCoast, leasingData.lease_term),
    });
  };

  const changeSliderValueCarCoast = (value: number[]) => {
    setLeasingData({
      ...leasingData,
      car_cost: value[0],
      initial_payment: getInitialPayment(leasingData.initial_payment_percent, value[0]),
      monthly_payment_from: getMonthlyPayment(leasingData.initial_payment, value[0], leasingData.lease_term),
      total_sum: getFullSum(leasingData.initial_payment_percent, value[0], leasingData.lease_term),
    });
  };

  return {
    changeInputValueCarCoast,
    changeCarCoast,
    changeSliderValueCarCoast,
    changeInputValueMonth,
    changeMonth,
    changeSliderValueMonth,
    changeInputValuePercent,
    changePercent,
    changeSliderValuePercent,
    leasingData,
    setLeasingData,
  };
};
