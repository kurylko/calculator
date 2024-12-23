import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button, styled } from '@mui/material';
import { INutriScorePerKg } from '../utils/getNutriValues';
import { useState } from 'react';

interface SavedFoodCardProps {
  foodName: string;
  fat: string;
  protein: string;
  carbohydrate: string;
  calories: string;
  weight: string;
  onClickDelete?: () => void;
  onClickEdit?: () => void;
  nutriValues?: INutriScorePerKg | null;
}

interface FlippingCardProps {
  flip: boolean;
}

const CardContainer = styled('div')({
  position: 'relative',
  width: '300px',
  height: '170px',
  perspective: '1000px',
});

const FlippingCard = styled('div')<FlippingCardProps>(({ flip }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  padding: '0',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: '8px',
  transition: 'transform 0.6s',
  transformStyle: 'preserve-3d',
  transform: flip ? 'rotateY(180deg)' : 'rotateY(0deg)',
}));

const CardFace = styled(CardContent)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
});

const FrontFace = styled(CardFace)({
  transform: 'rotateY(0deg)',
  padding: '0',
});

const BackFace = styled(CardFace)({
  transform: 'rotateY(180deg)',
  padding: '0',
});

export const SavedFoodCard = ({
  foodName,
  fat,
  calories,
  carbohydrate,
  protein,
  weight,
  onClickDelete,
  onClickEdit,
  nutriValues,
}: SavedFoodCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <CardContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FlippingCard flip={isHovered}>
        <FrontFace>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                top: 8,
              }}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{
                  padding: '2px 4px',
                  minWidth: '24',
                  height: '24',
                  fontSize: '0.9rem',
                  lineHeight: '1.2',
                  borderRadius: '4px',
                  borderColor: 'red',
                  color: 'red',
                }}
                onClick={onClickDelete}
              >
                DELETE
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  padding: '2px 4px',
                  minWidth: '24',
                  height: '24',
                  fontSize: '0.9rem',
                  lineHeight: '1.2',
                  borderRadius: '4px',
                }}
                onClick={onClickEdit}
              >
                EDIT
              </Button>
            </Box>
            <Typography
              gutterBottom
              sx={{ color: 'text.secondary', fontSize: 14 }}
            >
              {`${calories} kcal`}
            </Typography>
            <Typography variant="h5" component="div">
              {foodName}
            </Typography>
            <Typography
              sx={{ color: 'text.secondary', mb: 1.5 }}
            >{`${weight} g`}</Typography>
            <Typography variant="body2">
              {`Fat: ${fat}g  Protein: ${protein}g  Carbs: ${carbohydrate}g`}
            </Typography>
          </CardContent>
        </FrontFace>

        <BackFace>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                top: 8,
              }}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{
                  padding: '2px 4px',
                  minWidth: '24',
                  height: '24',
                  fontSize: '0.9rem',
                  lineHeight: '1.2',
                  borderRadius: '4px',
                  borderColor: 'red',
                  color: 'red',
                }}
                onClick={onClickDelete}
              >
                DELETE
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  padding: '2px 4px',
                  minWidth: '24',
                  height: '24',
                  fontSize: '0.9rem',
                  lineHeight: '1.2',
                  borderRadius: '4px',
                }}
                onClick={onClickEdit}
              >
                EDIT
              </Button>
            </Box>
            <Typography
              gutterBottom
              sx={{ color: 'text.secondary', fontSize: 14 }}
            >
              {nutriValues?.caloriesValuePerKg != null
                ? `${parseFloat(nutriValues.caloriesValuePerKg).toFixed(0)} kcal`
                : '- kcal'}
            </Typography>
            <Typography variant="h5" component="div">
              {foodName}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
              1 kg
            </Typography>
            <Typography variant="body2">
              {`Fat: ${nutriValues?.fatValuePerKg ? parseFloat(nutriValues.fatValuePerKg).toFixed(0) : '-'}g  
    Protein: ${nutriValues?.proteinValuePerKg ? parseFloat(nutriValues.proteinValuePerKg).toFixed(0) : '-'}g  
    Carbs: ${nutriValues?.carbohydrateValuePerKg ? parseFloat(nutriValues.carbohydrateValuePerKg).toFixed(0) : '-'}g`}
            </Typography>
          </CardContent>
        </BackFace>
      </FlippingCard>
    </CardContainer>
  );
};
