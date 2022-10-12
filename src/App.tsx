/* eslint-disable max-len */
import React from 'react';
import { Button } from './shared/components/button';
import { Typography } from './shared/components/typography';
import { Input, InputPercent } from './shared/components/input';
import { Layout } from './shared/components/layout';
import { ResultAnnounce } from './shared/components/result-announce';

import { useLeasingDataControl } from './features/hooks/use-leasing-data-control';

import styles from './shared/components/layout/layout.module.scss';

export const App = () => {
  const {
    changeInputValueCarCoast,
    changeCarCoast,
    changeSliderValueCarCoast,
    changeMonth,
    changeInputValueMonth,
    changeSliderValueMonth,
    changeInputValuePercent,
    changePercent,
    changeSliderValuePercent,
    leasingData,
  } = useLeasingDataControl();

  const [isLoading, setIsLoading] = React.useState(false);

  const createRequest = async () => {
    setIsLoading(true);

    const request = {
      car_coast: leasingData.car_cost,
      initail_payment: leasingData.initial_payment,
      initail_payment_percent: leasingData.initial_payment_percent,
      lease_term: leasingData.lease_term,
      total_sum: leasingData.total_sum,
      monthly_payment_from: leasingData.monthly_payment_from,
    };

    console.log(request);

    try {
      await fetch('https://hookb.in/eK160jgYJ6UlaRPldJ1P', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
    } catch (error) { console.log(error); } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>

      <div className={styles.titleContainer}>
        <Typography variant="h1" component="h1">
          Рассчитайте стоимость автомобиля в лизинг
        </Typography>
      </div>

      <div className={styles.inputsContainer}>
        <Input
          title="Стоимость автомобиля"
          addiction="₽"
          onBlur={changeCarCoast}
          onChange={changeInputValueCarCoast}
          onSliderValueChange={changeSliderValueCarCoast}
          minValue={1000000}
          maxValue={6000000}
          value={leasingData.car_cost}
          disabled={isLoading}
        />

        <InputPercent
          title="Первоначальный взнос"
          addiction="%"
          onBlur={changePercent}
          onChange={changeInputValuePercent}
          onSliderValueChange={changeSliderValuePercent}
          value={leasingData.initial_payment_percent}
          initialPayment={leasingData.initial_payment}
          minValue={10}
          maxValue={60}
          disabled={isLoading}
        />

        <Input
          title="Срок лизинга"
          addiction="мес."
          onBlur={changeMonth}
          onChange={changeInputValueMonth}
          onSliderValueChange={changeSliderValueMonth}
          value={leasingData.lease_term}
          minValue={1}
          maxValue={60}
          disabled={isLoading}
        />
      </div>

      <div className={styles.resultContainer}>
        <ResultAnnounce title="Сумма договора лизинга" value={leasingData.total_sum} />

        <ResultAnnounce title="Ежемесячный платеж от" value={leasingData.monthly_payment_from} />

        <Button onClick={() => createRequest()} isLoading={isLoading} disabled={isLoading}>
          Оставить заявку
        </Button>
      </div>
    </Layout>
  );
};

export default App;
