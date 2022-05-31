
export function renderTemplate(template, contentId) {
    const clone = template.content.cloneNode(true)
    const content = document.getElementById(contentId)
    content.innerHTML = ""
    content.appendChild(clone)
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


