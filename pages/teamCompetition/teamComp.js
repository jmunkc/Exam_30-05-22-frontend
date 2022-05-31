import {BASE_URL} from "../../settings.js";
import {handleHttpErrors, makeOptions} from "../../utility.js";

export function handleTeamComp(){
    fetchTeams()
}

async function fetchTeams(){
    try {
        await fetch(BASE_URL + "teams", makeOptions("GET"))
            .then(res => handleHttpErrors(res))
            .then(teams => {
                console.log(teams)
            })

    }  catch (err) {
        console.error((err.message))
        if (err.apiError) {
            console.error("Api error: ", err.apiError)
        }
    }
}