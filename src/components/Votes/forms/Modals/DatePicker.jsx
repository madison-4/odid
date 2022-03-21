import * as React from "react";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";

export default function DatePicker({ state, handleDareChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={2}>
        <Grid item xs>
          <DateTimePicker
            fullWidth
            renderInput={(props) => (
              <TextField fullWidth required variant="standard" {...props} />
            )}
            label="Starts"
            required
            value={state?.start || new Date()}
            onChange={(newValue) => {
              handleDareChange(newValue, "start");
            }}
          />
        </Grid>
        <Grid item xs>
          <DateTimePicker
            fullWidth
            renderInput={(props) => (
              <TextField
                fullWidth
                helperText="You can manually stop voting"
                required
                variant="standard"
                {...props}
              />
            )}
            label="Ends"
            required
            value={state?.end || new Date()}
            onChange={(newValue) => {
              handleDareChange(newValue, "start");
            }}
          />
          <Box sx={{ textAlign: "center" }}></Box>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
