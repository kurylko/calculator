import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import EggIcon from "@mui/icons-material/Egg";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import EggAltIcon from "@mui/icons-material/EggAlt";
import ScaleIcon from "@mui/icons-material/Scale";
import CalculateIcon from "@mui/icons-material/Calculate";

interface CalculationResultDisplayProps {
    foodName: string,
    fat: string,
    protein: string,
    carbohydrate: string,
    calories: string,
    weight: string
}

export default function CalculationResultDisplay() {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 400,
        bgcolor: "background.paper",
        display: "flex",
        gap: "20px",
      }}
    >
        <ListItem>
            <ListItemAvatar>
            </ListItemAvatar>
            <ListItemText
                primary="product"
                secondary=""
                sx={{
                    width: "fit-content",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
            />
        </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <EggAltIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Fat"
          secondary="fat,g"
          sx={{
            width: "fit-content",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
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
          primary="Protein"
          secondary="protein,g"
          sx={{
            width: "fit-content",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
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
          primary="Carbohydrates"
          secondary="carbohydrate,g"
          sx={{
            width: "fit-content",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
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
          primary="Calories"
          secondary="calories, kcal"
          sx={{
            width: "fit-content",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
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
          primary="Weight"
          secondary="weight, g"
          sx={{
            width: "fit-content",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        />
      </ListItem>
    </List>
  );
}
