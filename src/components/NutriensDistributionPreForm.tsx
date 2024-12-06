import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { IUserBodyData } from '../interfaces/User';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

interface NutrientsDistributionPreFormProps {
  userData: IUserBodyData;
  handleChangeInputs: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NutrientsDistributionPreForm = ({
  userData,
  handleChangeInputs,
}: NutrientsDistributionPreFormProps) => {
  const height = Array.from(
    { length: 220 - 140 + 1 },
    (_, index) => 140 + index,
  );
  const weight = Array.from(
    { length: 220 - 140 + 1 },
    (_, index) => 140 + index,
  );
  const mealsPerDay = Array.from(
    { length: 5 - 1 + 1 },
    (_, index) => 1 + index,
  );

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}
      >
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          Calculation would be based on your data
        </Typography>

        <FormGroup sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '4px' }}>
          <FormControlLabel
              control={<Checkbox />}
              label="Male"
              name="male"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Female"
            name="female"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Neuter"
            name="neuter "
          />
        </FormGroup>

        <FormControl
          sx={{
            m: 1,
            margin: '0',
            width: {
              xs: '100%',
              sm: '100%',
              md: '35%',
              lg: '200px',
            },
          }}
        >
          <InputLabel id="user-weight" required>Weight</InputLabel>
          <Select
            labelId="products-single-checkbox-label"
            label="Weight"
            id="products-single-checkbox"
            value={'selectedProduct'}
            //onChange={"handleChange"}
            input={<OutlinedInput label="Weight" />}
            //MenuProps={"MenuProps"}
          >
            {weight.map((num: number) => (
              <MenuItem key={num} value={num}>
                {num} kg
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          sx={{
            m: 1,
            margin: '0',
            width: {
              xs: '100%',
              sm: '100%',
              md: '35%',
              lg: '200px',
            },
          }}
        >
          <InputLabel id="user-height" required>Height</InputLabel>
          <Select
            labelId="products-single-checkbox-label"
            label="Height"
            id="products-single-checkbox"
            value={'selectedProduct'}
            //onChange={"handleChange"}
            input={<OutlinedInput label="Height" />}
            //MenuProps={"MenuProps"}
          >
            {height.map((num: number) => (
              <MenuItem key={num} value={num}>
                {num} cm
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          sx={{
            m: 1,
            margin: '0',
            width: {
              xs: '100%',
              sm: '100%',
              md: '35%',
              lg: '200px',
            },
          }}
        >
          <InputLabel id="user-meals-per-day" required>Meals per Day</InputLabel>
          <Select
            labelId="products-single-checkbox-label"
            label="Meals per Day"
            id="products-single-checkbox"
            value={'selectedProduct'}
            //onChange={"handleChange"}
            input={<OutlinedInput label="Meals per day" />}
            //MenuProps={"MenuProps"}
          >
            {mealsPerDay.map((num: number) => (
              <MenuItem key={num} value={num}>
                {num} Meals
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          sx={{ width: 'fit-content', alignSelf: 'center' }}
        >
          Save
        </Button>
      </CardContent>
    </Card>
  );
};
