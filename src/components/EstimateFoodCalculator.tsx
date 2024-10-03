import { Button, TextField } from "@mui/material";
import React from "react";

const EstimateFoodCalculator = () => {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center",  marginBottom: "50px"}}>
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
        style={{ width: "fit-content" }}
        onClick={() => {
          console.log("submitted");
        }}
      >
        Calculate
      </Button>
    </div>
  );
};

export default EstimateFoodCalculator;
