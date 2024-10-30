import * as React from 'react';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { EstimateCalculationResult } from './../interfaces/EstimateCalculationResult';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

interface CalculationsTableProps {
  results: EstimateCalculationResult[] | null;
  handleDelete: (calculationResult: EstimateCalculationResult) => Promise<void>;
}

const FoodTable: React.FC<CalculationsTableProps> = ({
  results,
  handleDelete,
}) => {
  if (!results || results.length === 0) {
    return (
      <Box sx={{ width: '100%', marginBottom: '50px' }}>
        <Typography>No calculations available.</Typography>
      </Box>
    );
  }
  return (
    <Box display="flex" justifyContent="center" p={2} sx={{ width: '100%' }}>
      <TableContainer component={Paper} sx={{ width: '100%', maxWidth: 1200 }}>
        <Table sx={{ width: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Food</TableCell>
              <TableCell align="right">Calories (kcal/kg)</TableCell>
              <TableCell align="right">Fat&nbsp;(g, /kg)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g, /kg)</TableCell>
              <TableCell align="right">Protein&nbsp;(g, /kg)</TableCell>
              <TableCell align="right">Weight&nbsp;(g)</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results?.map((result) => (
              <TableRow
                key={result.calculationId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {result.foodName}
                </TableCell>
                <TableCell align="right">{`${result.calories} (${result?.calories ?? '-'})`}</TableCell>
                <TableCell align="right">{`${result.fat} (${result?.fat ?? '-'})`}</TableCell>
                <TableCell align="right">{`${result.carbohydrate} (${result?.carbohydrate ?? '-'})`}</TableCell>
                <TableCell align="right">{`${result.protein} (${result?.protein ?? '-'})`}</TableCell>
                <TableCell align="right">{result.weight}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleDelete(result)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FoodTable;
