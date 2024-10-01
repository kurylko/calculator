import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface SavedFoodCardProps {
    foodName: string,
    fat: string;
    protein: string;
    carbohydrate: string;
    calories: string;
    weight: string;
}

export const SavedFoodCard: React.FC<SavedFoodCardProps> = ({foodName, fat, calories, carbohydrate, protein, weight})  => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    {`${calories} Cal`}
                </Typography>
                <Typography variant="h5" component="div">
                    {foodName}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{`${weight} g`}</Typography>
                <Typography variant="body2">
                    {`Fat: ${fat}  Protein: ${protein}  Carbs: ${carbohydrate}`}
                </Typography>
            </CardContent>
        </Card>
    );
}
