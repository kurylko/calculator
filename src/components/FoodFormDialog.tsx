import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { FoodInputsForm } from './FoodInputsForm';
import { IFoodItemUserInputs, IUserFoodItem } from '../interfaces/FoodItem';

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

interface FoodFormDialogProps {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  foodInputsValues: IFoodItemUserInputs;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditProduct: (foodItem: IUserFoodItem) => Promise<void>;
}

export const FoodFormDialog = ({
  openDialog,
  setOpenDialog,
  foodInputsValues,
  handleChange,
  handleEditProduct,
}: FoodFormDialogProps) => {
  const handleClose = () => {
    handleEditProduct(foodInputsValues)
      .then((r) => setOpenDialog(false))
      .catch((e) => console.error('Error editing food item:', e));
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
          Edit food info
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
          <FoodInputsForm
            foodInputsValues={foodInputsValues}
            handleChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};
