import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicStack() {
  return (
    <div>
      <Stack spacing={2}>
        <Typography varaiant="h5">Home</Typography>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item sx={{ minHeight: 30 }}>
              <Typography>My Area Activity</Typography>
              <Button>View Activity</Button>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography>Create Report</Typography>
              <Button>Create Report</Button>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography>Request resources</Typography>
              <Button>Request resources</Button>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography>Poll Wait time</Typography>
              <Button>Update</Button>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography>Election results</Typography>
              <Button>Add results</Button>
            </Item>
          </Grid>
        </Grid>
      </Stack>
    </div>
  );
}
