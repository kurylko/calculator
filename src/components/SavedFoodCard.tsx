import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Button} from "@mui/material";

interface SavedFoodCardProps {
    foodName: string,
    fat: string;
    protein: string;
    carbohydrate: string;
    calories: string;
    weight: string;
    onClick?: () => void;
}

export const SavedFoodCard: React.FC<SavedFoodCardProps> = ({
                                                                foodName,
                                                                fat,
                                                                calories,
                                                                carbohydrate,
                                                                protein,
                                                                weight,
                                                                onClick
                                                            }) => {
    return (
        <Card sx={{minWidth: 275, position: 'relative'}}>
            <CardContent>
                <Button variant="outlined" size="small" sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    padding: '2px 4px',
                    minWidth: '24',
                    height: '24',
                    fontSize: '0.9rem',
                    lineHeight: '1.2',
                    borderRadius: '4px'
                }} onClick={onClick}
                >DELETE</Button>
                <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
                    {`${calories} Cal`}
                </Typography>
                <Typography variant="h5" component="div">
                    {foodName}
                </Typography>
                <Typography sx={{color: 'text.secondary', mb: 1.5}}>{`${weight} g`}</Typography>
                <Typography variant="body2">
                    {`Fat: ${fat}  Protein: ${protein}  Carbs: ${carbohydrate}`}
                </Typography>
            </CardContent>
        </Card>
    );
}
