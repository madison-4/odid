import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "@mui/material/Link";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { TabPanel } from "../../navigation/tabs/Tabs";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import InputAdrornment from "@mui/material/InputAdornment";
import ErrorBoundary from "../../../../navigation/ErrorBoundary";
import { StateContext } from "../../../../state/State";
import axiosInstance from "../../../../state/axiosInstance";
import Map from "../../../Map";
import useSearchQueryParams from "../../../hooks/useSearchQueryParams";

export function ResultsDialog({ sx, operations, ctx }) {
  const { searchResultsOpen, dispatch } = React.useContext(StateContext);
  const toggle = () => {
    dispatch({
      type: "ADD_MULTIPLE",
      context: "searchResultsOpen",
      payload: !searchResultsOpen,
    });
  };

  const [searchTerm, setSearchTerm] = React.useState(null);

  const [searchState, setSearchState] = React.useState(null);

  const handleChange = (e) => {
    if (searchState?.typingTimeout) {
      clearTimeout(searchState?.typingTimeout);
    }
    setSearchState({
      searchTerm: e.target.value,
      typing: false,
      typingTimeout: setTimeout(function () {
        setSearchTerm(searchState?.searchTerm);
      }, 1200),
    });
  };

  return (
    <>
      <SearchIcon onClick={toggle} sx={sx} />
      <Dialog fullWidth maxWidth="md" onClose={toggle} open={searchResultsOpen}>
        <DialogTitle>Search {ctx}</DialogTitle>
        <DialogContent dividers>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                onChange={handleChange}
                placeholder="Start Typing..."
                InputProps={{
                  startAdornment: (
                    <InputAdrornment position="start">
                      <SearchIcon />
                    </InputAdrornment>
                  ),
                }}
                fullWidth
              />
              <SearchTabs
                ctx={ctx}
                searchTerm={searchTerm}
                operations={operations}
              />
            </Grid>
            <Grid item xs={6}>
              <Map className="smallMap"></Map>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggle}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function SearchTabs({ operations, searchTerm, ctx }) {
  const { id } = useParams();
  const [value, setValue] = React.useState(0);
  const { push } = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const next = useSearchQueryParams("next");

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={ctx} {...a11yProps(0)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <SearchWindow ctx={ctx} searchTerm={searchTerm} value={value} />
      </TabPanel>
    </Box>
  );
}

function SearchWindow({ searchTerm, value, ctx }) {
  const [res, setRes] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const { url } = useRouteMatch();
  const { push } = useHistory();

  const { dispatch } = React.useContext(StateContext);

  const urlEnd =
    ctx === "County"
      ? "searchcounty"
      : ctx === "Constituency"
      ? "searchconst"
      : ctx === "Ward"
      ? "searchward"
      : "searchstations";

  React.useEffect(() => {
    if (searchTerm) {
      setLoading(true);

      axiosInstance
        .get(`/${urlEnd}/${searchTerm}`)
        .then(({ data }) => {
          setRes(data);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    }
  }, [searchTerm, value, urlEnd]);

  const handleClick = (v) => {
    dispatch({
      type: "ADD_MULTIPLE",
      context: "searchOpen",
      payload: false,
    });
  };

  return (
    <>
      {loading && (
        <Box
          sx={{
            minHeight: "18vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box>
            <CircularProgress />
            <Typography>Loading results...</Typography>
          </Box>
        </Box>
      )}
      {!loading && (
        <>
          {!searchTerm && (
            <Box
              sx={{
                textAlign: "center",
                minHeight: "18vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>Type and search</Typography>
            </Box>
          )}
          {searchTerm && res?.length && (
            <Box>
              <Typography>Showing {res?.length} Search results</Typography>
              <List
                sx={{
                  width: "100%",
                }}
              >
                {res?.map((r) => {
                  if (ctx === "County") {
                    return (
                      <ListItem
                        button
                        onClick={() => handleClick(r)}
                        key={r.id}
                      >
                        <ListItemText primary={r.county} />
                      </ListItem>
                    );
                  }
                  if (ctx === "Constituency") {
                    return (
                      <ListItem
                        button
                        onClick={() => handleClick(r)}
                        key={r.id}
                      >
                        <ListItemText primary={r.const} />
                      </ListItem>
                    );
                  }
                  if (ctx === "Ward") {
                    return (
                      <ListItem
                        button
                        onClick={() => handleClick(r)}
                        key={r.id}
                      >
                        <ListItemText primary={r.ward} />
                      </ListItem>
                    );
                  }
                  if (ctx === "Station") {
                    return (
                      <ListItem
                        button
                        onClick={() => handleClick(r)}
                        key={r.id}
                      >
                        <ListItemText primary={r.name} />
                      </ListItem>
                    );
                  }
                })}
              </List>
            </Box>
          )}
        </>
      )}
    </>
  );
}
