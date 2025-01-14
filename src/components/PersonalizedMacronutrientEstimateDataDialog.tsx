import React from 'react';
import { IUserBodyData } from '../interfaces/User';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Typography, useTheme } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

export interface PersonalizedMacronutrientEstimateData {
  personalizedFat: string;
  personalizedProtein: string;
  personalizedCarbohydrate: string;
  personalizedCalories: string;
}

interface PersonalizedMacronutrientEstimateDataDialogProps {
  userBodyDataInputs: IUserBodyData;
  personalizedMacronutrientEstimateData: PersonalizedMacronutrientEstimateData | null;
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    width: '80%',
    maxWidth: '80%',
    margin: 0,
    [theme.breakpoints.up('md')]: {
      maxWidth: '80%',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '55%',
    },
  },
}));

const activityLevel: Record<number, string> = {
  1: 'Low',
  2: 'Moderate',
  3: 'High',
};

export const PersonalizedMacronutrientEstimateDataDialog = ({
  userBodyDataInputs,
  personalizedMacronutrientEstimateData,
  openDialog,
  setOpenDialog,
}: PersonalizedMacronutrientEstimateDataDialogProps) => {
  const handleClose = () => {
    setOpenDialog(false);
  };

  const carbs = personalizedMacronutrientEstimateData
    ? parseFloat(personalizedMacronutrientEstimateData.personalizedCarbohydrate)
    : 0;
  const fat = personalizedMacronutrientEstimateData
    ? parseFloat(personalizedMacronutrientEstimateData.personalizedFat)
    : 0;
  const protein = personalizedMacronutrientEstimateData
    ? parseFloat(personalizedMacronutrientEstimateData.personalizedProtein)
    : 0;

  const data = [
    { id: 'Fat', value: fat, label: 'Fat', color: '#ef5350' },
    { id: 'Protein', value: protein, label: 'Protein', color: '#1976d2' },
    { id: 'Carbs', value: carbs, label: 'Carbs', color: '#2e7d32' },
  ];

  const theme = useTheme();
  const valueFormatter = ({ value }: { value: number }) => `${value} g`;

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Your data saved! Let's add food to your plate.
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'row',
                lg: 'row',
              },
              justifyContent: 'space-around',
              gap: 2,
            }}
          >
            <Box
              sx={{
                paddingRight: {
                  xs: '20px',
                  sm: '30px',
                  md: '35px',
                  lg: '40px',
                },
              }}
            >
              <Typography
                gutterBottom
                sx={{ color: 'text.primary', fontSize: 14, paddingBottom: 2 }}
              >
                Your data:
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: 'text.primary', fontSize: 14 }}
              >
                Weight: {userBodyDataInputs.weight} kg
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: 'text.primary', fontSize: 14 }}
              >
                Height: {userBodyDataInputs.height} cm
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: 'text.primary', fontSize: 14 }}
              >
                Meals per day: {userBodyDataInputs.mealsPerDay} meals
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: 'text.primary', fontSize: 14 }}
              >
                Activity: {activityLevel[userBodyDataInputs.activityLevel]}
              </Typography>
            </Box>
            <Box>
              <Typography
                gutterBottom
                sx={{ color: 'text.primary', fontSize: 14 }}
              >
                {' '}
                Suggested calories per day:
              </Typography>
              <Typography
                gutterBottom
                sx={{
                  color: 'text.primary',
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginBottom: 2,
                }}
              >
                {personalizedMacronutrientEstimateData?.personalizedCalories}{' '}
                kCal
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: 'text.primary', fontSize: 14 }}
              >
                Nutrients per day:
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: 'text.primary', fontSize: 14 }}
              >
                Fat: {personalizedMacronutrientEstimateData?.personalizedFat} g
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: 'text.primary', fontSize: 14 }}
              >
                Protein:{' '}
                {personalizedMacronutrientEstimateData?.personalizedProtein} g
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: 'text.primary', fontSize: 14 }}
              >
                Carbs:{' '}
                {
                  personalizedMacronutrientEstimateData?.personalizedCarbohydrate
                }{' '}
                g
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              alignSelf="flex-end"
              sx={{
                justifyContent: {
                  xs: 'flex-start',
                  sm: 'flex-start',
                  md: 'flex-start',
                  lg: 'flex-end',
                },
                paddingLeft: {
                  xs: '20px',
                  sm: '0',
                  md: '0',
                  lg: '0',
                },
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ marginBottom: '20px' }}
              >
                Macronutrient Breakdown
              </Typography>
              <PieChart
                width={400}
                height={300}
                series={[
                  {
                    data: data.map((item) => ({
                      id: item.id,
                      value: item.value,
                      label: item.label,
                      color: item.color,
                    })),
                    outerRadius: 100,
                    innerRadius: 37,
                    cx: 162,
                    cy: 100,
                    highlightScope: {
                      fade: 'global',
                      highlight: 'item',
                    },
                    valueFormatter: valueFormatter,
                  },
                ]}
                slotProps={{
                  legend: {
                    position: { horizontal: 'right', vertical: 'middle' },
                    padding: 5,
                    labelStyle: { fontSize: 14 },
                  },
                }}
                sx={{
                  '.MuiChartsHighlight': {
                    stroke: theme.palette.primary.main,
                    strokeWidth: 3,
                  },
                  '.MuiChartsSurface-root': {
                    height: '100%',
                  },
                }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Fill the plate
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};
