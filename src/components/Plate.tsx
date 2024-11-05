import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {TotalPlate} from "../pages/MyPlatePage";

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function Plate({plateTotalToDisplay} : any) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Nutrients in your plate
                </Typography>
                <Typography variant="body2"> Fat: {plateTotalToDisplay.fat} g</Typography>
                <Typography variant="body2"> Protein: {plateTotalToDisplay.protein} g</Typography>
                <Typography variant="body2"> Carbohydrate: {plateTotalToDisplay.carbohydrate} g</Typography>
                <Typography variant="body2"> Calories: {plateTotalToDisplay.calories} kCal</Typography>
                <Typography variant="body2"> Total weight: {plateTotalToDisplay.weight} g</Typography>
            </CardContent>
        </Card>
    );
}
