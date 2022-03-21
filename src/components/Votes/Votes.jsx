import Sidebar from "./navigation/Sidebar";
import Chip from "@mui/material/Chip";
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
  useHistory,
  useParams,
} from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormCoontrolLabel from "@mui/material/FormControlLabel";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Preview from "./preview/Preview";
import Link from "@mui/material/Link";
import LinearProgress from "@mui/material/LinearProgress";
import logo from "../../assets/logo.png";
import useAllCountyData from "../hooks/useAllCountyData";
import useSearchQueryParams from "../hooks/useSearchQueryParams";
import useOfficials from "../hooks/useOfficials";
import { AtlasMap } from "../../pages/Atlas/Prev/PrevCountyMap";
import DetailMap from "../../pages/elections/Operations/DetailMap";
import QRCode from "react-qr-code";
import { StateContext } from "../../state/State";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import MuiSwitch from "@mui/material/Switch";
import Ctx from "../../pages/Atlas/Prev/Ctx";
import Map from "../Map";
import Alert from "@mui/material/Alert";
import React, { useContext, useState, useEffect } from "react";
import BasicDialog from "../modal/BasicDialog";
import axiosInstance from "../../state/axiosInstance";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import HowToVoteRoundedIcon from "@mui/icons-material/HowToVoteRounded";
import DatePicker from "./forms/Modals/DatePicker";
import Description from "./forms/Description";
import ModalDialog from "./forms/Modals/ModalDialog";
import { PeopleMap } from "../../pages/Atlas/Prev/PrevCountyMap";
import { PeoplesIcons } from "../../pages/elections/AtlasAdminSidebar";
import { LevelDialog } from "./forms/Modals/ModalDialog";
import useDetail from "../hooks/useDetail";
import { SearchAndSelectOfficial } from "../../pages/elections/Operations/Operations";
import { SearchAndSelectOfficialHeader } from "../../pages/elections/Operations/Operations";
import ErrorBoundary from "../../navigation/ErrorBoundary";
import { UploaderRes } from "../../pages/Atlas/Prev/Prev";
import { Timer } from "../../pages/Atlas/Prev/Prev";
import { SearchDialog } from "./forms/Modals/SearchModal";
import { ResultsDialog } from "./forms/Modals/ResultsModal";
import { useFilters } from "../../pages/elections/Operations/Operations";
export default function Votes() {
  useAllCountyData(true);
  useOfficials();
  useDetail();
  const { path } = useRouteMatch();
  const { goBack, push } = useHistory();

  const { allCountyData, isLoggedIn, party, dispatch } =
    useContext(StateContext);
  const [loading, setLoading] = useState(false);

  const submitButton = ({ handleClose }) => {
    if (loading) {
      return (
        <Button type="button" color="warning">
          Creating vote...
        </Button>
      );
    } else {
      return (
        <>
          <Switch>
            <Route path={path}>
              <Button onClick={() => handleSubmit(handleClose)}>
                Create Vote
              </Button>
            </Route>
            <Route path={path}>
              <Button onClick={() => handleSubmit(handleClose)}>Vote</Button>
            </Route>
          </Switch>
        </>
      );
    }
  };

  const closeButton = ({ handleClose }) => (
    <Button onClick={goBack}>Cancel</Button>
  );

  const signupButton = ({ handleClose }) => null;

  const [state, setState] = useState({
    voters: "MEMBERS",
  });
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const getRand = () => Math.random().toString(16).substr(2, 8);

  function handleSubmit() {
    setLoading(true);
    if (!Boolean(state)) {
      setLoading(false);
      setSuccess(false);
      setErr(true);
    } else {
      axiosInstance
        .post("/vote", {
          ...state,
          party: party?.id,
        })
        .then(({ data }) => {
          setSuccess(true);
          dispatch({
            type: "ADD_SINGLE",
            payload: { ...data, isNew: true },
            context: "votes",
          });
          setLoading(false);
          push(`/votes/${data.rand}`);
        })
        .catch((e) => {
          setErr(true);
          setState(getRand());
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    setState({
      ...state,
      rand: getRand(),
    });
  }, []);

  if (!isLoggedIn && !Boolean(localStorage.getItem("access_token")))
    return <Redirect to={`/accounts?redirect=${"votes"}`} />;

  return (
    <div>
      <Map zoom={7} className={"AgentSignup"}>
        <AtlasMap
          nonFilter
          checked
          title="Counties"
          datatype="county"
          dat={allCountyData}
        />
        <BasicDialog
          medium
          open
          title="Vote"
          SubmitAction={submitButton}
          SignupAction={signupButton}
          CloseAction={closeButton}
        >
          <Switch>
            <Route exact path={path}>
              <VotesForm
                state={state}
                handleChange={handleChange}
                err={err}
                success={success}
                setState={setState}
              />
            </Route>
            <Route exact path={`${path}/all`}>
              <PreviousElections />
            </Route>
            <Route exact path={`${path}/:id`}>
              <CandidateList map />
            </Route>
            <Route exact path={`${path}/:id/add-results/:ballot`}>
              <CandidateList map form />
            </Route>
            <Route exact path={`${path}/:id/upload/:ballot`}>
              <ErrorBoundary>
                <VoteGrid map />
              </ErrorBoundary>
            </Route>
            <Route exact path={`${path}/:id/preview`}>
              <Preview />
            </Route>
          </Switch>
        </BasicDialog>
      </Map>
    </div>
  );
}

function Upload() {
  return <div></div>;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Conduct a vote" {...a11yProps(0)} />
          <Tab label="Poll" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <VotesForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <VotesForm polls />
      </TabPanel> */}
    </Box>
  );
}

export function CandidateList({ noMap, form, map }) {
  const { allCountyData, officials, votes, dispatch } =
    useContext(StateContext);

  const candidates = officials?.filter((f) => f.isCandidate) || [];

  const [vCandidates, setVCandiates] = React.useState([]);
  const [results, setResults] = React.useState(null);

  const { id } = useParams();
  const vote = (votes?.filter((f) => f.rand === id) || [])[0];
  const { push } = useHistory();
  const { url } = useRouteMatch();

  const [selected, setSelected] = React.useState(null);

  const [open, setOpen] = useState(!Boolean(selected?.length));

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);

  const [edit, setEdit] = useState(false);

  function handleSubmit() {
    if (selected?.length) {
      setLoading(true);
      axiosInstance
        .post("/ballot", {
          vote: vote?.id,
          position: "PRESIDENT",
          candidates: [...selected].map((p) => ({ ...p, isCandidate: true })),
        })
        .then(({ data }) => {
          setVCandiates(selected);
          setSelected([]);
          setSuccess(true);
          setOpen(true);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
        });
    } else {
      setErrors(true);
    }
  }

  const [loadingCandidates, setLoadingCandidates] = useState(false);

  const [searchState, setSearchState] = useState(null);

  const handleSelected = (v) => {
    setSelected(v);
  };

  useEffect(() => {
    if (vote?.id) {
      setVCandiates(
        vote?.ballots?.filter((b) => b.position === "PRESIDENT")[0]
          ?.candidates || []
      );
      setSelected(
        vote?.ballots?.filter((b) => b.position === "PRESIDENT")[0]
          ?.candidates || []
      );
    }
  }, [vote]);

  const ballot = vote?.ballots?.filter((b) => b.position === "PRESIDENT")[0];

  const {
    isStation,
    isWard,
    isConst,
    isCounty,
    county,
    constituency,
    ward,
    station,
    filter,
    getFilterUrl,
    getRest,
  } = useFilters();

  const [ctx, setCtx] = React.useState("County");

  const handleChange = (event) => {
    setCtx(event.target.value);
  };

  const [addResults, setAddResults] = React.useState(false);

  const [addCandidates, setAddCandidates] = React.useState(false);

  return (
    <>
      <Grid container>
        <Grid item xs sx={{ textAlign: "center" }}>
          {loadingCandidates && <LinearProgress />}
          <Timer />
          <Typography variant="h5">{vote?.title}</Typography>
          <Typography sx={{ color: "text.secondary" }} variant="caption">
            Vote ID: {vote?.rand}
          </Typography>
          <br />
          <Ctx />

          {form && (
            <>
              <FormControl sx={{ my: 2 }} size="small" fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Add results for
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ctx}
                  label="Add results for"
                  onChange={handleChange}
                >
                  <MenuItem value={"County"}>Counties</MenuItem>
                  <MenuItem value={"Constituency"}>Constituencies</MenuItem>
                  <MenuItem value={"Ward"}>Wards</MenuItem>
                  <MenuItem value={"Station"}>Polling Center</MenuItem>
                </Select>
              </FormControl>
            </>
          )}

          {!Boolean(vCandidates?.length) && !form && (
            <ErrorBoundary>
              <SearchAndSelectOfficial
                selected={selected || []}
                vote
                data={officials || []}
                handleSelected={handleSelected}
              />

              <Button onClick={() => setAddResults((p) => !p)}>
                Save selection
              </Button>

              <Typography sx={{ mt: 2 }}>
                Can't find the candidate?{" "}
                <Link
                  onClick={() =>
                    push(`/operations/Candidates/new?vote=${vote?.rand}`)
                  }
                >
                  {" "}
                  Add more options
                </Link>
              </Typography>
            </ErrorBoundary>
          )}
          {Boolean(vCandidates?.length) && (
            <Grid container spacing={2}>
              {vCandidates?.map((s, i) => (
                <Grid key={i} item xs={6}>
                  <Paper>
                    <Box sx={{ p: 1 }}>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Box>
                          <Avatar></Avatar>
                        </Box>
                      </Box>
                      <Typography sx={{ my: 1 }}>
                        {s.firstname} {s.lastname}
                      </Typography>
                      <>
                        {form && (
                          <>
                            <ResultField ctx={ctx} />
                          </>
                        )}
                      </>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
          <Box sx={{ textAlign: "center", mt: 3 }}>
            {Boolean(vCandidates?.length) && !form && (
              <Button onClick={() => push(`${url}/upload/${ballot.id}`)}>
                Upload Results
              </Button>
            )}
            {Boolean(vCandidates?.length) && !form && (
              <Button onClick={() => push(`${url}/add-results/${ballot.id}`)}>
                Add Results
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item xs>
          {map && (
            <Map className="smallMap">
              {filter && <DetailMap checked={filter} />}
              <AtlasMap
                nonFilter
                checked={!filter}
                votes
                title="Counties"
                datatype="county"
                dat={allCountyData}
              />
            </Map>
          )}
        </Grid>
      </Grid>
    </>
  );
}

function ResultField({ handleChange, ctx, addResults }) {
  const [edit, setEdit] = useState(false);
  const [state, setState] = useState(null);
  const toggleEdit = () => setEdit((p) => !p);
  const { filter, county } = useFilters();
  return (
    <>
      <>
        {
          !filter(
            <Alert severity="error">Select a county to add results</Alert>
          )
        }
        {filter(<Alert severity="error">Results for {county} county</Alert>)}

        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton disabled={!filter} onClick={toggleEdit}>
                  {edit ? <SaveIcon /> : <EditIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ my: 2 }}
          label="Votes"
          onChange={(e) => setState(e.target.value)}
          fullWidth
          size="small"
          value={state}
        />
      </>
    </>
  );
}
const genDate = (d) => {
  return (
    [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
    " " +
    [d.getHours(), d.getMinutes(), d.getSeconds()].join(":")
  );
};

function CandidateCard({ data, isVote }) {
  const [votes, setVotes] = useState(false);

  return (
    <Grid item xs={6}>
      <Paper>
        <Box>
          <Avatar src={data.avatar}>
            {data.firstname[0]}
            {data.lastname[0]}
          </Avatar>
          <Typography>
            {data.firstname}
            {data.lastname}
          </Typography>
          {isVote && <Button>VOTE</Button>}
        </Box>
      </Paper>
    </Grid>
  );
}

export function PreviousElections({ noMap }) {
  const { votes, officials, allCountyData, events } = useContext(StateContext);
  const data = votes || [];
  const { push } = useHistory();
  return (
    <Grid container>
      <Grid
        sx={{ maxHeight: "63vh", overflow: "auto" }}
        item
        xs={noMap ? 12 : 4}
      >
        <Box sx={{ p: 2 }}>
          <Box>
            <Typography>All votes</Typography>
          </Box>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {data.map((f, i) => {
              const { rand, id, title, isNew } = f;
              return (
                <ListItem
                  secondaryAction={
                    isNew ? (
                      <Chip color="success" label="new" size="small" />
                    ) : null
                  }
                  onClick={() => push(`/votes/${rand}`)}
                  key={id}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <HowToVoteRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={rand} secondary={title} />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Grid>
      {!noMap && (
        <Grid item xs>
          <Map className="smallMap">
            <DetailMap />
            <AtlasMap
              nonFilter
              checked
              title="Counties"
              datatype="county"
              dat={allCountyData}
            />
          </Map>
        </Grid>
      )}
    </Grid>
  );
}

function VotesForm({ handleChange, state, err, success, setState }) {
  const { path } = useRouteMatch();
  const { push } = useHistory();

  const handleDareChange = (v, key) => {
    setState({ ...state, [key]: v });
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid
          item
          xs={3}
          sx={{
            bgcolor: "lightgray",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {/* <Box sx={{ textAlign: "center" }}>
            <QRCode size={108} value={`${window.location.hostname}/rand`} />
          </Box> */}
        </Grid>
        <Grid item xs>
          <Stack spacing={3}>
            <Box sx={{ textAlign: "right" }}>
              <img height={72} src={logo} alt="kura ke logo" />
            </Box>
            <Typography variant="h6">
              Create a new vote / Add previous elections results{" "}
            </Typography>
            {/* <Typography sx={{ mb: 2 }}>
              Streamline your decision making process
            </Typography> */}
            {success && (
              <Alert severity="success">
                <Typography>Vote created successfully</Typography>
              </Alert>
            )}
            {err && (
              <Alert severity="error">
                <Typography>An error occured</Typography>
              </Alert>
            )}
            <TextField
              required
              name="rand"
              onChange={handleChange}
              value={state?.rand}
              fullWidth
              label="Vote ID"
              variant="standard"
            />
            <TextField
              required
              onChange={handleChange}
              value={state?.title}
              name="title"
              placeholder="Example: Presidential results 2017"
              fullWidth
              label="Title"
              variant="standard"
            />
            {/* <Description /> */}
            <Grid container spacing={2}>
              <Grid item xs>
                <ModalDialog handleChange={handleChange} state={state} />
              </Grid>
              <Grid item xs>
                <LevelDialog handleChange={handleChange} state={state} />
              </Grid>
            </Grid>
            <Box sx={{ my: 2 }}>
              <DatePicker handleDareChange={handleDareChange} />
            </Box>
            <Link onClick={() => push(`/votes/all`)} sx={{ mt: 1 }}>
              View all votes
            </Link>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

function VoteGrid({ map }) {
  const { allCountyData } = useContext(StateContext);
  return (
    <Box>
      <Grid container>
        <Grid item xs>
          <ErrorBoundary>
            <UploaderRes />
          </ErrorBoundary>
        </Grid>
        {map && (
          <Grid item xs>
            <Map className="smallMap">
              <DetailMap />
              <AtlasMap
                nonFilter
                checked
                title="Counties"
                datatype="county"
                dat={allCountyData}
              />
            </Map>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
