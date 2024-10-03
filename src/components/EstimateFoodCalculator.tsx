import React from "react";
import { Button, TextField } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const EstimateFoodCalculator = () => {
    const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: {value},
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center",  marginBottom: "50px"}}>
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="products-multiple-checkbox-label">Products</InputLabel>
            <Select
                labelId="products-multiple-checkbox-label"
                id="products-multiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Product" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {names.map((name) => (
                    <MenuItem key={name} value={name}>
                        <Checkbox checked={personName.includes(name)} />
                        <ListItemText primary={name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
      <form
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "10px",
          marginBottom: "50px",
        }}
      >
        <TextField
          required
          id="outlined-required"
          label="Estimate-calories"
          name="calories"
          value={"calories"}
          onChange={() => {
            console.log("1");
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Estimate-fat"
          name="fat"
          value={"fat"}
          onChange={() => {
            console.log("1");
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Estimate-protein"
          name="protein"
          value={"protein"}
          onChange={() => {
            console.log("1");
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Estimate-carbs"
          name="carbs"
          value={"carbs"}
          onChange={() => {
            console.log("1");
          }}
        />
      </form>
      <Button
        variant="contained"
        style={{ width: "fit-content", alignSelf: "flex-end" }}
        onClick={() => {
          console.log("submitted");
        }}
      >
        Calculate
      </Button>
    </div>
  );
};

export default EstimateFoodCalculator
