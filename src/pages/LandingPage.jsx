import Map from "./../components/Map";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import { DenseMap, AtlasMap } from "./Atlas/Prev/PrevCountyMap";
import Button from "@mui/material/Button";
import { StateContext } from "../state/State";
import { useContext } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import AccountMenu from "../components/Sidebar/AccountMenu";
import useAllCountyData from "../components/hooks/useAllCountyData";
import useAllConstData from "../components/hooks/useAllConstituencyData";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

import Dialog from "@mui/material/Dialog";

export default function LandingPage() {
  const { push } = useHistory();
  useAllCountyData();
  useAllConstData();
  const { loadingCountyChildren, allCountyData } = useContext(StateContext);
  return (
    <Box style={{ backgroundColor: "#30332E" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "space-between",
          justifyContent: "space-between",
          p: 2,
          px: 3,
        }}
      >
        <Typography sx={{ color: "lightgray" }} variant="h6">
          Kura.Ke
        </Typography>
        <Box>
          <AccountMenu />
        </Box>
      </Box>
      <Box>
        <Map zoom={7} className="smallMap">
          <AtlasMap
            nonFilter
            checked
            title="Counties"
            datatype="county"
            dat={allCountyData}
          />
        </Map>
      </Box>
      <Container>
        <Box
          sx={{
            height: "30vh",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <Typography sx={{ color: "lightgray", mt: 2 }}>
              Use the power of GIS and AI, with direct communication tools to
              your team members at all levels{" "}
            </Typography>
            <Typography sx={{ color: "lightgray" }}>
              Track activities at all levels, conduct polls and surveys and
              perfom real-time analytics on voter data
            </Typography>
            <Button
              sx={{ mt: 6 }}
              onClick={() => push("/accounts/new")}
              variant="contained"
            >
              Get started
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
