import { NewResources, ResourcesHome } from "./Operations";
import React, { useContext, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useParams,
} from "react-router-dom";
import ErrorBoundary from "../../../navigation/ErrorBoundary";
import { StateContext } from "../../../state/State";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import CategoryIcon from "@mui/icons-material/Category";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useFilters } from "./Operations";

export function Assets() {
  const { path } = useRouteMatch();
  return (
    <ErrorBoundary>
      <Switch>
        <Route exact path={path}>
          <ResourcesHome />
        </Route>
        <Route exact path={`${path}/:id`}>
          <AssetsDetail />
        </Route>
      </Switch>
    </ErrorBoundary>
  );
}

function AssetsDetail() {
  const { resources } = useContext(StateContext);
  const { id } = useParams();
  const resource = resources?.filter((f) => f.id === id)[0];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const assignments = resource?.assignments;

  return (
    <>
      <Box sx={{ textAlign: "right" }}>
        <AssignDialog />
      </Box>
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="h6">{resource?.name}</Typography>
        <Typography variant="caption">Resources</Typography>
        <Divider sx={{ my: 2 }} />
        {resource?.trackQuantity && (
          <Typography>
            Quantity: {resource?.quantity} {resource?.unit}{" "}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>{/* <TextField  value  /> */}</form>

        <Divider sx={{ my: 1 }} />
        <Typography>Assignments</Typography>
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            minHeight: "10vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!Boolean(assignments?.length) && (
            <Typography>No {resource?.name} has been assigned.</Typography>
          )}
          {Boolean(assignments?.length) && (
            <>
              {assignments.map((a, i) => {
                <div key={i}>
                  <Typography>Assigned To: a.assigneeType</Typography>
                  <Typography>Quantity: {a.quantity}</Typography>
                  <Typography variant="caption">note delivered</Typography>
                </div>;
              })}
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export function CanGoBack() {
  const { goBack } = useHistory();
  return <Button onClick={goBack}>Go Back</Button>;
}

export function AssetsList() {
  const { resources } = useContext(StateContext);
  const { push } = useHistory();
  const { url } = useRouteMatch();
  const { getFilterUrl } = useFilters();
  return (
    <ErrorBoundary extraRender={CanGoBack}>
      <Box sx={{ textAlign: "right", mt: 2 }}>
        <CustomizedDialogs></CustomizedDialogs>
      </Box>
      <List sx={{ width: "100%" }}>
        {resources?.map((r, i) => {
          return (
            <ListItemButton
              dense
              secondaryAction={
                r?.isNew ? (
                  <Chip label="New" size="small" color="success"></Chip>
                ) : null
              }
              onClick={() => push(`${url}/${r.id}${getFilterUrl()}`)}
              key={i}
              button
            >
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={r.name} secondary={r.quantity} />
            </ListItemButton>
          );
        })}
      </List>
    </ErrorBoundary>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        size="small"
        startIcon={<CategoryIcon />}
        sx={{ mr: 2 }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add resources
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          New Resources
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <NewResources handleClose={handleClose} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export function AssignDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        size="small"
        startIcon={<CategoryIcon />}
        sx={{ mr: 2 }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Assign resources
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Assign Resources
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <AssignmentForm />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

function AssignmentForm({}) {
  const [state, setState] = useState(null);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <div sx={{ mt: 2 }}>
      <FormControl size="small" fullWidth>
        <InputLabel id="demo-simple-select-label">Assign to</InputLabel>
        <Select
          required
          name="assigneeType"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Assign to"
          value={state?.assigneeType}
          onChange={handleChange}
        >
          <MenuItem value={"County"}>County</MenuItem>
          <MenuItem value={"Constituency"}>Constituency</MenuItem>
          <MenuItem value={"Ward"}>Ward</MenuItem>
          <MenuItem value={"Polling_center"}>Polling_center</MenuItem>
          <MenuItem value={"Official"}>Official</MenuItem>
          <MenuItem value={"Coordinator"}>Coordinator</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
