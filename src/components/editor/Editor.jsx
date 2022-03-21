import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { PeoplesIcons } from "../../pages/elections/AtlasAdminSidebar";
import {
  AtlasMap,
  DenseMap,
  StationsMap,
} from "../../pages/Atlas/Prev/PrevCountyMap";
import DetailMap from "../../pages/elections/Operations/DetailMap";
import {
  Switch,
  Route,
  useHistory,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Map from "../../components/Map";
import logo from "../../assets/logo.png";
import { StateContext } from "../../state/State";
import React, { useState, useContext } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import LocationPicker from "../../pages/public/LocationPicker";
import { PublicLocationMarker } from "../../pages/public/LocationPicker";

import MuiSwitch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";

import * as turf from "@turf/turf";
import Slider from "@mui/material/Slider";
import axiosInstance from "../../state/axiosInstance";
import FileReader from "../../pages/Admin/Upload";
import { useFilters } from "../../pages/elections/Operations/Operations";
import useAllCountyData from "../hooks/useAllCountyData";
import useAllWardData from "../hooks/useAllWardData";
import useAllStationsData from "../hooks/useAllStationsChildren";
import { Poster } from "./ImageGen";

const marks = [
  {
    value: 10,
    label: "10 KM",
  },
  {
    value: 10,
    label: "10 KM",
  },
  {
    value: 30,
    label: "30 KM",
  },
  {
    value: 50,
    label: "50 KM",
  },
];

function valuetext(value) {
  return `${value} KM`;
}

export default function Editor() {
  return <div style={{ backgroundColor: "#297373" }}>
    <Poster/>
  </div>;
}

function StationsNearMeWidget() {
  const { push, goBack } = useHistory();
  return (
    <Box sx={{ p: 2, pt: 1 }}>
      <Button
        startIcon={<ArrowBackIos />}
        onClick={goBack}
        sx={{ color: "white" }}
      >
        Back
      </Button>
      <Box sx={{ textAlign: "center", mt: 1, mb: 3 }}>
        <img style={{ height: 63 }} src={logo} alt="Kura ke logo" />
      </Box>
      <Alert severity="info">
        Select radius with the slider below, find missing polling centers, add
        and edit polling centers
      </Alert>
      <Box>
        <Button
          onClick={() => push(`/editor/new`)}
          sx={{ mt: 3 }}
          fullWidth
          startIcon={<AddIcon />}
          color="success"
          variant="contained"
        >
          Create New Polling center
        </Button>
        <Button
          onClick={() => push(`/editor/new/feature`)}
          sx={{ mt: 3 }}
          fullWidth
          startIcon={<AddIcon />}
          color="warning"
          variant="contained"
        >
          Add Features, i.e Social halls, Market Places, CBO Offices
        </Button>
      </Box>
      <Box>
        <DiscreteSlider />
      </Box>
    </Box>
  );
}

function DiscreteSlider() {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box sx={{ mt: 6 }}>
        <Slider
          defaultValue={1}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-always"
          step={5}
          marks={marks}
          valueLabelDisplay="on"
          value={value}
          onChange={handleChange}
        />
        <Button fullWidth sx={{ mt: 2 }} variant="contained">
          Search Polling Centers
        </Button>
      </Box>
    </div>
  );
}

const EditorForm = () => {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);
  const { useCurrentLocation, detail, dispatch, publicLocation } =
    useContext(StateContext);

  const { push } = useHistory();

  const { context, name } = useParams();

  const handleToggleCurrentLocation = (e) => {
    if (e.target.checked) {
      dispatch({
        type: "ADD_MULTIPLE",
        context: "useCurrentLocation",
        payload: true,
      });
    } else {
      dispatch({
        type: "ADD_MULTIPLE",
        context: "useCurrentLocation",
        payload: false,
      });
    }
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.tatget.name]: e.target.value,
    });
    if (state?.lat && state?.lng) {
      dispatch({
        type: "ADD_MUILTIPLE",
        payload: { ...state },
        context: "publicLocation",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const d = detail[0];
    const data = {
      ...state,
      lat: publicLocation?.lat,
      long: publicLocation?.lng,
      county: d.county,
      ward: d.ward,
      name: state.name.toUpperCase(),
      constituen: d.const,
    };
    axiosInstance
      .post("/station", data)
      .then(({ data }) => {
        setLoading(false);
        dispatch({
          type: "ADD_SINGLE",
          context: "stationChildren",
          payload: data,
        });
        push(`/editor/${context}/${name}/${data?.id}`);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  return (
    <Box sx={{ p: 2, bgcolor: "background.paper", mt: 5 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ mt: 6 }}>
          <TextField
            name="name"
            onChange={handleChange}
            fullWidth
            variant="standard"
            size="small"
            label="Polling station name"
          />
          <FormGroup>
            <FormControlLabel
              control={
                <MuiSwitch
                  onChange={handleToggleCurrentLocation}
                  checked={useCurrentLocation}
                />
              }
              label="Use my current location"
            />
          </FormGroup>

          {Boolean(useCurrentLocation) && (
            <Box>
              <Alert severity="info">
                Pick location on map. Tap on the map to enable location info
              </Alert>
            </Box>
          )}

          {!Boolean(useCurrentLocation) && (
            <Box>
              <Alert severity="info">Manually add coordinates</Alert>
              <Stack spacing={2}>
                <TextField
                  name="lat"
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="standard"
                  size="small"
                  label="Latitude"
                />
                <TextField
                  required
                  name="lng"
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
                  size="small"
                  label="Longitude"
                />
              </Stack>
            </Box>
          )}
          <Button disabled={loading || !Boolean(publicLocation)}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
