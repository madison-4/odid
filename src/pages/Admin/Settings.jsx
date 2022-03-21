import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect, useContext } from "react";
import axiosInstance from "../../state/axiosInstance";
import { StateContext } from "../../state/State";
import { AtlasMap } from "../Atlas/Prev/PrevCountyMap";
import Link from "@mui/material/Link"
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ErrorBoundary from "../../navigation/ErrorBoundary";
import Divider from "@mui/material/Divider"
function useSetup() {
  const { party, allCountyData, officials, dispatch } =
    useContext(StateContext);
  useEffect(() => {
    if (party?.isParty) {
      const actualOfficias =
        officials?.filter((f) => f.role === "Officials") || [];
      const countiesWithOfficials = actualOfficias
        .filter((f) => Boolean(f.county))
        .map((f) => f.county);
      const countiesWithoutOfficials = allCountyData
        ?.map((f) => f[0])
        ?.filter((f) => !countiesWithOfficials.includes(f.county))
        .map((f) => [f]);


      const countiesWithoutEnoughOfficials = allCountyData
        ?.map((f) => f[0])
        ?.filter((f) => countiesWithOfficials?.filter(c => c === f.county)?.length < 10)
        .map((f) => [f]);

      dispatch({
        type: "ADD_MULTIPLE",
        context: "countiesWithoutOfficials",
        payload: countiesWithoutOfficials || [],
      });

      dispatch({
        type: "ADD_MULTIPLE",
        context: "countiesWithoutEnoughOfficials",
        payload: countiesWithoutEnoughOfficials || [],
      });

    }
  }, [party, allCountyData, officials]);
}

export default function Settings() {
  useSetup();
  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6">Complete setup</Typography>
      </Box>
      <Box sx={{ mt: 2 }} >
        <ControlledAccordions />
      </Box>
    </Box>
  );
}

export function SettingsMap() {
  const { countiesWithoutOfficials, countiesWithoutEnoughOfficials } = useContext(StateContext);
  return (
    <ErrorBoundary>
      <AtlasMap
        checked
        settings
        errorColor="blue"
        title="Counties without officials"
        datatype="counties"
        dat={countiesWithoutOfficials}
      />
      <AtlasMap
        checked
        settings
        errorColor="yellow"
        title="Counties without enough officials"
        datatype="counties"
        dat={countiesWithoutEnoughOfficials}
      />
    </ErrorBoundary>
  );
}

export function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { officials, countiesWithoutOfficials, countiesWithoutEnoughOfficials } = useContext(StateContext)

  return (
    <div>
      {countiesWithoutOfficials?.length && (
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: "bold", color: "blue" }}>
              Party Officials
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}> {countiesWithoutOfficials?.length} Counties without officials</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Add recommended officials in the counties to maximize reach to voters.
            </Typography>
            <Link>Boost officials signup</Link>
          </AccordionDetails>
        </Accordion>
      )}

      {countiesWithoutEnoughOfficials?.length && (
        <Accordion sx={{ mt: 2 }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: "bold", color: "yellow" }}>
              Add More Party Officials
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}> {countiesWithoutEnoughOfficials?.length} Counties without recommended officials</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Add recommended officials in the counties to maximize reach to voters.
            </Typography>
            <Link>Boost officials signup</Link>
          </AccordionDetails>
        </Accordion>
      )}

      <Typography variant="h5" >Roles</Typography>
      <Divider sx={{ my: 2 }} />
      <Accordion sx={{ mt: 2 }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: "bold", color: "pink" }}>
            Officials Roles
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Assign officials roles  </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Link>Go to officials</Link>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
