/**
 * Appends the provided template to the node with the id contentId
 * @param {template} template
 * @param {*} contentId
 */
export function renderTemplate(template, contentId) {
    const clone = template.content.cloneNode(true)
    const content = document.getElementById(contentId)
    content.innerHTML = ""
    content.appendChild(clone)
}


export function renderText(txt, contentId){
    if(!txt || !contentId){
        throw new Error("Missing input arguments in renderText")
    }
    const node =  document.getElementById(contentId)
    if(!node){
        throw new Error(`No element found for the contentId '${contentId}' `)
    }
    node.innerHTML = txt
}


export function loadTemplateFromDom(templateId) {
    const template = document.getElementById(templateId)
    if(!template){
        throw new Error(`No Element found with provided ID: '${templateId}'`)
    }
    if(template.nodeName !="TEMPLATE" ){
        throw new Error(`Element with id: '${templateId}' was not an HtmlTemplate, but a ${template.nodeName}`)
    }
    return template
}


export async function loadTemplate(page) {
    const resHtml = await fetch(page).then(r => {
        if (!r.ok) {
            throw new Error(`Failed to load the page: '${page}' `)
        }
        return r.text()
    });
    const body = document.getElementsByTagName("BODY")[0];
    const div = document.createElement("div");
    div.innerHTML = resHtml;
    body.appendChild(div)
    return div.querySelector("template")
};


export function adjustForMissingHash() {
    let path = window.location.hash
    if (path == "") { //Do this only for hash
        path = "#/"
        window.history.pushState({}, path, window.location.href + path);
    }
}


export function setActiveLink(topnav, activeUrl) {
    const links = document.getElementById(topnav).querySelectorAll("a");
    links.forEach(child => {
        child.classList.remove("active")
        //remove leading '/' if any
        if (child.getAttribute("href").replace(/\//, "") === activeUrl) {
            child.classList.add("active")
        }
    })
}


export function encode(str) {
    str = str.replace(/&/g, "&amp;");
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/"/g, "&quot;");
    str = str.replace(/'/g, "&#039;");
    return str;
}


export async function handleHttpErrors(res) {
    if (!res.ok) {
        const errorResponse = await res.json();
        const error = new Error(errorResponse.message)
        error.apiError = errorResponse
        throw error
    }
    return res.json()
}


export function makeOptions(method, body) {
    const opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    }
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
}

const clickEvent = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true
});

export function showPage(pageId) {
    document.getElementById(pageId).dispatchEvent(clickEvent)
}