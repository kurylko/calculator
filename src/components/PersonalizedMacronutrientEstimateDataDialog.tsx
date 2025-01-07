import React from 'react';
import { IUserBodyData } from '../interfaces/User';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

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
    width: '90%',
    maxWidth: '90%',
    margin: 0,
    [theme.breakpoints.up('md')]: {
      maxWidth: '80%',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '70%',
    },
  },
}));

export const PersonalizedMacronutrientEstimateDataDialog = ({
  userBodyDataInputs,
  personalizedMacronutrientEstimateData,
  openDialog,
  setOpenDialog,
}: PersonalizedMacronutrientEstimateDataDialogProps) => {
  const handleClose = () => {
    setOpenDialog(false);
  };

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
          <Box sx={{ display: 'flex' }}>
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
                sx={{ color: 'text.secondary', fontSize: 14, paddingBottom: 2 }}
              >
                Your data:
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: 'text.secondary', fontSize: 14 }}
              >
                Weight: {userBodyDataInputs.weight} kg
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: 'text.secondary', fontSize: 14 }}
              >
                Height: {userBodyDataInputs.height} cm
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: 'text.secondary', fontSize: 14 }}
              >
                Meals per day: {userBodyDataInputs.activityLevel} meals
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: 'text.secondary', fontSize: 14 }}
              >
                Activity: {userBodyDataInputs.activityLevel} level
              </Typography>
            </Box>
            <Box>
              <Typography
                gutterBottom
                sx={{ color: 'text.secondary', fontSize: 14, paddingBottom: 2 }}
              >
                Suggested calories per day:{' '}
                {personalizedMacronutrientEstimateData?.personalizedCalories}{' '}
                kCal
              </Typography>
              <Typography
                  gutterBottom
                  sx={{ color: 'text.secondary', fontSize: 14,}}
              >
                 Nutrients per day:
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: 'text.secondary', fontSize: 14 }}
              >
                Fat: {personalizedMacronutrientEstimateData?.personalizedFat} g
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: 'text.secondary', fontSize: 14 }}
              >
                Protein:{' '}
                {personalizedMacronutrientEstimateData?.personalizedProtein} g
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: 'text.secondary', fontSize: 14 }}
              >
                Carbs:{' '}
                {
                  personalizedMacronutrientEstimateData?.personalizedCarbohydrate
                }{' '}
                g
              </Typography>
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
