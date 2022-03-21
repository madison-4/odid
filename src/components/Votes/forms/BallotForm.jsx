import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Description from "./Description";
import Paper from "@mui/material/Paper";
import DateModal from "./Modals/DateModal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useState, useContext } from "react";
import { StateContext } from "../../../state/State";
import { Formik, Form } from "formik";
export default function BallotForm({ handleTabChange }) {
  const { dispatch } = useContext(StateContext);
  const [options, setOptions] = useState(["", ""]);
  const handleAddOption = () => {
    const o = [...options];
    o.push("");
    setOptions(o);
  };

  const handleOptionsChange = (e, i) => {
    const o = [...options];
    o[i] = e.target.value;
    setOptions(o);
  };

  const handleRemoveField = (i) => {
    if (options?.length === 1) {
      setOptions(["", ""]);
      return;
    }
    const o = [...options];
    o.splice(i, 1);
    setOptions(o);
  };

  const handleSubmit = (v) => {
    const data = { ...v, options: JSON.stringify(options) };
    dispatch({
      type: "ADD_BALLOT",
      payload: data,
    });
    handleTabChange(1);
  };

  return (
    <Formik
      initialValues={{
        title: "",
        desc: "",
        howVote: "",
        starts: "",
        ends: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange }) => (
        <Form>
          <Paper sx={{ m: 1, p: 1 }}>
            <Grid container>
              <Grid item xs={8}>
                <TextField
                  required
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  label="Title or main question"
                  fullWidth
                />
                <Description />
                <Grid container spacing={2}>
                  <Grid item xs>
                    <DateModal title="Select start date" />
                  </Grid>
                  <Grid item xs>
                    <DateModal title="Select end date" />
                  </Grid>
                </Grid>
                <Divider sx={{ my: 1 }} />
                <Box>
                  <Typography>Options</Typography>
                  {options.map((p, i) => (
                    <TextField
                      onChange={(e) => handleOptionsChange(e, i)}
                      value={options[i]}
                      required
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {i + 1}
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment>
                            <IconButton onClick={() => handleRemoveField(i)}>
                              <DeleteIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ my: 1 }}
                      placeholder={`Option ${i + 1}`}
                      fullWidth
                      key={i}
                    />
                  ))}
                  <Button
                    onClick={handleAddOption}
                    endIcon={<AddBoxIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    Add another option
                  </Button>
                </Box>
              </Grid>
              <Grid item xs px={2} align="center">
                <Button type="submit" fullWidth variant="outlined">
                  Next
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Form>
      )}
    </Formik>
  );
}

const OptionsForm = () => { };
