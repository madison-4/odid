import { useContext, useEffect, useState } from "react";
import { StateContext } from "../../state/State";
import axiosInstance from "../../state/axiosInstance";
import { useParams } from "react-router-dom"
import useSearchQueryParams from "../hooks/useSearchQueryParams"
export default function usePresidentialResults() {

    const [results, setResults] = useState(null)

    const { id } = useParams()

    const {
        dispatch,
        loadingRes,
        isLoggedIn
    } = useContext(StateContext)

    const update = () => {
        if (!loadingRes && !results) {
            dispatch({
                type: "ADD_MULTIPLE",
                context: "loadingRes",
                payload: true
            })


            axiosInstance.get(`/results/${id}`).then(({ data }) => {
                // dispatch({
                //     type: "ADD_MULTIPLE",
                //     context: "results",
                //     payload: data
                // })
                dispatch({
                    type: "ADD_MULTIPLE",
                    context: "loadingRes",
                    payload: false
                })
                setResults(data)

            }).catch(e => {
                dispatch({
                    type: "ADD_MULTIPLE",
                    context: "loadingRes",
                    payload: false
                })

            })
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            update()
        }
    }, [isLoggedIn])


    return results;

}