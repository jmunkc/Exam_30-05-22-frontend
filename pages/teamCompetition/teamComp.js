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
                const acc = 0
                teams.sort((a,b) => a.riders.map(r => r.time + acc) - b.riders.map(r => r.time + acc))
                console.log(teams)


                function makeTable(input){
                    var rank = 1;
                    function increment(){ return rank++ };
                    const table = input.map(t => `<tr>
                    <td>${increment()}</td>
                    <td>${t.teamName}</td>
                    </tr>`).join("");

                    document.getElementById("tbl-body-teams").innerHTML = table
                    }
                    makeTable(teams)
                })

    }  catch (err) {
        console.error((err.message))
        if (err.apiError) {
            console.error("Api error: ", err.apiError)
        }
    }
}