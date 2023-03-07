const userLanguage = navigator.language.slice(0, 2);

const localization =
  userLanguage === 'ru'
    ? {
        summary: 'Составит ваша прибыль при текущих показателях',
        total: 'Итого',
        invested: 'Вложено',
        initialInvestment: 'Стартовый капитал',
        payment: 'Пополнение',
        frequency: 'Раз в',
        interestRate: 'Ежегодный процент',
        investmentPeriod: 'Срок инвестирования',
        years: 'Лет',
        compoundingFrequency: 'Период реинвестирования',
        day: 'день',
        week: 'неделя',
        month: 'месяц',
        quater: 'квартал',
        year: 'год',
        currency: '₽',
      }
    : {
        summary: 'Return on investment (ROI) with given arguments',
        total: 'Total',
        invested: 'Invested',
        initialInvestment: 'Initial capital',
        payment: 'Replenishment',
        frequency: 'Once a',
        interestRate: 'Interest rate',
        investmentPeriod: 'Investment period',
        years: 'Years',
        compoundingFrequency: 'Compounding frequency',
        day: 'day',
        week: 'week',
        month: 'month',
        quater: 'quater',
        year: 'year',
        currency: '$',
      };

export default localization;
export { userLanguage as language };
