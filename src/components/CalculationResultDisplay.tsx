import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import EggIcon from '@mui/icons-material/Egg';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import EggAltIcon from '@mui/icons-material/EggAlt';
import ScaleIcon from '@mui/icons-material/Scale';
import CalculateIcon from '@mui/icons-material/Calculate';
import { EstimateCalculationResult } from './../interfaces/EstimateCalculationResult';

export interface CalculationResultDisplayProps {
  result: EstimateCalculationResult | null;
}

export default function CalculationResultDisplay({
  result,
}: CalculationResultDisplayProps) {
  if (result == null) {
    return null;
  }

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 400,
        bgcolor: 'background.paper',
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        gap: '20px',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(6, 1fr)',
        },
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <EggAltIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={result.fat ? Math.round(parseFloat(result.fat)) : 0}
          secondary="fat,g"
          sx={{
            width: 'fit-content',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <EggIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={result.protein ? Math.round(parseFloat(result.protein)) : 0}
          secondary="protein,g"
          sx={{
            width: 'fit-content',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BakeryDiningIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            result.carbohydrate
              ? Math.round(parseFloat(result.carbohydrate))
              : 0
          }
          secondary="carbohydrate,g"
          sx={{
            width: 'fit-content',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <CalculateIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            result.calories ? Math.round(parseFloat(result.calories)) : 0
          }
          secondary="calories, kcal"
          sx={{
            width: 'fit-content',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ScaleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={result.weight ? Math.round(parseFloat(result.weight)) : 0}
          secondary="weight, g"
          sx={{
            width: 'fit-content',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        />
      </ListItem>
    </List>
  );
}
