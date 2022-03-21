import { useContext, useEffect, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { StateContext } from "../../../state/State";
import useSearchQueryParams from "../../../components/hooks/useSearchQueryParams";
export default function Ctx({ alignment, handleChange }) {
  const { officials } = useContext(StateContext);

  const data = (officials || []).filter((f) => f.role === "CANDIDATE");

  const presidentialCandidates = data.filter(
    (d) => d.candidateType === "presidential"
  );

  const filter = Boolean(useSearchQueryParams("filter"));
  const ward = useSearchQueryParams("ward");
  const constituency = useSearchQueryParams("constituency");
  const county = useSearchQueryParams("county");

  const isPresidential = !filter;
  const isWard = Boolean(ward);
  const isConstituency = Boolean(constituency) && !Boolean(ward);
  const isCounty = Boolean(county) & !Boolean(constituency) && !Boolean(ward);

  return (
    <>
      <ToggleButtonGroup
        color="primary"
        size="small"
        value={"president"}
        exclusive
        // onChange={handleChange}
        sx={{ mb: 2 }}
      >
        <ToggleButton sx={{ textTransform: "none" }} value="president">
          Pres
        </ToggleButton>
        <ToggleButton disabled sx={{ textTransform: "none" }} value="governor">
          Gov
        </ToggleButton>
        <ToggleButton disabled sx={{ textTransform: "none" }} value="senator">
          Sen
        </ToggleButton>
        <ToggleButton disabled sx={{ textTransform: "none" }} value="w_rep">
          W Rep
        </ToggleButton>
        <ToggleButton disabled sx={{ textTransform: "none" }} value="w_rep">
          MP
        </ToggleButton>
        <ToggleButton disabled sx={{ textTransform: "none" }} value="w_rep">
          MCA
        </ToggleButton>
        <ToggleButton
          disabled
          sx={{
            display: !isConstituency ? "none" : "inline",
            textTransform: "none",
          }}
          value="mp"
        >
          MP
        </ToggleButton>
        <ToggleButton
          disabled
          sx={{ display: !isWard ? "none" : "inline", textTransform: "none" }}
          value="mca"
        >
          MCA
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
