import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { default as text, language } from '../localization';

export default function Calculator(): JSX.Element {

  const [interval, setInterval] = useState(1);
  const [open, setOpen] = useState(false);
  const [openReinvest, setOpenReinvest] = useState(false);
  const [interest, setInterest] = useState('5');
  const [compoundingFrequency, setCompoundingFrequency] = useState(text.year);
  const [initialCapital, setInitialCapital] = useState('10000');
  const [payment, setPayment] = useState('0');
  const [years, setYears] = useState('10');
  const [result, setResult] = useState({
    sum: 0,
    cost: 0,
  });

  const handleBlur = () => {
    if (+interest < 0) {
      setInterest('0');
    } else if (interest === '') {
      setInterest('0');
    } else if (+interest > 100) {
      setInterest('100');
    }
  };

  const handleYearsBlur = () => {
    if (+years < 0) {
      setYears('0');
    } else if (years === '') {
      setYears('0');
    } else if (+years > 100) {
      setYears('100');
    }
  };

  useEffect(() => {
    function calculate() {
      let initialCapitalAlias = +initialCapital;
      let paymentAlias = +payment;
      let yearsAlias = +years >= 100 ? 100 : +years;
      let interestAlias = +interest;
      let sum: string | number = initialCapitalAlias;
      let cost: number;
      let count = 0;

      switch (compoundingFrequency) {
        case text.day:
          {
            for (let i = 0; i < yearsAlias; i++) {
              for (let i = 1; i <= 365; i++) {
                count++;
                if (count % 1 === 0) {
                  sum *= interestAlias / (100 * 365) + 1;
                }
                if (count % Math.floor(365 / interval) === 0) {
                  sum += paymentAlias;
                }
              }
            }
          }
          break;
        case text.week:
          {
            for (let i = 0; i < yearsAlias; i++) {
              for (let i = 1; i <= 365; i++) {
                count++;
                if (count % 7 === 0) {
                  sum *= interestAlias / (100 * 52) + 1;
                }
                if (count % Math.floor(365 / interval) === 0) {
                  sum += paymentAlias;
                }
              }
            }
          }
          break;
        case text.month:
          {
            for (let i = 0; i < yearsAlias; i++) {
              for (let i = 1; i <= 365; i++) {
                count++;
                if (count % 30.42 > 0 && count % 30.42 <= 1) {
                  sum *= interestAlias / (100 * 12) + 1;
                }
                if (count % Math.floor(365 / interval) === 0) {
                  sum += paymentAlias;
                }
              }
            }
          }
          break;
        case text.quater:
          {
            for (let i = 0; i < yearsAlias; i++) {
              for (let i = 1; i <= 365; i++) {
                count++;
                if (count % 91.25 > 0 && count % 91.25 <= 1) {
                  sum *= interestAlias / (100 * 4) + 1;
                }
                if (count % Math.floor(365 / interval) === 0) {
                  sum += paymentAlias;
                }
              }
            }
          }
          break;
        case text.year:
          {
            for (let i = 0; i < yearsAlias; i++) {
              for (let i = 1; i <= 365; i++) {
                count++;
                if (count % 365 === 0) {
                  sum *= interestAlias / (100 * 1) + 1;
                }
                if (count % Math.floor(365 / interval) === 0) {
                  sum += paymentAlias;
                }
              }
            }
          }
          break;
        default:
          throw new Error("This time range isn't specified!");
      }
      cost = initialCapitalAlias + paymentAlias * interval * yearsAlias;
      setResult({
        sum: sum < 2 ** 52 - 1 ? Math.floor(sum) : 2 ** 52 - 1,
        cost: cost < 2 ** 52 - 1 ? Math.floor(cost) : 2 ** 52 - 1,
      });
    }

    calculate();
  }, [
    initialCapital,
    interval,
    interest,
    payment,
    years,
    compoundingFrequency,
  ]);

  function addSpaces(num: number) {
    const numString = num.toString();
    const reversedString = numString.split('').reverse().join('');
    const spacedString = reversedString.replace(/(\d{3})/g, '$1 ').trim();
    return spacedString.split('').reverse().join('');
  }

  function handleRadio(e: React.ChangeEvent<HTMLInputElement>) {
    setCompoundingFrequency(e.target.value);
  }

  return (
    <Paper
      sx={{
        backgroundColor: 'white',
        borderRadius: { xs: 8, sm: 10, md: 12 },
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 2, sm: 3, md: 5 },
      }}
    >
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {/* Result */}
        <Grid item xs={12}>
          <Paper
            sx={{
              width: '100%',
              bgcolor: '#1c1b1f',
              borderRadius: { xs: 6, sm: 8, md: 8 },
              px: { xs: 3, sm: 6, md: 8 },
              py: { xs: 3, sm: 4, md: 6 },
              color: 'white',
              mb: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Grid
              container
              spacing={{ xs: 1.4, sm: 2, md: 1 }}
              alignItems="flex-end"
            >
              <Grid item xs={12}>
                <Typography
                  variant="h2"
                  fontWeight="medium"
                  sx={{
                    fontSize: {
                      xs:
                        result.sum - result.cost > 99999999
                          ? '1.5rem'
                          : '2.125rem',
                      sm: 38,
                      md: 50,
                      xl: 60,
                    },
                    lineHeight: {
                      xs: '2.55rem',
                      sm: '2.75rem',
                      md: '3.75rem',
                      xl: '4.5rem',
                    },
                  }}
                >
                  {`${
                    result.cost > 999999999999 || result.sum > 999999999999
                      ? '...'
                      : addSpaces(result.sum - result.cost) +
                        ' ' +
                        text.currency
                  }`}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="regular"
                  sx={{
                    fontSize: {
                      xs: '1.125rem',
                      md: 20,
                    },
                    mt: 1,
                    lineHeight: '125%',
                    color: '#938F99',
                    display: { xs: 'block', sm: 'none' },
                    width: '20ch'
                  }}
                >
                  {text.summary}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6.5}>
                <Typography
                  variant="h6"
                  fontWeight="regular"
                  sx={{
                    fontSize: {
                      xs: '1rem',
                      md: 20,
                    },
                    lineHeight: '125%',
                    color: '#938F99',
                    display: { xs: 'none', sm: 'block' },
                    width: '20ch',
                  }}
                >
                  {text.summary}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={5.5}
                color="#938F99"
                container
                rowSpacing={0}
                direction="column"
              >
                <Grid
                  item
                  display="flex"
                  alignItems="baseline"
                  sx={{
                    justifyContent: { xs: 'space-between', md: 'start' },
                  }}
                >
                  <Typography
                    variant="body1"
                    width={language === 'ru' ? '8.5ch' : '8ch'}
                  >
                    {text.total}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: {
                        xs:
                          result.sum > 99999999 || result.cost > 99999999
                            ? '1rem'
                            : '1.25rem',
                        sm: 20,
                      },
                      lineHeight: '100%',
                    }}
                  >
                    {`${
                      result.sum > 999999999999 ? '...' : addSpaces(result.sum)
                    }` +
                      ' ' +
                      text.currency}
                  </Typography>
                </Grid>
                <Grid
                  item
                  display="flex"
                  alignItems="baseline"
                  sx={{
                    justifyContent: { xs: 'space-between', md: 'start' },
                  }}
                >
                  <Typography
                    variant="body1"
                    width={language === 'ru' ? '8.5ch' : '8ch'}
                  >
                    {text.invested}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: {
                        xs:
                          result.sum > 99999999 || result.cost > 99999999
                            ? '1rem'
                            : '1.25rem',
                        sm: 20,
                      },
                      lineHeight: '100%',
                    }}
                  >
                    {`${
                      result.cost > 999999999999
                        ? '...'
                        : addSpaces(result.cost)
                    }` +
                      ' ' +
                      text.currency}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {/* Initial capital, replenishment, frequency */}
        <Grid item xs={12} container spacing={{ xs: 2, sm: 3, md: 4 }}>
          <Grid item container spacing={{ xs: 2, sm: 3, md: 2 }}>
            <Grid item xs={12} md={4.865}>
              <TextField
                label={text.initialInvestment}
                id="standard-start-adornment"
                name={text.initialInvestment}
                value={initialCapital}
                onChange={(e) => {
                  e.target.value === ''
                    ? setInitialCapital('0')
                    : setInitialCapital(e.target.value.replace(/^0/, ''));
                }}
                sx={{ width: '100%' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {text.currency}
                    </InputAdornment>
                  ),
                  type: 'number',
                }}
                variant="outlined"
                color="primary"
              />
            </Grid>
            <Grid
              item
              xs
              md={'auto'}
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              <Divider orientation="vertical" />
            </Grid>
            <Grid item xs={7} md={4.865}>
              <TextField
                label={text.payment}
                id="standard-start-adornment"
                value={payment}
                onChange={(e) =>
                  e.target.value === ''
                    ? setPayment('0')
                    : setPayment(e.target.value.replace(/^0/, ''))
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {text.currency}
                    </InputAdornment>
                  ),
                  type: 'number',
                }}
                sx={{ width: '100%' }}
                variant="outlined"
                color="primary"
              />
            </Grid>
            <Grid item xs={5} md={2}>
              <FormControl sx={{ width: '100%' }} variant="outlined">
                <InputLabel
                  id="demo-controlled-open-select-label"
                  color="primary"
                >
                  {text.frequency}
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={() => setOpen(!open)}
                  onOpen={() => setOpen(!open)}
                  value={interval}
                  label={text.frequency}
                  onChange={(event) => setInterval(+event.target.value)}
                  color="primary"
                >
                  <MenuItem value={365}>{text.day}</MenuItem>
                  <MenuItem value={52}>{text.week}</MenuItem>
                  <MenuItem value={12}>{text.month}</MenuItem>
                  <MenuItem value={4}>{text.quater}</MenuItem>
                  <MenuItem value={1}>{text.year}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        {/* Ежегодный процент, слайдер, ставка */}
        <Grid
          item
          xs={12}
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          alignItems="center"
        >
          <Grid
            item
            md={4}
            sx={{
              display: { xs: 'none', md: 'flex', alignSelf: 'center' },
            }}
          >
            <Typography
              variant="h6"
              fontWeight="regular"
              fontSize="1.125rem"
              color="grey"
            >
              {text.interestRate}
            </Typography>
          </Grid>
          <Grid item xs={9} md={6.3}>
            <Typography
              variant="body1"
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
              color="grey"
            >
              {text.interestRate}
            </Typography>
            <Slider
              value={+interest}
              onChange={(e, value) => {
                setInterest(`${value as number}`);
              }}
              aria-labelledby="input-slider"
              valueLabelDisplay="auto"
              sx={{
                color: '#F86E03',
                '& .MuiSlider-valueLabel': {
                  backgroundColor: '#F86E03',
                },
              }}
            />
          </Grid>
          <Grid item xs={3} md={1.7}>
            <TextField
              label="%"
              value={interest === '' ? '0' : interest}
              onChange={(e) => {
                +e.target.value < 0 && setInterest('0');
                +e.target.value > 100 && setInterest('100');
                +e.target.value >= 0 &&
                  +e.target.value <= 100 &&
                  setInterest(e.target.value.replace(/^0/, ''));
              }}
              onBlur={handleBlur}
              sx={{ width: '100%' }}
              inputProps={{
                step: 1,
                min: 0,
                max: 1000,
                type: 'number',
              }}
              variant="outlined"
              color="primary"
            />
          </Grid>
        </Grid>
        {/* Срок инвестирования, слайдер, лет */}
        <Grid
          item
          xs={12}
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          alignItems="center"
        >
          <Grid
            item
            md={4}
            container
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            <Typography
              variant="h6"
              fontWeight="regular"
              fontSize="1.125rem"
              color="grey"
            >
              {text.investmentPeriod}
            </Typography>
          </Grid>
          <Grid item xs={9} md={6.3}>
            <Typography
              variant="body1"
              sx={{ display: { xs: 'block', md: 'none' } }}
              color="grey"
            >
              {text.investmentPeriod}
            </Typography>
            <Slider
              value={+years}
              onChange={(e, value) => {
                setYears(`${value as number}`);
              }}
              valueLabelDisplay="auto"
              aria-labelledby="input-slider"
              sx={{
                color: '#F86E03',
                '& .MuiSlider-valueLabel': {
                  backgroundColor: '#F86E03',
                },
              }}
            />
          </Grid>
          <Grid item xs={3} md={1.7}>
            <TextField
              label={text.years}
              //   id="standard-start-adornment"
              value={years === '' ? '0' : years}
              onChange={(e) => {
                +e.target.value < 0 && setYears('0');
                +e.target.value > 100 && setYears('100');
                +e.target.value >= 0 &&
                  +e.target.value <= 100 &&
                  setYears(e.target.value.replace(/^0/, ''));
              }}
              onBlur={handleYearsBlur}
              sx={{ width: '100%' }}
              inputProps={{
                step: 1,
                min: 0,
                max: 100,
                type: 'number',
              }}
              variant="outlined"
              color="primary"
            />
          </Grid>
        </Grid>
        {/* Период реинвестирования */}
        <Grid
          item
          xs={12}
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          alignItems="center"
        >
          <Grid item xs={4} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Typography
              variant="h6"
              fontWeight="regular"
              fontSize="1.125rem"
              color="grey"
            >
              {text.compoundingFrequency}
            </Typography>
          </Grid>
          <Grid
            item
            xs={8}
            container
            sx={{ display: { xs: 'none', md: 'flex' } }}
            justifyContent="space-between"
          >
            <FormControlLabel
              name={text.compoundingFrequency}
              control={
                <Radio
                  value={text.day}
                  color="primary"
                  checked={compoundingFrequency === text.day}
                  onChange={handleRadio}
                />
              }
              label={text.day}
            />
            <FormControlLabel
              name={text.compoundingFrequency}
              control={
                <Radio
                  value={text.week}
                  color="primary"
                  checked={compoundingFrequency === text.week}
                  onChange={handleRadio}
                />
              }
              label={text.week}
            />
            <FormControlLabel
              name={text.compoundingFrequency}
              control={
                <Radio
                  value={text.month}
                  color="primary"
                  checked={compoundingFrequency === text.month}
                  onChange={handleRadio}
                />
              }
              label={text.month}
            />
            <FormControlLabel
              name={text.compoundingFrequency}
              control={
                <Radio
                  value={text.quater}
                  color="primary"
                  checked={compoundingFrequency === text.quater}
                  onChange={handleRadio}
                />
              }
              label={text.quater}
            />
            <FormControlLabel
              name={text.compoundingFrequency}
              control={
                <Radio
                  value={text.year}
                  color="primary"
                  checked={compoundingFrequency === text.year}
                  onChange={handleRadio}
                />
              }
              label={text.year}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: { xs: 'block', md: 'none' } }}>
            <FormControl
              sx={{ width: '100%' }}
              variant="outlined"
              color="primary"
            >
              <InputLabel id="demo-controlled-open-select-label">
                {text.compoundingFrequency}
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={openReinvest}
                onClose={() => setOpenReinvest(!openReinvest)}
                onOpen={() => setOpenReinvest(!openReinvest)}
                value={compoundingFrequency}
                label={text.compoundingFrequency}
                onChange={(event) =>
                  setCompoundingFrequency(event.target.value)
                }
              >
                <MenuItem value={text.day}>{text.day}</MenuItem>
                <MenuItem value={text.week}>{text.week}</MenuItem>
                <MenuItem value={text.month}>{text.month}</MenuItem>
                <MenuItem value={text.quater}>{text.quater}</MenuItem>
                <MenuItem value={text.year}>{text.year}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
