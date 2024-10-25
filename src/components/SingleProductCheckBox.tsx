import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {Box} from "@mui/material";
import React from "react";

interface SingleProductCheckBoxProps {
    productNames: string[];
    selectedProduct: string;
    handleChangeSingleProduct: (event: SelectChangeEvent<string>) => void;
}

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

export const SingleProductCheckBox = ({productNames, selectedProduct, handleChangeSingleProduct}: SingleProductCheckBoxProps) => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "90%", sm: "90%", md: "85%", lg: "85%" },
            alignItems: {
                xs: "center",
                sm: "center",
                md: "flex-start",
                lg: "flex-start",
            },
        }}>
            <FormControl
                sx={{
                    m: 1,
                    margin: "0",
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "35%",
                        lg: "300px",
                    },
                }}
            >
                <InputLabel id="products-single-checkbox-label">
                    Pick one Product
                </InputLabel>
                <Select
                    labelId="products-single-checkbox-label"
                    label="Pick one Product"
                    id="products-single-checkbox"
                    value={selectedProduct}
                    onChange={handleChangeSingleProduct}
                    input={<OutlinedInput label="Pick one Product"/>}
                    MenuProps={MenuProps}
                >
                    {productNames.map((product: string) => (
                        <MenuItem key={product} value={product}>
                            {product}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}