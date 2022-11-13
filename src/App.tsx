/* eslint-disable max-len */
import React from 'react';
import { useUnit } from 'effector-react';
import { Button } from './shared/components/button';
import { Typography } from './shared/components/typography';
import {
  $autoCost,
  $monthlyPayment,
  $fullSum,
  $leasingTerms,
  $firstPayment,
  $paymentPercent,
  changeAutoCost,
  changeSliderAutoCostValue,
  changeLeasingTerms,
  changeLeasingTermsSliderValue,
  changeFirstPaymentPercent,
  changeFirstPaymentPercentSliderValue,
} from './features/logic/calculator.model';
import { InputPercent, InputTest } from './shared/components/input';
import { Layout } from './shared/components/layout';
import { ResultAnnounce } from './shared/components/result-announce';

import styles from './shared/components/layout/layout.module.scss';

export const App = () => {
  const {
    autoCost,
    monthlyPayment,
    fullSum,
    leasingTerms,
    firstPayment,
    paymentPercent,
  } = useUnit({
    autoCost: $autoCost,
    monthlyPayment: $monthlyPayment,
    fullSum: $fullSum,
    leasingTerms: $leasingTerms,
    firstPayment: $firstPayment,
    paymentPercent: $paymentPercent,
  });

  const [isLoading, setIsLoading] = React.useState(false);

  // const createRequest = async () => {
  //   setIsLoading(true);

  //   const request = {
  //     car_coast: leasingData.car_cost,
  //     initail_payment: leasingData.initial_payment,
  //     initail_payment_percent: leasingData.initial_payment_percent,
  //     lease_term: leasingData.lease_term,
  //     total_sum: leasingData.total_sum,
  //     monthly_payment_from: leasingData.monthly_payment_from,
  //   };

  //   console.log(request);

  //   try {
  //     await fetch('https://hookb.in/eK160jgYJ6UlaRPldJ1P', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(request),
  //     });
  //   } catch (error) { console.log(error); } finally {
  //     setIsLoading(false);
  //   }
  // };
  return (
    <Layout>

      <div className={styles.titleContainer}>
        <Typography variant="h1" component="h1">
          Рассчитайте стоимость автомобиля в лизинг
        </Typography>
      </div>

      <div className={styles.inputsContainer}>
        <InputTest
          title="Стоимость автомобиля"
          addiction="₽"
          // onBlur={() => lostFocusAutoCost()}
          onChange={((event) => changeAutoCost(event.currentTarget.value))}
          onSliderValueChange={(event) => changeSliderAutoCostValue(event[0].toString())}
          minValue={1000000}
          maxValue={6000000}
          value={autoCost}
          disabled={isLoading}
        />

        <InputPercent
          title="Первоначальный взнос"
          addiction="%"
          onChange={(event) => changeFirstPaymentPercent(event.currentTarget.value)}
          onSliderValueChange={(event) => changeFirstPaymentPercentSliderValue(event[0].toString())}
          value={paymentPercent}
          initialPayment={firstPayment}
          minValue={10}
          maxValue={60}
          disabled={isLoading}
        />

        <InputTest
          title="Срок лизинга"
          addiction="мес."
          onChange={(event) => changeLeasingTerms(event.currentTarget.value)}
          onSliderValueChange={(event) => changeLeasingTermsSliderValue(event[0].toString())}
          value={leasingTerms}
          minValue={1}
          maxValue={60}
          disabled={isLoading}
        />
      </div>

      <div className={styles.resultContainer}>
        <ResultAnnounce title="Сумма договора лизинга" value={fullSum} />

        <ResultAnnounce title="Ежемесячный платеж от" value={monthlyPayment} />

        <Button isLoading={isLoading} disabled={isLoading}>
          Оставить заявку
        </Button>
      </div>
    </Layout>
  );
};

export default App;
