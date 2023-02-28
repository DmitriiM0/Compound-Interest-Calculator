import React, { useState, useEffect } from 'react'
import './App.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';

const Input = styled(MuiInput)`
  width: 54px;
`;

export default function App() {
  const [interval, setInterval] = useState(1);
  const [open, setOpen] = useState(false);
  const [interest, setInterest] = useState(5);
  const [horizon, setHorizon] = useState('year');
  const [deposit, setDeposit] = useState(10000);
  const [payment, setPayment] = useState(0);
  const [years, setYears] = useState(10);
  const [result, setResult] = useState({
	sum: 0,
	cost: 0
  });

  const handleSliderChange = (event) => {
	setInterest(+event.target.value);
  };

  const handleYearsChange = (event) => {
	setYears(event.target.value);
  }
  
  const handleInputChange = (event) => {
	setInterest(event.target.value === '' ? '' : Number(event.target.value));
  };
  
  const handleBlur = () => {
	if (interest < 0) {
	  setInterest(0);
	} else if (typeof interest === "string") {
	  setInterest(0);
	} else if (interest > 100) {
	  setInterest(100);
	}
  };

  const handleYearsBlur = () => {
	if (years < 0) {
	  setYears(0);
	} else if ( typeof years === "string") {
	  setYears(0);
	} else if (years > 100) {
	  setYears(100);
	}
  }

  useEffect(() => {
	function calculate() {
	  let depositAlias = deposit === "" ? 0 : +deposit;
	  let paymentAlias = payment === "" ? 0 : +payment;
	  let sum = depositAlias;
	  let cost;
	
	  switch(horizon) {
	    case 'day':
	  	{
	  	  for(let i = 0; i < years; i++) {
	  		for(let i = 0; i < 365; i++) {
	  		  sum = (sum + paymentAlias) * (interest / (100 * 365) + 1);
	  		}
	  	  }
	  	  cost = depositAlias + paymentAlias * 365 * years;
	  	}
	  	break;
	    case "week":
	  	{
	  	  for(let i = 0; i < years; i++) {
	  		for(let i = 0; i < 52; i++) {
	  		  sum = (sum + paymentAlias) * (interest / (100 * 52) + 1);
	  		}
	  	  }
	  	  cost = depositAlias + paymentAlias * 52 * years;
	  	};
	  	break;
	    case "month":
	  	{
	  	  for(let i = 0; i < years; i++) {
	  		for(let i = 0; i < 12; i++) {
	  		  sum = (sum + paymentAlias) * (interest / (100 * 12) + 1);
	  		}
	  	  }
	  	  cost = depositAlias + paymentAlias * 12 * years;
	  	};
	  	break;
	    case "quater":
	  	{
	  	  for(let i = 0; i < years; i++) {
	  		for(let i = 0; i < 4; i++) {
	  		  sum = (sum + paymentAlias) * (interest / (100 * 4) + 1);
	  		}
	  	  }
	  	  cost = depositAlias + paymentAlias * 4 * years;
	  	};
	  	break;
	    case "year":
	  	{
	  	  for(let i = 0; i < years; i++) {
	  		sum = (sum + paymentAlias * interval) * (interest / 100 + 1)
	  	  }
	  	  cost = depositAlias + paymentAlias * interval * years;
	  	};
	  	break;
	    default:
	  	throw new Error("This time range isn't specified!")
	  }
	  setResult({
	    sum: sum > (2**52 - 1) ? "..." : Math.floor(sum),
	    cost: cost > (2**52 - 1) ? "..." : Math.floor(cost),
	  })
	}

	calculate();
  }, [deposit, interval, interest, payment, years])
  

  function addSpaces(num) {
	const numString = num.toString();
	const reversedString = numString.split('').reverse().join('');
	const spacedString = reversedString.replace(/(\d{3})/g, '$1 ').trim();
	return spacedString.split('').reverse().join('');
  }

  return (
  <>
	<Box sx={{ width: 400, backgroundColor: 'white', p: 4, borderRadius: 5 }} >
	  <Typography variant="h4" gutterBottom>Калькулятор</Typography>
	  <Grid container columns={12} spacing={2}>
		<Grid item xs={12}>
		  <TextField
			label="Стартовый капитал"
			id="standard-start-adornment"
			name="deposit"
			value={deposit}
			onChange={(e) => {
			  e.target.value === "" ? setDeposit("") : setDeposit(e.target.value.replace(/^0/, ""))
			}}
			sx={{width: "100%"}}
			InputProps={{
			  startAdornment: <InputAdornment position="start">₽</InputAdornment>,
			  type: 'number',
			}}
			variant="standard"
		  />
		</Grid>
		<Grid item xs={8}>
		  <TextField
			label="Пополнение"
			id="standard-start-adornment"
			value={payment}
			onChange={(e) => e.target.value === "" ? setPayment("") : setPayment(e.target.value.replace(/^0/, ""))}
			InputProps={{
			  startAdornment: <InputAdornment position="start">₽</InputAdornment>,
			  type: 'number',
			}}
			sx={{width: "100%"}}
			variant="standard"
		  />
		</Grid>
		<Grid item  xs={4}>
		  <FormControl sx={{width: "100%"}} variant="standard">
			<InputLabel id="demo-controlled-open-select-label">Интервал</InputLabel>
			<Select
			  labelId="demo-controlled-open-select-label"
			  id="demo-controlled-open-select"
			  open={open}
			  onClose={() => setOpen(!open)}
			  onOpen={() => setOpen(!open)}
			  value={interval}
			  label="Интервал"
			  onChange={(event) => setInterval(event.target.value)}
			>
			  <MenuItem value={365}>Раз в сутки</MenuItem>
			  <MenuItem value={52}>Раз в неделю</MenuItem>
			  <MenuItem value={12}>Раз в месяц</MenuItem>
			  <MenuItem value={4}>Раз в квартал</MenuItem>
			  <MenuItem value={1}>Раз в год</MenuItem>
			</Select>
		  </FormControl>
		</Grid>
		<Grid item xs={8}>
		  <Typography id="input-slider" gutterBottom>
			Ежегодный процент
		  </Typography>
		  <Slider
			value={typeof interest === 'number' ? interest : 0}
			onChange={handleSliderChange}
			aria-labelledby="input-slider"
			valueLabelDisplay="auto"
		  />
		</Grid>
		<Grid item xs={4}>
		  <FormControl sx={{width: "100%"}} variant="standard">
			<InputLabel id="demo-controlled-open-select-label">Ставка</InputLabel>
			<Input
			  value={interest}
			  size="small"
			  sx={{width: "100%"}}
			  onChange={handleInputChange}
			  onBlur={handleBlur}
			  pattern={{}}
			  inputProps={{
				step: 1,
				min: 0,
				max: 1000,
				type: 'number',
			  }}
			/>
		  </FormControl>
		</Grid>
		<Grid item xs={8}>
		  <Typography >
			Срок инвестирования
		  </Typography>
		  <Slider
			value={typeof years === 'number' ? years : 0}
			onChange={handleYearsChange}
			valueLabelDisplay="auto"
			aria-labelledby="input-slider"
		  />
		</Grid>
		<Grid item xs={4}>
		  <FormControl sx={{width: "100%"}} variant="standard">
			<InputLabel id="demo-controlled-open-select-label">Лет</InputLabel>
			<Input
			  value={years}
			  size="small"
			  sx={{width: "100%"}}
			  onChange={handleYearsChange}
			  onBlur={handleYearsBlur}
			  inputProps={{
				step: 1,
				min: 0,
				max: 100,
				type: 'number',
			  }}
			  valueLabelDisplay="auto"
			/>
		  </FormControl>
		</Grid>
		<Grid item xs={12} align="left">
		  <Typography variant="h5">
			{`Итого: ${addSpaces(result.sum)}`}
		  </Typography>
		  <Typography variant="h5">
			{`Вложено: ${addSpaces(result.cost)}`}
		  </Typography>
		  <Typography variant="h5">
			{`Прибыль: ${
				(result.sum === "...") || (result.cost === "...") ?
				"..." :
				addSpaces(result.sum - result.cost)
			  }`
			}
		  </Typography>
		</Grid>
	  </Grid>
	</Box>
  </>
  )
}
