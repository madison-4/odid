import React from "react";
import Button from "@mui/material/Button";
import Papa from "papaparse";
import { CSVLink } from "react-csv";

import CheckBox from "@mui/material/Checkbox";
import { StateContext } from "../../../state/State";
import axiosInstance from "../../../state/axiosInstance";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Map from "../../../components/Map";
import MenuItem from "@mui/material/MenuItem";
import useAllCountyData from "../../../components/hooks/useAllCountyData";
import useAllConstData from "../../../components/hooks/useAllConstituencyData";
import useSearchQueryParams from "../../../components/hooks/useSearchQueryParams";
import useAllWardChildren from "../../../components/hooks/useAllWardData";
import useAllStationsChildren from "../../../components/hooks/useAllStationsChildren";
import { StationsMap, AtlasMap, MiniMap } from "./PrevCountyMap";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";

import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  Redirect,
  useParams,
} from "react-router-dom";
import { Marker, Popup, useMap, CircleMarker } from "react-leaflet";

import UploadFileIcon from "@mui/icons-material/UploadFile";

import usePresidentialResults from "../../../components/hooks/usePresidentialResults";
import { useContext } from "react";
import FileReader from "../../Admin/Upload";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  CandidateList,
  PreviousElections,
} from "../../../components/Votes/Votes";
import BigPrev from "./BigPrev";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Prev() {
  const { allCountyData, isLoggedIn } = React.useContext(StateContext);

  const { path, url } = useRouteMatch();
  const { goBack } = useHistory();

  useAllCountyData(true);
  useAllConstData();
  useAllStationsChildren();
  useAllWardChildren();

  const results = usePresidentialResults() || [];

  const filter = Boolean(useSearchQueryParams("filter"));

  if (!isLoggedIn && !Boolean(localStorage.getItem("access_token"))) {
    return <Redirect to={`/accounts?redirect=${window.location.pathname}`} />;
  }

  return (
    <div className="app">
      <Grid container>
        <Grid item xs={5} sx={{ maxHeight: "100vh", overflow: "auto", p: 2 }}>
          <BigPrev />
        </Grid>
        <Grid xs item>
          <Map dark atlas className="AgentSignup">
            {/* <UploadControl /> */}
            {results?.map((r, i) => {
              return (
                <AtlasMap
                  atlas
                  nonFilter
                  datatype="county"
                  dat={r}
                  checked={i === 0}
                  title={r}
                ></AtlasMap>
              );
            })}
          </Map>
        </Grid>
      </Grid>
    </div>
  );
}

function AtlasHome() {
  const county = useSearchQueryParams("county");
  const res = useSearchQueryParams("res");
  const results = usePresidentialResults() || [];
  const cleaned = results?.map((r) => r[0]);
  return (
    <Box sx={{ mt: 2, textAlign: "center", height: "80vh", overflow: "auto" }}>
      <Skeleton sx={{ height: 144, width: 98 }}></Skeleton>
      <Typography>undefined</Typography>
      <Typography>NaN</Typography>
      <Typography>NaN</Typography>
      <Divider sx={{ my: 2 }} />
      <Stack spacing={2}>
        <Typography>Other candidates</Typography>
      </Stack>
    </Box>
  );
}

export function UploaderRes() {
  const { allCountyData, votes } = useContext(StateContext);
  const { push } = useHistory();
  const [state, setState] = useState(null);

  const { id } = useParams();

  const [candidates, setCandidates] = useState([]);

  const vote = (votes?.filter((f) => f.rand === id) || [])[0];

  const ballot = vote?.ballots?.filter((b) => b.position === "PRESIDENT")[0];

  const [loading, setLoading] = useState(false);
  const [errs, setErrs] = useState(false);

  const [completed, setCompleted] = useState(false);

  const handleChange = (v) => {
    setCompleted(false);
    Papa.parse(v, {
      complete: handleComplete,
      header: true,
    });
  };

  const handleComplete = (res) => {
    setState(res);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setLoading(true);
    axiosInstance
      .post(`/results`, { data: state.data, ballot: ballot?.id })
      .then(({ data }) => {
        setLoading(false);
        setCompleted(true);
      })
      .catch((e) => {
        setLoading(false);
        setErrs(true);
      });
  };

  // const csvData = [
  //   ["county"]
  //     .concat(candidates.map((c) => c.lastname))
  //     .concat(["reg_voters", "turnout"]),
  // ];

  const csvData = [];

  React.useEffect(() => {
    if (vote?.id) {
      setCandidates(
        vote?.ballots?.filter((b) => b.position === "PRESIDENT")[0]
          ?.candidates || []
      );
    }
  }, [vote]);

  return (
    <form onSubmit={handleUpload}>
      <Stack spacing={2}>
        <Box sx={{ my: 2 }}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">Upload to</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Upload to"
              value="Counties"
            >
              <MenuItem value={"Counties"}>Counties</MenuItem>
              {/* <MenuItem value={"Constituencies"}>Constituencies</MenuItem>
              <MenuItem value={"Constituencies"}>Constituencies</MenuItem>
              <MenuItem value={"Constituencies"}>Constituencies</MenuItem>
              <MenuItem value={"Constituencies"}>Constituencies</MenuItem>
              <MenuItem value={"Constituencies"}>Constituencies</MenuItem> */}
            </Select>
          </FormControl>
        </Box>
        <Alert severity="info" sx={{ mb: 2 }}>
          <CSVLink data={csvData}>
            Download results csv template for county results
          </CSVLink>
        </Alert>
        <FileReader
          disabled={!Boolean(state)}
          loading={loading}
          handleChange={handleChange}
          handleSubmit={handleUpload}
        />
        {completed && <Alert severity="info">Data upload successful</Alert>}
        {errs && <Alert severity="error">An error occured</Alert>}

        {loading && (
          <Button
            startIcon={<UploadFileIcon />}
            type="button"
            color="warning"
            variant="contained"
          >
            {" "}
            Uploading...
          </Button>
        )}
        {!loading && (
          <Button
            startIcon={<UploadFileIcon />}
            disabled={!state}
            variant="contained"
            type="submit"
          >
            {" "}
            Upload now
          </Button>
        )}
      </Stack>
    </form>
  );
}

export const Timer = () => {
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    const intervalTimer = () =>
      setInterval(() => {
        const day = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();

        const hours = new Date().getHours();
        const mins = new Date().getMinutes();

        const seconds = new Date().getSeconds();

        setDate(`${day} / ${month} / ${year}`);
        setTime(`${hours}:${mins}:${seconds}`);
      }, 1000);

    intervalTimer();

    return () => {
      clearInterval(intervalTimer);
    };
  }, []);
  return (
    <div>
      <Typography>
        {date} - {time}
      </Typography>
    </div>
  );
};

export const EditableMarkers = ({ coordinates, p }) => {
  const [draggable, setDraggable] = React.useState(false);

  const [state, setState] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const { stationChildren } = React.useContext(StateContext);
  const markerRef = React.useRef(null);

  const map = useMap();

  const eventHandlers = React.useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setState(marker.getLatLng());
          map.flyTo(marker.getLatLng(), map.getZoom());
        }
      },
    }),
    []
  );
  const toggleDraggable = React.useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  const handleSubmit = (e) => {
    setLoading((p) => !p);
    if (state) {
      axiosInstance
        .patch("/station", { ...state, id: p.id, long: state.lng })
        .then(({ data }) => {
          setLoading((p) => !p);
        })
        .catch((e) => {
          alert("An error occured");
          console.log(e);
          setLoading((p) => !p);
        });
    }
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      {!draggable && (
        <CircleMarker
          draggable={draggable}
          ref={markerRef}
          radius={9}
          eventHandlers={eventHandlers}
          center={state || [coordinates[0], coordinates[1]]}
        >
          <Popup>
            <Box>
              <Box>
                <Typography variant="h6">{p.name} Station</Typography>
              </Box>
              <Box>
                <Alert severity="info">
                  To adjust the coordinates of this polling center, enable drag
                  then drag to desired location and apply changes.
                </Alert>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Button type="button" onClick={toggleDraggable}>
                  {draggable ? "Disable drag" : "Enable drag"}
                </Button>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Button
                      disabled={state === null}
                      type="button"
                      onClick={() => {
                        toggleDraggable();
                        setState(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      color={loading ? "warning" : "primary"}
                      onClick={handleSubmit}
                      variant="contained"
                      disabled={loading || state === null}
                    >
                      {loading ? "Saving..." : "Apply Changes"}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Popup>
        </CircleMarker>
      )}
      {draggable && (
        <Marker
          draggable={draggable}
          ref={markerRef}
          radius={9}
          eventHandlers={eventHandlers}
          position={state || [coordinates[0], coordinates[1]]}
        >
          <Popup>
            <Box>
              <Box>
                <Typography variant="h6">{p.name} Station</Typography>
              </Box>
              <Box>
                <Alert severity="info">
                  To adjust the coordinates of this polling center, enable drag
                  then drag to desired location and apply changes.
                </Alert>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Button type="button" onClick={toggleDraggable}>
                  {draggable ? "Disable drag" : "Enable drag"}
                </Button>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Button
                      disabled={state === null}
                      type="button"
                      onClick={() => {
                        toggleDraggable();
                        setState(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      color={loading ? "warning" : "primary"}
                      onClick={handleSubmit}
                      variant="contained"
                      disabled={loading || state === null}
                    >
                      {loading ? "Saving..." : "Apply Changes"}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Popup>
        </Marker>
      )}
    </form>
  );
};

const Loader = () => {
  const { loadingCountyChildren, loadingDetail } =
    React.useContext(StateContext);
  const loading = Boolean(loadingDetail) || Boolean(loadingCountyChildren);
  return <>{loading && <LinearProgress />}</>;
};
