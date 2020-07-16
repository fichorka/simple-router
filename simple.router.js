const pages = []

// make sure the document is ready
if (document.readyState !== 'loading') enableSpaNavigation()
else
    window.addEventListener('load', () => {
        enableSpaNavigation()
    })

function enableSpaNavigation() {
    // feature detection: proceed if browser supports these APIs
    if (window.location && URL && window.history && window.history.pushState) {
        //store the page (optional)
        storeCurrentPage()

        // add 'click' event listeners to interlinks
        possessInterlinks()

        // handle browser's back / forward buttons
        window.addEventListener('popstate', evt => {
            const page = getStoredPage(location.pathname)
            if (page && page.content) {
                evt.preventDefault()
                navigateTo(evt.target.location, true)
            } else {
                window.location.reload()
            }
        })
    }
}

function possessInterlinks() {
    Array.from(document.getElementsByClassName('interlink')).forEach(link => {
        link.addEventListener('click', function (evt) {
            evt.preventDefault()
            console.log('click')
            navigateTo(evt.target.href)
        })
    })
}

function navigateTo(url, isHistoryUpdated) {
    const targetPage = getStoredPage(new URL(url).pathname)
    if (!isHistoryUpdated) window.history.pushState({}, '', url)

    if (!targetPage.content)
        fetchPage(url).then(pageText => {
            targetPage.content = pageFromText(pageText)
            replacePageContent(targetPage.content)
            setTimeout(() => {
                possessInterlinks()
            }, 1)
        })
    else replacePageContent(targetPage.content)
}

function getStoredPage(pathname) {
    // returns the stored page, if it doesn't exist, creates one and returns it
    const page = pages.filter(p => p.pathname === pathname)[0]
    if (page) return page

    const newPage = {pathname}
    pages.push(newPage)
    return newPage
}

function storeCurrentPage() {
    // optional
    getStoredPage(window.location.pathname).content = document.getElementById('app')
}

function fetchPage(url) {
    return fetch(url).then(res => res.text())
}

function pageFromText(pageText) {
    const div = document.createElement('div')
    div.innerHTML = pageText
    return div.querySelector('#app')
}

function replacePageContent(newContent) {
    document.body.replaceChild(newContent, document.querySelector('#app'))
}
