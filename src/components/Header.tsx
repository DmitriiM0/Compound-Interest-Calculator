import { Typography, Box } from '@mui/material';

export default function Header({ language }): JSX.Element {
  return (
    <>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
          px: 4,
          pt: 10,
          pb: 6,
        }}
      >
        <Typography
          variant="h2"
          align="center"
          fontWeight="medium"
          gutterBottom
        >
          {language === 'ru' ? 'Калькулятор' : null}
          <Typography
            variant="inherit"
            sx={{ display: 'inline' }}
            color="primary"
            mx="0.5ch"
          >
            {language === 'ru' ? 'сложного процента' : 'Compound Interest'}
          </Typography>
          {language === 'ru' ? 'с пополнением' : 'Calculator'}
        </Typography>
        <Typography
          variant="h6"
          align="center"
          fontWeight="regular"
          width="50ch"
          gutterBottom
          color="#938F99"
        >
          {language === 'ru'
            ? 'Сложный процент - это мощная сила, которая со временем может значительно увеличить стоимость ваших сбережений и инвестиций'
            : 'Compound interest is a powerful force that can significantly increase the value of your savings and investments over time'}
        </Typography>
      </Box>
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          color: 'white',
          px: 2,
          pt: 5,
          pb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: {
              xs: '2.125rem',
              sm: 38,
              md: 50,
              xl: 60,
            },
            display: 'inline',
          }}
          fontWeight="medium"
          align="left"
          gutterBottom
        >
          {language === 'ru' ? 'Калькулятор' : null}
          {language === 'ru' ? <br /> : null}
          <Typography
            variant="inherit"
            sx={{ display: 'inline' }}
            color="primary"
            mr="0.5ch"
          >
            {language === 'ru' ? 'сложного процента' : 'Compound Interest'}
          </Typography>
          <br />
          {language === 'ru' ? null : 'Calculator'}
        </Typography>
        <Typography
          variant="h6"
          fontSize="1rem"
          align="left"
          fontWeight="regular"
          pt={2}
          pr={2}
          color="#938F99"
          gutterBottom
        >
          {language === 'ru'
            ? 'Сложный процент - это мощная сила, которая со временем может значительно увеличить стоимость ваших сбережений и инвестиций'
            : 'Compound interest is a powerful force that can significantly increase the value of your savings and investments over time'}
        </Typography>
      </Box>
    </>
  );
}
