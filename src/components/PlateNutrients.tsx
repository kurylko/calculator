import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { TotalPlateNutrients } from '../pages/MyPlatePage';

export default function PlateNutrients({
  calories,
  carbohydrate,
  fat,
  protein,
  weight,
}: TotalPlateNutrients) {
  return (
    <Card
      sx={{
        minWidth: 275,
        height: '100%',
        width: { xs: '90%', sm: '80%', md: '60%', lg: '60%' },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography
            gutterBottom
            sx={{ color: 'text.secondary', fontSize: 14, paddingBottom: 2 }}
          >
            Nutrients in your plate
          </Typography>
          <Box sx={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <Typography
              variant="body2"
              sx={{ minWidth: '100px', textAlign: 'left' }}
            >
              {' '}
              Fat:{' '}
            </Typography>
            <Typography variant="body2"> {Math.round(parseFloat(fat))} g</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
            <Typography
              variant="body2"
              sx={{ minWidth: '100px', textAlign: 'left' }}
            >
              {' '}
              Protein:{' '}
            </Typography>
            <Typography variant="body2">{Math.round(parseFloat(protein))} g</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
            <Typography
              variant="body2"
              sx={{ minWidth: '100px', textAlign: 'left' }}
            >
              {' '}
              Carbohydrate:
            </Typography>
            <Typography variant="body2">{Math.round(parseFloat(carbohydrate))} g</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '30px',
              alignItems: 'flex-start',
              marginTop: 3,
            }}
          >
            <Typography
              variant="body2"
              sx={{ minWidth: '100px', textAlign: 'start' }}
            >
              {' '}
              Calories:
            </Typography>
            <Typography variant="body2">{Math.round(parseFloat(calories))} kCal</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '30px',
              marginTop: '20px',
              alignItems: 'flex-start',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: 14,
                minWidth: '100px',
                textAlign: 'left',
              }}
            >
              Total weight:
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', fontSize: 14 }}
            >
                {Math.round(parseFloat(weight))} g
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
