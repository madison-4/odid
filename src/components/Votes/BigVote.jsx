import Box from "@mui/material/Grid"
import { useState, useEffect, useContext } from "react"
import { StateContext } from "../../state/State";
import Alert from "@mui/material/Alert"
import Button from "@mui/material/Edit"
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"

import Link from "@mui/material/Link"
import UploadDialog from "../modal/UploadResDialog";
import usePresidentialResults from "../hooks/usePresidentialResults";

export default function BigVote() {

    const { votes } = useContext(StateContext)

    const { id } = useParams()

    const vote = (votes || [])?.filter(f => f.rand === id)[0]

    const ballots = vote?.ballots;

    const ballot = ballots?.filter(b => b.position === "PRESIDENT")

    const candidates = ballot?.candidates || []

    const { push } = useHistory()
    const { url } = useRouteMatch()

    const [edit, setEdit] = useState(false)

    const results = usePresidentialResults();

    return (
        <div>
            {!Boolean(results.length) && (
                <>
                    {edit && (
                        <div>
                            <Button></Button>
                            <Button onClick={() => setEdit(false)} > Save selection</Button>
                        </div>
                    )}

                    {!edit && (
                        <div>
                            {(candidates?.length) && (
                                <>
                                    <Stack>
                                        {candidates?.map((c, i) => {
                                            return (
                                                <Box spacing={2} >
                                                    <Typography>Name: {c.firstname} {c.lastname}</Typography>
                                                </Box>
                                            )
                                        })}
                                        <UploadDialog ballot={ballot} />
                                        <Button onClick={() => setEdit(true)} >Edit selection</Button>
                                    </Stack>
                                </>
                            )}

                            {!(candidates?.length) && (
                                <>
                                    <Box sx={{ minHeight: "66vh", oveflow: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Box>
                                            <Box>
                                                <Alert severify="info" >
                                                    <Typography varaint="h5">No candidates have been added to this ballot. Select candidates to proceed. <Link onClick={() => push(`/operations/Members/new?redirect=${url}`)} >Click here to add more options</Link></Typography>
                                                </Alert>
                                            </Box>
                                            <Button onClick={() => setEdit(true)}  >Add candidates</Button>
                                        </Box>
                                    </Box>

                                </>
                            )}
                        </div>
                    )}

                </>
            )}
            {Boolean(results.length) && (
                <>
                    Candiate results
                    <Button>View on atlas</Button>
                </>
            )}
        </div>
    )
}

