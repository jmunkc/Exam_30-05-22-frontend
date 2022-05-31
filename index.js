import "https://unpkg.com/navigo"

// import utility functions
import { setActiveLink, loadTemplate, renderTemplate } from "./utility.js"

// import handlers
import { handleRiders } from "./pages/riders/riders.js";
import {handleShirts} from "./pages/shirts/shirts.js";
import {handleTeamComp} from "./pages/teamCompetition/teamComp.js";

window.addEventListener("load", async () => {
    const templateHome = await loadTemplate("./pages/home/home.html")
    const templateRiders = await loadTemplate("./pages/riders/riders.html")
    const templateShirts = await loadTemplate("./pages/shirts/shirts.html")
    const templateTeamComp = await loadTemplate("./pages/teamCompetition/teamComp.html")


    const router = new Navigo("/", { hash: true });
    router
        .hooks({
            before(done, match) {
                setActiveLink("menu", match.url)
                done()
            }
        })
        .on("/", () => renderTemplate(templateHome, "content"))
        .on("/riders", () => {
            renderTemplate(templateRiders, "content")
            handleRiders()
        })
        .on("/shirts", () => {
            renderTemplate(templateShirts, "content")
            handleShirts()
        })
        .on("/teamComp", () => {
            renderTemplate(templateTeamComp, "content")
            handleTeamComp()
        })

});

window.onerror = (e) => alert(e)
