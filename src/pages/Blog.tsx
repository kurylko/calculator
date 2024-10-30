import React from 'react';
import useFoodGoodToKnow from '../hooks/useFoodGoodToKnow';
import Typography from '@mui/material/Typography';
import defaultImage from '../assets/images/cheese-1.png';
import { Box } from '@mui/material';

export default function Blog() {
  const { food, loading, error } = useFoodGoodToKnow();

  if (loading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="body1">Error: {error.message}</Typography>;
  }

  function getShortFoodItemLabel(string: string) {
    if (string.length > 30) {
      return string.substring(0, 30) + '...';
    } else {
      return string;
    }
  }

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement>,
  ): void => {
    const target = e.target as HTMLImageElement;
    target.src = defaultImage;
  };

  return (
    <Box
      sx={{
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ marginY: '40px' }}>
        Find more nutritional information
      </Typography>
      <Box
        className="api-food-item-wrapper"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '30px',
          paddingLeft: '25px',
          paddingTop: '40px',
        }}
      >
        {food?.length ? (
          food.map((foodItem, index) => (
            <Box key={index} className="api-food-item" sx={{ width: '300px' }}>
              <Typography variant="body1">
                {getShortFoodItemLabel(foodItem.food.label)}
              </Typography>
              <Box
                component="img"
                src={foodItem.food.image || defaultImage}
                alt={foodItem.food.label}
                sx={{
                  width: '300px',
                  height: '300px',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  borderRadius: '50%',
                }}
                onError={handleImageError}
              ></Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '15px',
                }}
              >
                <Typography variant="body1">
                  Fat: {foodItem.food.nutrients.FAT}
                </Typography>
                <Typography variant="body1">
                  Carbohydrate: {foodItem.food.nutrients.CHOCDF}
                </Typography>
                <Typography variant="body1">
                  KCal: {foodItem.food.nutrients.ENERC_KCAL}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography variant="body2">Cannot find a recipe</Typography>
        )}
      </Box>
    </Box>
  );
}
