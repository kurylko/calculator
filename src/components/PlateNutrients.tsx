import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function PlateNutrients({ plateTotalToDisplay }: any) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
      >
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
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
          <Typography variant="body2"> {plateTotalToDisplay.fat} g</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
          <Typography
            variant="body2"
            sx={{ minWidth: '100px', textAlign: 'left' }}
          >
            {' '}
            Protein:{' '}
          </Typography>
          <Typography variant="body2">
            {plateTotalToDisplay.protein} g
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
          <Typography
            variant="body2"
            sx={{ minWidth: '100px', textAlign: 'left' }}
          >
            {' '}
            Carbohydrate:
          </Typography>
          <Typography variant="body2">
            {plateTotalToDisplay.carbohydrate} g
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
          <Typography
            variant="body2"
            sx={{ minWidth: '100px', textAlign: 'left' }}
          >
            {' '}
            Calories:
          </Typography>
          <Typography variant="body2">
            {plateTotalToDisplay.calories} kCal
          </Typography>
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
            {plateTotalToDisplay.weight} g
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
