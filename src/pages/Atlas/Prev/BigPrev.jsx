import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import React, { PureComponent } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import {
  BarChart,
  Cell,
  Bar,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Ctx from "./Ctx";

export default function BigPrev() {
  const { path, url } = useRouteMatch();
  const { push } = useHistory();
  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <Box sx={{ textAlign: "center", pt: 3 }}>
            <img
              height={66}
              alt="Kura KE logo"
              src="https://goofy-mahavira-b5648f.netlify.app/static/media/logo.23249df2.png"
            />
            <Typography sx={{ mt: 3 }} variant="h6">
              KURA. KE. ATLAS
            </Typography>
            <Divider sx={{ mt: 2 }} />
            <Ctx />
            <List>
              <ListItem
                secondaryAction={
                  <Chip size="small" label="Upcoming" color="success" />
                }
                disablePadding
              >
                <ListItemButton onClick={() => push(`${url}/2022`)}>
                  <ListItemText primary="2022 Elections" />
                </ListItemButton>
              </ListItem>
              <ListItem
                secondaryAction={<Chip size="small" label="Past" />}
                disablePadding
              >
                <ListItemButton onClick={() => push(`/atlas/2017`)}>
                  <ListItemText primary="2017 Elections" />
                </ListItemButton>
              </ListItem>
              <ListItem
                secondaryAction={<Chip size="small" label="Past" />}
                disablePadding
              >
                <ListItemButton onClick={() => push(`${url}/2013`)}>
                  <ListItemText primary="2013 Elections" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Route>

        <Route exact path={`${path}/2017`}>
          <Atlas />
        </Route>
        <Route exact path={`${path}/2013`}>
          <Atlas13 />
        </Route>
        <Route exact path={`${path}/2022`}>
          <Atlas2022 />
        </Route>
        <Route exact path={`${path}/2022/polls`}>
          <Atlas2022 />
        </Route>
      </Switch>
    </div>
  );
}

function Atlas() {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <img
          height={66}
          alt="Kura KE logo"
          src="https://goofy-mahavira-b5648f.netlify.app/static/media/logo.23249df2.png"
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body">
            2017 FINAL PRESIDENTIAL RESULTS
          </Typography>
        </Box>
      </Box>
      <Paper>
        <Grid mt={4} p={3} container>
          <Grid item xs>
            <Stack spacing={2}>
              <Typography sx={{ color: "red" }} variant="h5">
                WINNER
              </Typography>
              <Typography sx={{ fontWeight: "bold" }} variant="h4">
                UHURU MUIGAI KENYATTA
              </Typography>
              <Typography variant="body">Jubilee Party</Typography>
              <Typography variant="h6">8,203,290 VOTES</Typography>
              <Typography variant="h5">54.27%</Typography>
            </Stack>
          </Grid>
          <Grid
            item
            xs
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>
              <img
                style={{ width: "100%", borderRadius: "50%" }}
                src={
                  "http://kenyanlife.com/wp-content/uploads/2016/04/Uhuru-Kenyatta-Biography-President-Kenya-Age-Education-Career-ICC-Case-Parents-Family-wife-children-Business-salary-wealth-investments-photos-Videos2.jpg"
                }
                alt="U Kenyatta"
              />
              <img
                src={
                  "data:image/png;base64,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"
                }
                alt="party logo"
                style={{
                  position: "absolute",
                  height: 66,
                  borderRadius: "50%",
                  top: "30%",
                  right: "40%",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid mt={2} container spacing={2}>
        <Grid item xs={6}>
          <Paper>
            <Box sx={{ p: 2 }}>
              <Grid container>
                <Grid item xs>
                  <Stack spacing={1}>
                    <Typography sx={{ color: "orange" }} variant="body2">
                      RUNNERS UP
                    </Typography>
                    <Typography variant="body">RAILA AMOLO ODINGA</Typography>
                    <Typography variant="caption">ODM Party</Typography>
                    <Typography>6,822,812 VOTES</Typography>
                    <Typography>44.94 %</Typography>
                  </Stack>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  xs
                >
                  <Box>
                    <img
                      width="100%"
                      alt="runners up"
                      style={{ borderRadius: "50%" }}
                      src="https://p.scooper.news/v2-EagleNews/Eagle-NewsImage/detail/20210123/fd06f7eb31d4d677bb4036310d4246d0.webp"
                    />
                    <img
                      style={{ position: "absolute", height: 48, left: 150 }}
                      src="https://liberal-international.org/wp-content/uploads/2017/05/ODM_Party_Logo.png"
                      alt="odm logo"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper>
            <Box sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Typography>
                  Total Reg Voters:{" "}
                  <span style={{ fontWeight: "bold" }}> 19,611,423 </span>{" "}
                </Typography>
                <Typography>
                  Valid votes:{" "}
                  <span style={{ fontWeight: "bold" }}> 15,181,540 </span>{" "}
                </Typography>
                <Typography>
                  Invalid votes:{" "}
                  <span style={{ fontWeight: "bold" }}> 411,510 </span>{" "}
                </Typography>
                <Typography variant="h5">
                  Turnout: <span style={{ fontWeight: "bold" }}> 77.41% </span>{" "}
                </Typography>
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2 }} />
      <Paper>
        <Example />
      </Paper>
      <Box sx={{ mt: 2 }}>
        <Typography variant="caption">Powered by the Metricon Group</Typography>
        <br />
        <Typography variant="caption">{window.location.host}</Typography>
      </Box>
    </Box>
  );
}

const data = [
  {
    name: "Votes",
    Kenyatta: 8223369,
    Odinga: 6822812,
    Nyagah: 38029,
    Dida: 38004,
    Autot: 27400,
    Kaluyu: 11774,
    Jirongo: 11282,
    Invalid: 411510,
  },
];

class Example extends PureComponent {
  render() {
    return (
      <Grid container>
        <Grid item xs={7}>
          <Box sx={{ p: 2, width: "50", height: "40vh", textAlign: "center" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={data}>
                <Bar dataKey="Kenyatta" fill="red" />
                <Bar dataKey="Odinga" fill="orange" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Nyagah" fill="green" />
                <Bar dataKey="Dida" fill="blue" />
                <Bar dataKey="Aukot" fill="brown" />
                <Bar dataKey="Invalid" fill="purple" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
        <Grid item xs>
          <PieB />
        </Grid>
      </Grid>
    );
  }
}

const dat = [
  { name: "Valid Votes", value: 15181540 },
  { name: "Invalid Votes", value: 411510 },
];

const COLORS = ["green", "yellow"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class PieB extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={dat}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

function Atlas13() {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <img
          height={66}
          alt="Kura KE logo"
          src="https://goofy-mahavira-b5648f.netlify.app/static/media/logo.23249df2.png"
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body">
            2013 FINAL PRESIDENTIAL RESULTS
          </Typography>
        </Box>
      </Box>
      <Paper>
        <Grid mt={4} p={3} container>
          <Grid item xs>
            <Stack spacing={2}>
              <Typography sx={{ color: "red" }} variant="h5">
                WINNER
              </Typography>
              <Typography sx={{ fontWeight: "bold" }} variant="h4">
                UHURU MUIGAI KENYATTA
              </Typography>
              <Typography variant="body">TNA Party</Typography>
              <Typography variant="h6">6,173,433 VOTES</Typography>
              <Typography variant="h5">50.51%</Typography>
            </Stack>
          </Grid>
          <Grid
            item
            xs
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>
              <img
                style={{ width: "100%", borderRadius: "50%" }}
                src={
                  "http://kenyanlife.com/wp-content/uploads/2016/04/Uhuru-Kenyatta-Biography-President-Kenya-Age-Education-Career-ICC-Case-Parents-Family-wife-children-Business-salary-wealth-investments-photos-Videos2.jpg"
                }
                alt="U Kenyatta"
              />
              <img
                src={
                  "https://pbs.twimg.com/profile_images/2402296482/37o90zl2xqdkj8ing87l_400x400.jpeg"
                }
                alt="party logo"
                style={{
                  position: "absolute",
                  height: 66,
                  borderRadius: "50%",
                  top: "30%",
                  right: "40%",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid mt={2} container spacing={2}>
        <Grid item xs={6}>
          <Paper>
            <Box sx={{ p: 2 }}>
              <Grid container>
                <Grid item xs>
                  <Stack spacing={1}>
                    <Typography sx={{ color: "orange" }} variant="body2">
                      RUNNERS UP
                    </Typography>
                    <Typography variant="body">RAILA AMOLO ODINGA</Typography>
                    <Typography variant="caption">ODM Party</Typography>
                    <Typography>5,340,546 VOTES</Typography>
                    <Typography>43.70%</Typography>
                  </Stack>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  xs
                >
                  <Box>
                    <img
                      width="100%"
                      alt="runners up"
                      style={{ borderRadius: "50%" }}
                      src="https://p.scooper.news/v2-EagleNews/Eagle-NewsImage/detail/20210123/fd06f7eb31d4d677bb4036310d4246d0.webp"
                    />
                    <img
                      style={{ position: "absolute", height: 48, left: 150 }}
                      src="https://liberal-international.org/wp-content/uploads/2017/05/ODM_Party_Logo.png"
                      alt="odm logo"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper>
            <Box sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Typography>
                  Total Reg Voters:{" "}
                  <span style={{ fontWeight: "bold" }}> 14,352,533 </span>{" "}
                </Typography>
                <Typography>
                  Valid votes:{" "}
                  <span style={{ fontWeight: "bold" }}> 12,221,053 </span>{" "}
                </Typography>
                <Typography>
                  Invalid votes:{" "}
                  <span style={{ fontWeight: "bold" }}> 108,975 </span>{" "}
                </Typography>
                <Typography variant="h5">
                  Turnout: <span style={{ fontWeight: "bold" }}> 85.14% </span>{" "}
                </Typography>
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2 }} />
      <Paper>
        <Example2 />
      </Paper>
      <Box sx={{ mt: 2 }}>
        <Typography variant="caption">Powered by the Metricon Group</Typography>
        <br />
        <Typography variant="caption">{window.location.host}</Typography>
      </Box>
    </Box>
  );
}

const data13 = [
  {
    name: "Votes",
    Kenyatta: 6173433,
    Odinga: 5340546,
    Mudavadi: 483981,
    Kenneth: 72786,
    Dida: 52848,
    Karua: 43881,
    Kiyiapi: 11282,
    Muite: 411510,
    Invalid: 108975,
  },
];

class Example2 extends PureComponent {
  render() {
    return (
      <Grid container>
        <Grid item xs={7}>
          <Box sx={{ p: 2, width: "50", height: "40vh", textAlign: "center" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={data13}>
                <Bar dataKey="Kenyatta" fill="red" />
                <Bar dataKey="Odinga" fill="orange" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Mudavadi" fill="green" />
                <Bar dataKey="Kenneth" fill="blue" />
                <Bar dataKey="Dida" fill="brown" />
                <Bar dataKey="Karua" fill="purple" />
                <Bar dataKey="Kiyiapi" fill="tangerine" />
                <Bar dataKey="Invalid" fill="indigo" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
        <Grid item xs>
          <PieB />
        </Grid>
      </Grid>
    );
  }
}

function Atlas2022() {
  return (
    <div>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <img
          height={66}
          alt="Kura KE logo"
          src="https://goofy-mahavira-b5648f.netlify.app/static/media/logo.23249df2.png"
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">2022 Presidential Elections</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <img
          height={48}
          alt="ke"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Kenya.svg/2560px-Flag_of_Kenya.svg.png"
        />
        <Typography sx={{ mt: 4 }} variant="h5">
          COUNTDOWN 2022
        </Typography>
        <Divider sx={{ my: 2 }} />
      </Box>
      <Grid spacing={2} mt={2} container>
        <Grid item xs={6}>
          <Paper>
            <Box sx={{ p: 2 }}>
              <img
                height={300}
                alt="Raila OdingaF"
                width="100%"
                src="https://pbs.twimg.com/media/FIfIYkhUUAAYjL4.jpg"
              />
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6">RAILA AMOLO ODINGA</Typography>
              <Typography variant="body2">Azimio la Umoja Movement</Typography>
              <img
                alt="azimio"
                height={36}
                src="http://myremojobs.com/wp-content/uploads/2022/01/azimio-one-300x250.png"
              />
            </Box>
            <Divider sx={{ my: 2 }} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Box sx={{ p: 2 }}>
              <img
                alt="Raila OdingaF"
                width="100%"
                height={300}
                src="https://businesstoday.co.ke/wp-content/uploads/2017/06/wiiliam-ruto-hotel-boulevard.jpg"
              />
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="h6">RUTO WILLIAM SAMOEI</Typography>
                <Typography variant="body2">
                  UNITED DEMOCRATIC ALLIANCE
                </Typography>
                <img
                  alt="azimio"
                  height={36}
                  src="http://www.udayouths.co.ke/wp-content/uploads/2021/03/Untitled-1-Recovered.png"
                />
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Box sx={{ p: 2 }}>
              <img
                alt="Mwangi wa Iria"
                width="100%"
                height={300}
                src="https://kenyanlife.com/wp-content/uploads/2017/08/mwangi-wa-iria.jpg"
              />
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="h6">MWANGI WA IRIA</Typography>
                <Typography variant="body2">INDEPENDENT</Typography>
                <img
                  alt="azimio"
                  height={36}
                  src="http://www.usawakwawote.co.ke/wp-content/uploads/2022/02/chrity.png"
                />
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Box sx={{ textAlign: "center", pt: 2 }}>
              <Typography variant="h6">Polls</Typography>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem dense disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar src="https://eu-west1-myjobs.s3-eu-west-1.amazonaws.com/image_uploads/1582529887RADIOAFRICALOGO.jpg"></Avatar>
                    </ListItemIcon>
                    <ListItemText
                      secondary="March 2022	"
                      primary="Radio Africa Limited"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem dense disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar src="https://eu-west1-myjobs.s3-eu-west-1.amazonaws.com/image_uploads/1582529887RADIOAFRICALOGO.jpg"></Avatar>
                    </ListItemIcon>
                    <ListItemText
                      secondary="February 2022	"
                      primary="Radio Africa Limited"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem dense disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar src="http://www.tifaresearch.com/wp-content/uploads/2021/01/TIFA-LOGO.png"></Avatar>
                    </ListItemIcon>
                    <ListItemText
                      secondary="9–13 February 2022		"
                      primary="Tifa Research"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem dense disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar src="http://www.tifaresearch.com/wp-content/uploads/2021/01/TIFA-LOGO.png"></Avatar>
                    </ListItemIcon>
                    <ListItemText
                      secondary="9–13 February 2022		"
                      primary="Tifa Research"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem dense disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar src="https://eu-west1-myjobs.s3-eu-west-1.amazonaws.com/image_uploads/1582529887RADIOAFRICALOGO.jpg"></Avatar>
                    </ListItemIcon>
                    <ListItemText
                      secondary="January 2022		"
                      primary="Radio Africa group"
                    />
                  </ListItemButton>
                </ListItem>
              </List>
              <Divider />
              <Box sx={{ my: 2 }}>
                <Typography variant="caption">Sources: Wikipedia </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
