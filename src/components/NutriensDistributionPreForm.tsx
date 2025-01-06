import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { IUserBodyData } from '../interfaces/User';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

interface NutrientsDistributionPreFormProps {
  userBodyDataInputs: IUserBodyData;
  handleSaveUserData: () => void;
  handleCheckBoxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: SelectChangeEvent<number>) => void;
}

const activityLevel = {
  1: 'Low',
  2: 'Moderate',
  3: 'High',
};

const height = Array.from({ length: 220 - 130 + 1 }, (_, index) => 130 + index);
const weight = Array.from({ length: 140 - 40 + 1 }, (_, index) => 40 + index);
const mealsPerDay = Array.from({ length: 5 - 1 + 1 }, (_, index) => 1 + index);

export const NutrientsDistributionPreForm = ({
  userBodyDataInputs,
  handleSaveUserData,
  handleCheckBoxChange,
  handleSelectChange,
}: NutrientsDistributionPreFormProps) => {
  return (
    <Card
      sx={{
        minWidth: 275,
        width: { xs: '90%', sm: '80%', md: '60%', lg: '60%' },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          Calculation would be based on your data
        </Typography>

        <FormGroup
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '4px',
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={userBodyDataInputs.gender === 'male'}
                onChange={handleCheckBoxChange}
                name="male"
              />
            }
            label="Male"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={userBodyDataInputs.gender === 'female'}
                onChange={handleCheckBoxChange}
                name="female"
              />
            }
            label="Female"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={userBodyDataInputs.gender === 'neuter'}
                onChange={handleCheckBoxChange}
                name="neuter"
              />
            }
            label="Neuter"
          />
        </FormGroup>

        <Box
          sx={{
            display: 'flex',
            width: '100%',
            gap: '8px',
            justifyContent: 'center',
          }}
        >
          <FormControl
            sx={{
              m: 1,
              margin: '0',
              width: {
                xs: '100%',
                sm: '100%',
                md: '35%',
                lg: '100px',
              },
            }}
          >
            <InputLabel id="user-weight" required>
              Weight
            </InputLabel>
            <Select
              labelId="user-weight"
              label="Weight"
              id="user-weight"
              name="weight"
              value={userBodyDataInputs.weight}
              onChange={handleSelectChange}
              input={<OutlinedInput label="Weight" />}
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
                lg: '100px',
              },
            }}
          >
            <InputLabel id="user-height" required>
              Height
            </InputLabel>
            <Select
              labelId="user-height"
              label="Height"
              id="user-height"
              name="height"
              value={userBodyDataInputs.height}
              onChange={handleSelectChange}
              input={<OutlinedInput label="Height" />}
            >
              {height.map((num: number) => (
                <MenuItem key={num} value={num}>
                  {num} cm
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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
          <InputLabel id="user-meals-per-day" required>
            Meals per Day
          </InputLabel>
          <Select
            labelId="user-meals-per-day"
            label="Meals per Day"
            id="user-meals-per-day"
            name="mealsPerDay"
            value={userBodyDataInputs.mealsPerDay}
            onChange={handleSelectChange}
            input={<OutlinedInput label="Meals per day" />}
          >
            {mealsPerDay.map((num: number) => (
              <MenuItem key={num} value={num}>
                {num} Meals
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
          <InputLabel id="user-activity-level">Activity level</InputLabel>
          <Select
            labelId="user-activity-level"
            label="Activity level"
            id="user-activity-level"
            name="activityLevel"
            value={userBodyDataInputs.activityLevel}
            onChange={handleSelectChange}
            input={<OutlinedInput label="Activity level" />}
          >
            {Object.entries(activityLevel).map(([key, value]) => {
              return (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{ width: 'fit-content', alignSelf: 'center' }}
          onClick={handleSaveUserData}
        >
          Save
        </Button>
      </CardContent>
    </Card>
  );
};
