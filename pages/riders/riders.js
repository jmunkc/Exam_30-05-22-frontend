import {BASE_URL} from "../../settings.js";
import {handleHttpErrors, makeOptions} from "../../utility.js";

export function handleRiders(){
    fetchRiders()
    document.getElementById("btn-add-rider").onclick = () => {
        addRider()
    }

}


async function fetchRiders(){
    try {
        await fetch(BASE_URL + "riders", makeOptions("GET"))
            .then(res => handleHttpErrors(res))
            .then(riders => {
                console.log(riders);
                function makeTable(input){
                    const table = input.map(r => `<tr id="${r.id}">
                        <input type="button" id="btn-delete-rider-${r.id}" value="Delete">
                        <input type="button" id="btn-update-rider-${r.id}" value="Update">
                        <td><input type="number" id="rider-time-input" placeholder="${r.time}"></td>
                        <td><input type="text" id="rider-fname-input" placeholder="${r.firstName}"></td>
                        <td><input type="text" id="rider-lname-input" placeholder="${r.lastName}"></td>
                        <td>"${r.age}"</td>
                        <td><input id="rider-dob-input" onfocus="(this.type = 'date')" placeholder="${r.dob}"></td>
                        <td><input type="text" id="rider-country-input" placeholder="${r.country}"></td>
                        <td><input type="text" id="rider-team-input" placeholder="${r.team}"></td>
                        
                        </tr>`).join("");
                    document.getElementById("tbl-body-riders").innerHTML = table
                }
                makeTable(riders.sort((a, b) => (a.time - b.time)))
            })

    } catch (err) {
        console.error((err.message))
        if (err.apiError) {
            console.error("Api error: ", err.apiError)
        }
    }
}

async function addRider(){
    const newRiderDetails = {}
    newRiderDetails.firstName = document.getElementById("new-rider-fname-input").value
    newRiderDetails.lastname = document.getElementById("new-rider-lname-input").value
    newRiderDetails.dob = document.getElementById("new-rider-dob-input").value
    newRiderDetails.country = document.getElementById("new-rider-country-input").value
    newRiderDetails.team = document.getElementById("new-rider-team-input").value

    const options = makeOptions("POST", newRiderDetails)

    try {
        const respons = await fetch(BASE_URL + "riders", options)
            .then(res => handleHttpErrors(res))
    } catch (err) {
        console.log(err)
    }
    document.getElementById("new-rider-fname-input").value = ""
    document.getElementById("new-rider-lname-input").value = ""
    document.getElementById("new-rider-dob-input").value = ""
    document.getElementById("new-rider-country-input").value = ""
    document.getElementById("new-rider-team-input").value = ""
}

async function updateRider(){
    const riderDetails = {}
    const id = document.getElementById().value
    riderDetails.firstName = document.getElementById().value
    riderDetails.lastname = document.getElementById().value
    riderDetails.dob = document.getElementById().value
    riderDetails.country = document.getElementById().value
    riderDetails.team = document.getElementById().value

    const options = makeOptions("PUT", riderDetails)

    try {
        const response = await fetch(BASE_URL + "rider" + id, options)
            .then(res => handleHttpErrors(res))
    } catch (err) {
        console.log(err)
    }
}


// <td><input type="number" id="rider-time-input" placeholder="${r.time}"></td>
// <td><input type="number" id="rider-mountain-input" placeholder="${r.mountainPoints}"></td>
// <th><input type="number" id="rider-sprint-input" placeholder="${r.sprintPoints}"></th>