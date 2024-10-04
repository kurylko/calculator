import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IFoodItem } from "../interfaces/FoodItem";
import Box from "@mui/material/Box";
import { INutriScorePerKg } from "../utils/getNutriValues";

export type FoodWithNutriScore = IFoodItem & {
  nutriScorePerKg: INutriScorePerKg | null;
};

interface FoodTableProps {
  lastInputFoodItems: FoodWithNutriScore[];
}

const FoodTable: React.FC<FoodTableProps> = ({ lastInputFoodItems }) => {
  return (
    <Box display="flex" justifyContent="center" p={2} sx={{ width: "100%" }}>
      <TableContainer component={Paper} sx={{ width: "100%", maxWidth: 1200 }}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Food</TableCell>
              <TableCell align="right">Calories (kcal/kg)</TableCell>
              <TableCell align="right">Fat&nbsp;(g, /kg)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g, /kg)</TableCell>
              <TableCell align="right">Protein&nbsp;(g, /kg)</TableCell>
              <TableCell align="right">Weight&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lastInputFoodItems.map((food) => (
              <TableRow
                key={food.foodName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {food.foodName}
                </TableCell>
                <TableCell align="right">{`${food.calories} (${food?.nutriScorePerKg?.caloriesValuePerKg ?? "-"})`}</TableCell>
                <TableCell align="right">{`${food.fat} (${food?.nutriScorePerKg?.fatValuePerKg ?? "-"})`}</TableCell>
                <TableCell align="right">{`${food.carbohydrate} (${food?.nutriScorePerKg?.carbohydrateValuePerKg ?? "-"})`}</TableCell>
                <TableCell align="right">{`${food.protein} (${food?.nutriScorePerKg?.proteinValuePerKg ?? "-"})`}</TableCell>
                <TableCell align="right">{food.weight}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FoodTable;
