import Typography from "@mui/material/Typography"
import Select from "@mui/material/Select"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import PresidentsGraph from "../../Atlas/PresidentsGraph"
import { SurveyList } from "./Surveys"

export default function PortalHome() {

    return (
        <Box>
            <PresidentsGraph />
            <SurveyList />
        </Box>
    )
}