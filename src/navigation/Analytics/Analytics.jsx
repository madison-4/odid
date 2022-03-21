import React, { Component, useContext } from "react";
import { data, json } from "./analytics_data";
import { VisualizationPanel } from "survey-analytics";
import "survey-analytics/survey.analytics.css";
import * as Survey from "survey-react";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Map from "../../components/Map";
import { AtlasMap } from "../../pages/Atlas/Prev/PrevCountyMap";
import useAllCountyData from "../../components/hooks/useAllCountyData";
import { StateContext } from "../../state/State";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useSocket from "../../components/hooks/useSocket";
import Tweets from "../../pages/elections/Operations/Tweets";

class Analytics extends Component {
  visPanel;
  componentDidMount() {
    const survey = new Survey.SurveyModel(json);
    this.visPanel = new VisualizationPanel(survey.getAllQuestions(), data);
    this.visPanel.render(document.getElementById("summaryContainer"));
  }
  render() {
    return <div id="summaryContainer"></div>;
  }
}

export function SurveyAnalytics() {
  useAllCountyData(true);
  useSocket();

  const { allCountyData } = useContext(StateContext);
  return (
    <div>
      <Grid container>
        <Grid item xs sx={{ maxHeight: "100vh", overflow: "auto" }}>
          <BasicTabs />
        </Grid>
        <Grid item xs={7}>
          <Map className="AgentSignup">
            <AtlasMap
              nonFilter
              checked
              title="Counties"
              datatype="county"
              dat={allCountyData}
            />
          </Map>
        </Grid>
      </Grid>
    </div>
  );
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

  const io = useSocket();

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Surveys" {...a11yProps(0)} />
          <Tab label="Social Media" {...a11yProps(1)} />
          {/* <Tab label="Activity" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Analytics />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Tweets />
        <TweetActivity />
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </Box>
  );
}

class TweetActivity extends Component {
  constructor(props) {
    super(props);
    this.myReference = React.createRef();
    this.state = {
      nodes: [],
      links: [],
    };
    this.soocket = this.props.soocket;
  }
  static contextType = StateContext;
  render() {
    const { dispatch } = this.context;
    return (
      <div>
        <h1>Community Detection</h1>
        <p>Number of users that retweeted so far: {this.state.nodes.length}</p>
        <svg
          ref={this.myReference}
          style={{
            height: 500, //width: "100%"
            width: 900,
            marginRight: "0px",
            marginLeft: "0px",
            background: "white",
          }}
        ></svg>
      </div>
    );
  }
}
