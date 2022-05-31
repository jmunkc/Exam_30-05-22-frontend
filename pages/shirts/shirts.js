import {BASE_URL} from "../../settings.js";
import {handleHttpErrors, makeOptions} from "../../utility.js";

export function handleShirts(){
    fetchShirts()
}

async function fetchShirts(){
    try {
        await fetch(BASE_URL + "riders", makeOptions("GET"))
            .then(res => handleHttpErrors(res))
            .then(riders => {
                const yellowShirt = riders.sort((a, b) => (a.time - b.time))[0]
                console.log(yellowShirt)
                const dottedShirt = riders.sort((a, b) => (b.mountainPoints - a.mountainPoints))[0]
                console.log(dottedShirt)
                const greenShirt = riders.sort((a, b) => (b.sprintPoints - a.sprintPoints))[0]
                console.log(greenShirt)
                const whiteShirt = riders.filter(r => r.age <= 26).sort((a, b) => (a.time - b.time))[0]
                console.log(whiteShirt)

                document.getElementById("yellow").innerText = yellowShirt.firstName + " " + yellowShirt.lastName
                document.getElementById("red").innerText = dottedShirt.firstName + " " + dottedShirt.lastName
                document.getElementById("green").innerText = greenShirt.firstName + " " + greenShirt.lastName
                document.getElementById("white").innerText = whiteShirt.firstName + " " + whiteShirt.lastName
            })
    } catch (err) {
        console.error((err.message))
        if (err.apiError) {
            console.error("Api error: ", err.apiError)
        }
    }
}